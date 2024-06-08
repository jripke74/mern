const userInput = document.getElementById('user-input').value;
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');
console.log('user:', userInput);

checkBtn.addEventListener('click', (event) => {
  if (userInput === '') {
    alert('something');
  }
});

clearBtn.addEventListener('click', (event) => {
  userInput = '';
  resultsDiv = '';
});
