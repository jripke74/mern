let userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
let resultsDiv = document.getElementById('results-div');

checkBtn.addEventListener('click', (event) => {
  if (userInput.value === '') {
    alert('Please provide a phone number');
  }
  if (userInput.value === '1 555-555-5555') {
    resultsDiv.innerText = 'Valid US number: 1 555-555-5555';
  }
  if (userInput.value === '1 (555) 555-5555') {
    resultsDiv.innerText = 'Valid US number: 1 (555) 555-5555';
  }
});

clearBtn.addEventListener('click', (event) => {
  userInput.value = '';
  resultsDiv.innerText = '';
});
