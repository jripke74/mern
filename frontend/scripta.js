let userInput = document.getElementById('user-input').value;
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
let resultsDiv = document.getElementById('results-div').value;

checkBtn.addEventListener('click', (event) => {
  if (userInput === '') {
    alert('Please provide a phone number');
  }
});

clearBtn.addEventListener('click', (event) => {
  userInput.innerHTML = '';
  resultsDiv.innerHTML = '';
});
