const http = require('http');
const fs = require('fs');
const path = require('path');
const { server } = require('./server');

// Test configuration
const TEST_PORT = 3000;
const TEST_HOST = 'localhost';
const TEST_URL = `http://${TEST_HOST}:${TEST_PORT}`;

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

// Test utilities
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.server = null;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async makeRequest(path, expectedStatus = 200) {
    return new Promise((resolve, reject) => {
      http.get(`${TEST_URL}${path}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      }).on('error', reject);
    });
  }

  async startTestServer() {
    return new Promise((resolve, reject) => {
      try {
        server.listen(TEST_PORT, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async stopTestServer() {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  }

  async run() {
    console.log('🧪 Running Server Tests...\n');

    try {
      // Start test server
      await this.startTestServer();

      for (const test of this.tests) {
        try {
          await test.fn();
          this.passed++;
          console.log(`${colors.green}✓${colors.reset} ${test.name}`);
        } catch (error) {
          this.failed++;
          console.log(`${colors.red}✗${colors.reset} ${test.name}`);
          console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
        }
      }
    } catch (error) {
      console.error(`${colors.red}Failed to start test server: ${error.message}${colors.reset}`);
      process.exit(1);
    } finally {
      // Stop test server
      await this.stopTestServer();
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log(`Tests: ${colors.green}${this.passed} passed${colors.reset}, ${colors.red}${this.failed} failed${colors.reset}, ${this.passed + this.failed} total`);

    // Exit with appropriate code
    process.exit(this.failed > 0 ? 1 : 0);
  }
}

// Assert utilities
const assert = {
  equal(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
  },
  
  includes(str, substring, message) {
    if (!str.includes(substring)) {
      throw new Error(message || `Expected "${str}" to include "${substring}"`);
    }
  },

  true(value, message) {
    if (value !== true) {
      throw new Error(message || `Expected true, got ${value}`);
    }
  },

  false(value, message) {
    if (value !== false) {
      throw new Error(message || `Expected false, got ${value}`);
    }
  }
};

// Create test runner
const runner = new TestRunner();

// Test: Homepage redirect
runner.test('GET / redirects to index.html', async () => {
  const response = await runner.makeRequest('/');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.includes(response.body, '<title>Selectize vs Tom Select Demo</title>', 'Should serve index.html');
});

// Test: Direct file access
runner.test('GET /index.html serves the file directly', async () => {
  const response = await runner.makeRequest('/index.html');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.equal(response.headers['content-type'], 'text/html', 'Should have correct content-type');
  assert.includes(response.body, 'Selectize vs Tom Select', 'Should contain expected content');
});

// Test: CSS file serving
runner.test('GET /demo.css serves CSS with correct content-type', async () => {
  const response = await runner.makeRequest('/demo.css');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.equal(response.headers['content-type'], 'text/css', 'Should have CSS content-type');
  assert.includes(response.body, 'body {', 'Should contain CSS content');
});

// Test: JavaScript file serving
runner.test('GET /demo.js serves JS with correct content-type', async () => {
  const response = await runner.makeRequest('/demo.js');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.equal(response.headers['content-type'], 'application/javascript', 'Should have JS content-type');
  assert.includes(response.body, 'const countries', 'Should contain JS content');
});

// Test: 404 for non-existent files
runner.test('GET /non-existent.html returns 404', async () => {
  const response = await runner.makeRequest('/non-existent.html', 404);
  assert.equal(response.status, 404, 'Should return 404 status');
  assert.equal(response.body, '404 Not Found', 'Should return 404 message');
});

// Test: Vendor routes for Selectize
runner.test('GET /vendor/selectize/dist/css/selectize.css serves package file', async () => {
  const response = await runner.makeRequest('/vendor/selectize/dist/css/selectize.css');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.equal(response.headers['content-type'], 'text/css', 'Should have CSS content-type');
  assert.includes(response.body, '.selectize', 'Should contain Selectize CSS');
});

// Test: Vendor routes for Tom Select
runner.test('GET /vendor/tom-select/dist/css/tom-select.css serves package file', async () => {
  const response = await runner.makeRequest('/vendor/tom-select/dist/css/tom-select.css');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.equal(response.headers['content-type'], 'text/css', 'Should have CSS content-type');
  assert.includes(response.body, '.ts-', 'Should contain Tom Select CSS');
});

// Test: Vendor routes for jQuery
runner.test('GET /vendor/jquery/dist/jquery.min.js serves jQuery', async () => {
  const response = await runner.makeRequest('/vendor/jquery/dist/jquery.min.js');
  assert.equal(response.status, 200, 'Should return 200 status');
  assert.equal(response.headers['content-type'], 'application/javascript', 'Should have JS content-type');
  assert.includes(response.body, 'jQuery', 'Should contain jQuery code');
});

// Test: Invalid vendor route returns 404
runner.test('GET /vendor/selectize/non-existent.js returns 404', async () => {
  const response = await runner.makeRequest('/vendor/selectize/non-existent.js', 404);
  assert.equal(response.status, 404, 'Should return 404 status');
});

// Test: MIME type detection
runner.test('MIME types are correctly detected', async () => {
  // Create temporary test files
  const testFiles = [
    { name: 'test.json', content: '{"test": true}', type: 'application/json' },
    { name: 'test.svg', content: '<svg></svg>', type: 'image/svg+xml' }
  ];

  for (const file of testFiles) {
    fs.writeFileSync(file.name, file.content);
    const response = await runner.makeRequest(`/${file.name}`);
    assert.equal(response.status, 200, `Should serve ${file.name}`);
    assert.equal(response.headers['content-type'], file.type, `Should have correct MIME type for ${file.name}`);
    fs.unlinkSync(file.name);
  }
});


// Run all tests
runner.run().catch(console.error);