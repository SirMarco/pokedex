let allPokemons = [];
let searchPokemonArray = [];
let searchPokemonArrayResult = [];
let start = 1;
let end = 25;

const TYPECOLORS = {
  normal: '#C6C6A7',
  fire: '#F5AC78',
  water: '#9DB7F5',
  electric: '#FAE078',
  grass: '#A7DB8D',
  ice: '#BCE6E6',
  fighting: '#D67873',
  poison: '#C183C1',
  ground: '#EBD69D',
  flying: '#A890F0',
  psychic: '#FA92B2',
  bug: '#C6D16E',
  rock: '#D1C17D',
  ghost: '#A292BC',
  dragon: '#A27DFA',
  dark: '#A29288',
  steel: '#D1D1E0',
  fairy: '#F4BDC9',
};





async function init() {
  for (let i = start; i <= end; i++) {
    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let responseAsJson = await response.json();
      allPokemons.push(responseAsJson);
      generateCards();
    } catch {
      errorFunction();
      break;
    }
  }
}

async function fetchPokemon(i) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  let responseAsJson = await response.json();
  return responseAsJson;
}

async function searchPokemon() {
  let search = document.getElementById('inputValue').value.toLowerCase();
  let cards = document.getElementById('cards');
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
  try {
    let data = await response.json();
    let results = '';
    cards.innerHTML = '';
    searchPokemonArray = [];
    searchPokemonArrayResult = [];


    for (let j = 0; j < data.results.length; j++) {
      let pokemon = data.results[j];
      if (pokemon.name.includes(search)) {
        searchPokemonArray.push(pokemon.name);
      }
    }
    for (let k = 0; k < searchPokemonArray.length; k++) {
      const element = searchPokemonArray[k];
      searchPokemonArrayResult.push(await fetchPokemon(element));
      console.log(element);
      results += HTML`
        <div id="card" class="pokemonCard">
        <div class="pokemonCardHeadline">
          <h1 class="mt-2">${searchPokemonArrayResult[k]['name']}</h1>
          <div class="mt-2">${searchPokemonArrayResult[k]['height']}</div>
        </div>
        <div class="pokemonCardContent">
          <div class="pokemonCardContentType">
            <div class="pokemonCardContentTypeType">type</div>
          </div>
          <img src='${searchPokemonArrayResult[k]['sprites']['front_default']}'></img>
        </div>
      </div>`;


    }


    if (results === '') {
      results = '<li>Kein passendes Pokémon gefunden.</li>';
    }
    cards.innerHTML = results;
  }
  catch {
    cards.innerHTML = '<li>suche aktuell nicht möglich</li>';
    console.log('fehler in der suche');
  }
}


function generateCards() {
  let pokemonName = document.getElementById('cards');
  pokemonName.innerHTML = ``;
  for (let i = 0; i < allPokemons.length; i++) {
    let element = allPokemons[i];
    pokemonName.innerHTML += `
    <div id="card${[i + 1]}" class="pokemonCard ${element['types'][0]['type']['name']}" onclick="openCard(${[i]})">
        <div class="pokemonCardHeadline">
          <h1 class="mt-2">${element['name']}</h1>
          <div class="mt-2">${element['id']}</div>
        </div>
        <div class="pokemonCardContent">
          <div class="pokemonCardContentType">
            <div class="pokemonCardContentTypeType">${element['types']['0']['type']['name']}</div>
          </div>
          <img src='${element['sprites']['other']['dream_world']['front_default']}'></img>
        </div>
     </div>`;
  }
}

function openCard(i) {
  let pokemonBig = document.getElementById("openPokemonBox");
  document.getElementById("openPokemonBox").classList.remove("d-none");
  let pokemon = allPokemons[i];
  pokemonBig.innerHTML = `
  <div class="pokemonBox" onclick="doNotClose(event)">
  <div class="pokemonBoxHeadline">
    <div>${pokemon['name']}</div>
    <div><img src='${pokemon['sprites']['back_default']}'></div>
  </div>
  <div class="pokemonBoxContent">
    <div>Headline</div>
    <div>Content</div>
  </div>
</div>`;
}

function openCardSearch(j) {
  let pokemonBig = document.getElementById("openPokemonBox");
  document.getElementById("openPokemonBox").classList.remove("d-none");
  let pokemon = searchPokemonArrayResult[j];
  pokemonBig.innerHTML = `
  <div class="pokemonBox" onclick="doNotClose(event)">
  <div class="pokemonBoxHeadline">
    <div>${pokemon['name']}</div>
    <div><img src='${pokemon['sprites']['back_default']}'></div>
  </div>
  <div class="pokemonBoxContent">
    <div>Headline</div>
    <div>Content</div>
  </div>
</div>`;
}


function setTypeColor() {

}



function closeDialog() {
  document.getElementById("openPokemonBox").classList.add("d-none");
}

function doNotClose(event) {
  event.stopPropagation();
}

function errorFunction() {
  console.warn('fehler error function');
}

function loadMore() {
  start += 10;
  end += 10;
  init();
}
