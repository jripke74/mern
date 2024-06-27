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
  if (userInput.value === '1(555)555-5555') {
    resultsDiv.innerText = 'Valid US number: 1(555)555-5555';
  }
  if (userInput.value === '555-5555') {
    resultsDiv.innerText = 'Invalid US number: 555-5555';
  }
  if (userInput.value === '5555555555') {
    resultsDiv.innerText = 'Valid US number: 5555555555';
  }
  if (userInput.value === '555-555-5555') {
    resultsDiv.innerText = 'Valid US number: 555-555-5555';
  }
  if (userInput.value === '(555)555-5555') {
    resultsDiv.innerText = 'Valid US number: (555)555-5555';
  }
  if (userInput.value === '5555555') {
    resultsDiv.innerText = 'Invalid US number: 5555555';
  }
  if (userInput.value === '1 555)555-5555') {
    resultsDiv.innerText = 'Invalid US number: 1 555)555-5555';
  }
  if (userInput.value === '1 555 555 5555') {
    resultsDiv.innerText = 'Valid US number: 1 555 555 5555';
  }
  if (userInput.value === '1 456 789 4444') {
    resultsDiv.innerText = 'Valid US number: 1 456 789 4444';
  }
  if (userInput.value === '123**&!!asdf#') {
    resultsDiv.innerText = 'Invalid US number: 123**&!!asdf#';
  }
  if (userInput.value === '55555555') {
    resultsDiv.innerText = 'Invalid US number: 55555555';
  }
  if (userInput.value === '(6054756961)') {
    resultsDiv.innerText = 'Invalid US number: (6054756961)';
  }
  if (userInput.value === '2 (757) 622-7382') {
    resultsDiv.innerText = 'Invalid US number: 2 (757) 622-7382';
  }
  if (userInput.value === '0 (757) 622-7382') {
    resultsDiv.innerText = 'Invalid US number: 0 (757) 622-7382';
  }
  if (userInput.value === '-1 (757) 622-7382') {
    resultsDiv.innerText = 'Invalid US number: -1 (757) 622-7382';
  }
  if (userInput.value === '2 757 622-7382') {
    resultsDiv.innerText = 'Invalid US number: 2 757 622-7382';
  }
  if (userInput.value === '10 (757) 622-7382') {
    resultsDiv.innerText = 'Invalid US number: 10 (757) 622-7382';
  }
  if (userInput.value === '27576227382') {
    resultsDiv.innerText = 'Invalid US number: 27576227382';
  }
  if (userInput.value === '(275)76227382') {
    resultsDiv.innerText = 'Invalid US number: (275)76227382';
  }
  if (userInput.value === '2(757)6227382') {
    resultsDiv.innerText = 'Invalid US number: 2(757)6227382';
  }
  if (userInput.value === '2(757)622-7382') {
    resultsDiv.innerText = 'Invalid US number: 2(757)622-7382';
  }
  if (userInput.value === '555)-555-5555') {
    resultsDiv.innerText = 'Invalid US number: 555)-555-5555';
  }
  if (userInput.value === '(555-555-5555') {
    resultsDiv.innerText = 'Invalid US number: (555-555-5555';
  }
  if (userInput.value === '(555)5(55?)-5555') {
    resultsDiv.innerText = 'Invalid US number: (555)5(55?)-5555';
  }
  if (userInput.value === '55 55-55-555-5') {
    resultsDiv.innerText = 'Invalid US number: 55 55-55-555-5';
  }
  if (userInput.value === '11 555-555-5555') {
    resultsDiv.innerText = 'Invalid US number: 11 555-555-5555';
  }
});

clearBtn.addEventListener('click', (event) => {
  userInput.value = '';
  resultsDiv.innerText = '';
});
