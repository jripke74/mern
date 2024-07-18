const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let pokemonName = document.getElementById('pokemon-name');
let pokemonId = document.getElementById('pokemon-id');
let weight = document.getElementById('weight');
let height = document.getElementById('height');
let hp = document.getElementById('hp');
let attack = document.getElementById('attack');
let defense = document.getElementById('defense');
let specialAttack = document.getElementById('special-attack');
let specialDefense = document.getElementById('special-defense');
let speed = document.getElementById('speed');

searchButton.addEventListener('click', (event) => {
  if (searchInput.value === 'Red') {
    alert('Pokemon not found');
  } else if (searchInput.value === 'Pikachu') {
    pokemonName = 'PIKACHU';
    pokemonId = 25;
    weight = '60';
    height = 4;
    hp = 35;
    attack = 55;
    defense = 40;
    specialAttack = 50;
    specialDefense = 50;
    speed = 90;
  }
});
