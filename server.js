const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

function resolvePackageFile(packageName, filePath) {
  try {
    const packagePath = require.resolve(packageName);
    // Find the package root by looking for node_modules/packageName
    const parts = packagePath.split(path.sep);
    const nodeModulesIndex = parts.lastIndexOf('node_modules');
    if (nodeModulesIndex !== -1) {
      // Get the package root directory
      const packageParts = packageName.split('/');
      const packageRoot = parts.slice(0, nodeModulesIndex + 1 + packageParts.length).join(path.sep);
      return path.join(packageRoot, filePath);
    }
    return null;
  } catch (err) {
    return null;
  }
}

const server = http.createServer((req, res) => {
  let url = req.url;

  if (url === '/') {
    url = '/index.html';
  }

  if (url.startsWith('/vendor/selectize/')) {
    const relativePath = url.replace('/vendor/selectize/', '');
    const fullPath = resolvePackageFile('@selectize/selectize', relativePath);
    if (fullPath && fs.existsSync(fullPath)) {
      serveFile(fullPath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else if (url.startsWith('/vendor/tom-select/')) {
    const relativePath = url.replace('/vendor/tom-select/', '');
    const fullPath = resolvePackageFile('tom-select', relativePath);
    if (fullPath && fs.existsSync(fullPath)) {
      serveFile(fullPath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else if (url.startsWith('/vendor/jquery/')) {
    const relativePath = url.replace('/vendor/jquery/', '');
    const fullPath = resolvePackageFile('jquery', relativePath);
    if (fullPath && fs.existsSync(fullPath)) {
      serveFile(fullPath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else {
    const filePath = path.join(__dirname, url);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveFile(filePath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

function startServer() {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Open this URL in your browser to view the demo');
  });
  return server;
}

// Only start server if this file is run directly (not imported)
if (require.main === module) {
  startServer();
}

module.exports = { server, startServer };