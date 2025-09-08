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
  // Selectize Basic Select
  $('#selectize-basic').selectize({
    create: false,
    sortField: 'text',
    searchField: 'text',
    options: countries,
    placeholder: 'Select a country...',
    maxItems: 1
  });

  // Selectize Multi-Select with Tags
  $('#selectize-tags').selectize({
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input.toLowerCase().replace(/\s+/g, '-'),
        text: input
      }
    },
    options: programmingTags,
    placeholder: 'Choose tags...',
    maxItems: null,
    closeAfterSelect: true,
    plugins: ['remove_button']
  });

  // Selectize Option Groups
  $('#selectize-groups').selectize({
    sortField: 'text',
    searchField: 'text',
    optgroups: cityGroups.optgroups,
    options: cityGroups.options,
    placeholder: 'Select a city...',
    optgroupField: 'optgroup',
    labelField: 'text',
    valueField: 'value'
  });
});

// Initialize Tom Select instances
document.addEventListener('DOMContentLoaded', function() {
  // Tom Select Basic Select
  new TomSelect('#tom-basic', {
    create: false,
    sortField: 'text',
    searchField: 'text',
    options: countries,
    placeholder: 'Select a country...',
    maxItems: 1,
    allowEmptyOption: true
  });

  // Tom Select Multi-Select with Tags
  new TomSelect('#tom-tags', {
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input.toLowerCase().replace(/\s+/g, '-'),
        text: input
      }
    },
    options: programmingTags,
    placeholder: 'Choose tags...',
    maxItems: null,
    plugins: ['remove_button', 'clear_button'],
    closeAfterSelect: true
  });

  // Tom Select Option Groups
  new TomSelect('#tom-groups', {
    sortField: 'text',
    searchField: 'text',
    optgroups: cityGroups.optgroups,
    options: cityGroups.options,
    placeholder: 'Select a city...',
    optgroupField: 'optgroup',
    labelField: 'text',
    valueField: 'value',
    plugins: ['clear_button']
  });
});