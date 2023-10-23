let currentPokemon;
let allPokemons = [];
let searchPokemonArray = [];
let limit = 10;
let start = 1;
let end = 10;

async function init() {
  await getPokemons();
}

async function getPokemons() {
  for (let i = start; i <= end; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${[i]}`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    console.log(responseAsJson);
    allPokemons.push(responseAsJson);
  }
  generateOverview();
}

function generateOverview() {
  let pokemonName = document.getElementById('cards');
  pokemonName.innerHTML = ``;
  for (let i = 0; i < allPokemons.length; i++) {
    let element = allPokemons[i];
    pokemonName.innerHTML += `
    <div id="card${[i + 1]}" class="card">
      <h1>${element['name']}</h1>
      <img src='${element['sprites']['front_default']}'>
    </div>`;
  }
}

function loadMore() {
  start += 10;
  end += 10;
  getPokemons();
}

async function searchPokemon() {
  let search = document.getElementById('inputValue').value;
  let cards = document.getElementById('cards');
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=1000`;

  try {
    let response = await fetch(url);

    if (response.status === 200) {
      let data = await response.json();

      cards.innerHTML = '';
      let results = '';

      for (let j = 0; j < data.results.length; j++) {
        let pokemon = data.results[j];

        if (pokemon.name.toLowerCase().includes(search.toLowerCase())) {
          searchPokemonArray.push([j + 1]);
          results += `
          <div id="card${[j + 1]}" class="card">
            <h1>${pokemon['name']}</h1>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${[j + 1]}.png'>
          </div>`;
        }
      }
      if (results === '') {
        results = '<li>Kein passendes Pokémon gefunden.</li>';
      }
      cards.innerHTML = results;
    }


  } catch (error) {
    console.error('fehler ', error);
  }
}