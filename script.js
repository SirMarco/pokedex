let currentPokemon;
let allPokemons = [];
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
    // console.log(element);

    pokemonName.innerHTML += `
    <div id="card${[i + 1]}" class="card">
      <h1>${element['name']}</h1>
      <img src='${element['sprites']['front_default']}'>
    </div>

    `;
  }
}

function loadMore() {
  start += 10;
  end += 10;
  getPokemons();
}