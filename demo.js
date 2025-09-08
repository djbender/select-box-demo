// Sample data for demonstrations
const countries = [
  {value: 'us', text: 'United States'},
  {value: 'uk', text: 'United Kingdom'},
  {value: 'ca', text: 'Canada'},
  {value: 'au', text: 'Australia'},
  {value: 'de', text: 'Germany'},
  {value: 'fr', text: 'France'},
  {value: 'jp', text: 'Japan'},
  {value: 'cn', text: 'China'},
  {value: 'br', text: 'Brazil'},
  {value: 'in', text: 'India'},
  {value: 'mx', text: 'Mexico'},
  {value: 'it', text: 'Italy'},
  {value: 'es', text: 'Spain'},
  {value: 'kr', text: 'South Korea'},
  {value: 'nl', text: 'Netherlands'}
];

const programmingTags = [
  {value: 'javascript', text: 'JavaScript'},
  {value: 'python', text: 'Python'},
  {value: 'java', text: 'Java'},
  {value: 'csharp', text: 'C#'},
  {value: 'cpp', text: 'C++'},
  {value: 'typescript', text: 'TypeScript'},
  {value: 'ruby', text: 'Ruby'},
  {value: 'go', text: 'Go'},
  {value: 'rust', text: 'Rust'},
  {value: 'php', text: 'PHP'},
  {value: 'swift', text: 'Swift'},
  {value: 'kotlin', text: 'Kotlin'},
  {value: 'react', text: 'React'},
  {value: 'vue', text: 'Vue.js'},
  {value: 'angular', text: 'Angular'},
  {value: 'nodejs', text: 'Node.js'},
  {value: 'django', text: 'Django'},
  {value: 'rails', text: 'Ruby on Rails'}
];

const cityGroups = {
  optgroups: [
    {value: 'usa', label: 'United States'},
    {value: 'canada', label: 'Canada'},
    {value: 'uk', label: 'United Kingdom'},
    {value: 'germany', label: 'Germany'}
  ],
  options: [
    {value: 'nyc', text: 'New York City', optgroup: 'usa'},
    {value: 'la', text: 'Los Angeles', optgroup: 'usa'},
    {value: 'chicago', text: 'Chicago', optgroup: 'usa'},
    {value: 'sf', text: 'San Francisco', optgroup: 'usa'},
    {value: 'miami', text: 'Miami', optgroup: 'usa'},
    {value: 'toronto', text: 'Toronto', optgroup: 'canada'},
    {value: 'vancouver', text: 'Vancouver', optgroup: 'canada'},
    {value: 'montreal', text: 'Montreal', optgroup: 'canada'},
    {value: 'calgary', text: 'Calgary', optgroup: 'canada'},
    {value: 'london', text: 'London', optgroup: 'uk'},
    {value: 'manchester', text: 'Manchester', optgroup: 'uk'},
    {value: 'birmingham', text: 'Birmingham', optgroup: 'uk'},
    {value: 'berlin', text: 'Berlin', optgroup: 'germany'},
    {value: 'munich', text: 'Munich', optgroup: 'germany'},
    {value: 'hamburg', text: 'Hamburg', optgroup: 'germany'}
  ]
};

// Initialize Selectize instances
$(document).ready(function() {
  console.log('Initializing Selectize instances...');
  
  // Selectize Basic Select
  const selectizeBasic = $('#selectize-basic').selectize({
    create: false,
    sortField: 'text',
    searchField: 'text',
    options: countries,
    placeholder: 'Select a country...',
    maxItems: 1,
    onChange: function(value) {
      console.log('Selectize Basic - Selection changed:', value);
    },
    onFocus: function() {
      console.log('Selectize Basic - Focused');
    },
    onBlur: function() {
      console.log('Selectize Basic - Blurred');
    }
  });

  // Selectize Multi-Select with Tags
  const selectizeTags = $('#selectize-tags').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      const newTag = {
        value: input.toLowerCase().replace(/\s+/g, '-'),
        text: input
      };
      console.log('Selectize Tags - Created new tag:', newTag);
      return newTag;
    },
    options: programmingTags,
    placeholder: 'Choose tags...',
    maxItems: null,
    closeAfterSelect: true,
    plugins: ['remove_button'],
    onChange: function(value) {
      console.log('Selectize Tags - Selection changed:', value);
    },
    onItemAdd: function(value, item) {
      console.log('Selectize Tags - Item added:', value);
    },
    onItemRemove: function(value) {
      console.log('Selectize Tags - Item removed:', value);
    }
  });

  // Selectize Option Groups
  const selectizeGroups = $('#selectize-groups').selectize({
    sortField: 'text',
    searchField: 'text',
    optgroups: cityGroups.optgroups,
    options: cityGroups.options,
    placeholder: 'Select a city...',
    optgroupField: 'optgroup',
    labelField: 'text',
    valueField: 'value',
    onChange: function(value) {
      console.log('Selectize Groups - Selection changed:', value);
    },
    onFocus: function() {
      console.log('Selectize Groups - Focused');
    },
    onBlur: function() {
      console.log('Selectize Groups - Blurred');
    }
  });
});

// Initialize Tom Select instances
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Tom Select instances...');
  
  // Tom Select Basic Select
  const tomBasic = new TomSelect('#tom-basic', {
    create: false,
    sortField: 'text',
    searchField: 'text',
    options: countries,
    placeholder: 'Select a country...',
    maxItems: 1,
    allowEmptyOption: true,
    onChange: function(value) {
      console.log('Tom Select Basic - Selection changed:', value);
    },
    onFocus: function() {
      console.log('Tom Select Basic - Focused');
    },
    onBlur: function() {
      console.log('Tom Select Basic - Blurred');
    }
  });

  // Tom Select Multi-Select with Tags
  const tomTags = new TomSelect('#tom-tags', {
    delimiter: ',',
    persist: false,
    create: function(input) {
      const newTag = {
        value: input.toLowerCase().replace(/\s+/g, '-'),
        text: input
      };
      console.log('Tom Select Tags - Created new tag:', newTag);
      return newTag;
    },
    options: programmingTags,
    placeholder: 'Choose tags...',
    maxItems: null,
    plugins: ['remove_button', 'clear_button'],
    closeAfterSelect: true,
    onChange: function(value) {
      console.log('Tom Select Tags - Selection changed:', value);
    },
    onItemAdd: function(value, item) {
      console.log('Tom Select Tags - Item added:', value);
    },
    onItemRemove: function(value) {
      console.log('Tom Select Tags - Item removed:', value);
    }
  });

  // Tom Select Option Groups
  const tomGroups = new TomSelect('#tom-groups', {
    sortField: 'text',
    searchField: 'text',
    optgroups: cityGroups.optgroups,
    options: cityGroups.options,
    placeholder: 'Select a city...',
    optgroupField: 'optgroup',
    labelField: 'text',
    valueField: 'value',
    plugins: ['clear_button'],
    onChange: function(value) {
      console.log('Tom Select Groups - Selection changed:', value);
    },
    onFocus: function() {
      console.log('Tom Select Groups - Focused');
    },
    onBlur: function() {
      console.log('Tom Select Groups - Blurred');
    }
  });
});