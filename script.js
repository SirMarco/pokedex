let allPokemons = [];
let searchPokemonArray = [];
let searchPokemonArrayResult = [];
let start = 1;
let end = 30;

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
      // console.log(element);
      searchPokemonArrayResult.push(await fetchPokemon(element));
      results +=  /*html*/ `
       <div id="card${[k + 1]}" class="pokemonCard ${searchPokemonArrayResult[k]['types'][0]['type']['name']}" onclick="openCardSearch(${[k]})">
       <div class="pokemonCardTop">
        <h1 class="mt-2 text-white">${upperCase(searchPokemonArrayResult[k]['name'])}</h1>
        <p class="mt-2 text-white">${modifyId((searchPokemonArrayResult[k]['id']))}</p>
      </div>
      <div class="pokemonCardBottom">
      <div class="pokemonCardBottom-1">
        <p class="${searchPokemonArrayResult[k]['types'][0]['type']['name']}-text">${upperCase(searchPokemonArrayResult[k]['types']['0']['type']['name'])}</p>
      </div>
      <div class="pokemonCardBottom-2">
      <img src='${searchPokemonArrayResult[k]['sprites']['other']['home']['front_default']}'>
      </div>
    </div>
    </div>`;
    }


    if (results === '') {
      results = '<li>Kein passendes Pokémon gefunden.</li>';
    }
    cards.innerHTML = results;
  }
  catch (error) {
    cards.innerHTML = '<li>suche aktuell nicht möglich</li>';
    console.log('fehler in der suche' + error);
  }
}


function generateCards() {
  let pokemonName = document.getElementById('cards');
  pokemonName.innerHTML = ``;
  for (let i = 0; i < allPokemons.length; i++) {
    let element = allPokemons[i];
    pokemonName.innerHTML += /*html*/`
    <div id="card${[i + 1]}" class="pokemonCard ${element['types'][0]['type']['name']}" onclick="openCard(${[i]})">
      <div class="pokemonCardTop">
        <h1 class="mt-2 text-white">${upperCase(element['name'])}</h1>
        <p class="mt-2 text-white">${modifyId((element['id']))}</p>
      </div>
    <div class="pokemonCardBottom">
      <div class="pokemonCardBottom-1">
        <p class="${element['types'][0]['type']['name']}-text">${upperCase(element['types']['0']['type']['name'])}</p>
      </div>
      <div class="pokemonCardBottom-2">
        <img src='${element['sprites']['other']['dream_world']['front_default']}'>
      </div>
    </div>
    </div>`;
  }
}

function openCard(i) {
  let pokemonBig = document.getElementById("openPokemonBox");
  document.getElementById("openPokemonBox").classList.remove("d-none");
  let pokemon = allPokemons[i];
  pokemonBig.innerHTML =/*html*/ `
  <div class="pokemonBox" onclick="doNotClose(event)">
  <div class="pokemonBoxHeadline ${pokemon['types'][0]['type']['name']}">
    <div class="pokemonBoxHeadlineText">
      <div onclick="closeDialog()" class="cardClose"></div>
      <div>
        <h1 class="pokemonBoxHeadlineText">${upperCase(pokemon.name)}</h1>
      </div>
      <div class="cardLikeIconHeart"></div>
    </div>
    <div class="pokemonBoxHeadlineImg">
    <img src='${pokemon['sprites']['other']['home']['front_default']}'>
    </div>
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
  pokemonBig.innerHTML =/*html*/`
  <div class="pokemonBox" onclick="doNotClose(event)">
  <div class="pokemonBoxHeadline ${pokemon['types'][0]['type']['name']}">
    <div class="pokemonBoxHeadlineText">
      <div onclick="closeDialog()" class="cardClose">Close</div>
      <div>
        <h1 class="pokemonBoxHeadlineText">${upperCase(pokemon.name)}</h1>
      </div>
      <div class="cardLikeIconHeart"></div>
    </div>
    <div class="pokemonBoxHeadlineImg">
    <img src='${pokemon['sprites']['other']['home']['front_default']}'>
    </div>
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

function upperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function modifyId(number) {
  let numToString = number.toString();
  // console.log(numToString);
  return `#` + numToString.padStart(4, '0');
}

function loadMore() {
  start += 10;
  end += 10;
  init();
}
