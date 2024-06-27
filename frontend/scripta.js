let userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
let resultsDiv = document.getElementById('results-div');

checkBtn.addEventListener('click', (event) => {
  if (userInput.innerText === '') {
    alert('Please provide a phone number');
  }
});

clearBtn.addEventListener('click', (event) => {
  userInput.value = '';
  resultsDiv.innerText = '';
});
