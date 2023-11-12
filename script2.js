let allPokemons = [];
let allPokemonsDetail = [];
let searchPokemonArray = [];
let searchPokemonArrayResult = [];
let searchPokemonArrayResultDetail = [];
let start = 1;
let end = 20;
const noresultsModal = new bootstrap.Modal(document.getElementById("noresults"));
const errorSearchModal = new bootstrap.Modal(document.getElementById("errorSearch"));

async function init() {
  for (let i = start; i <= end; i++) {
    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let responseDetail = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
      let responseAsJson = await response.json();
      let responseDetailAsJson = await responseDetail.json();
      allPokemons.push(responseAsJson);
      allPokemonsDetail.push(responseDetailAsJson);
      generateOverview();
    } catch {
      errorFunction();
      break;
    }
  }
  spinnerHide();
}

async function fetchPokemon(i) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  let responseAsJson = await response.json();
  return responseAsJson;
}

async function fetchPokemonDetail(i) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
  let responseAsJson = await response.json();
  searchPokemonArrayResultDetail.push(responseAsJson);
}

function generateOverview() {
  let pokemonName = document.getElementById('cards');
  pokemonName.innerHTML = ``;
  for (let i = 0; i < allPokemons.length; i++) {
    let element = allPokemons[i];
    pokemonName.innerHTML += generateCardsHTML(i, element);
  }
}

async function searchPokemon() {
  spinner();
  let search = document.getElementById('inputValue').value.toLowerCase();
  console.log(search);
  let cards = document.getElementById('cards');
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
  try {
    let data = await response.json();
    console.log(data);
    let results = '';
    loadMoreHide();
    cards.innerHTML = '';
    searchPokemonArray = [];
    searchPokemonArrayResult = [];
    searchPokemonArrayResultDetail = [];

    for (let j = 0; j < data.results.length; j++) {
      let pokemon = data.results[j];
      if (pokemon.name.includes(search)) {
        searchPokemonArray.push(pokemon.name);
        fetchPokemonDetail(j);
      }
    }
    for (let k = 0; k < searchPokemonArray.length; k++) {
      const element = searchPokemonArray[k];
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
    spinnerHide();
    if (results === '') {
      results = '<h2>Leider wurde kein Pokemon gefunden</h2>';
      noresultsModal.show();
    }
    cards.innerHTML = results;
  }
  catch (error) {
    results = errorSearchModal.show();
    console.log('fehler in der suche' + error);
  }
}

function openCard(i) {
  let pokemonBig = document.getElementById("openPokemonBox");
  document.getElementById("openPokemonBox").classList.remove("d-none");
  showPopup();
  let pokemon = allPokemons[i];
  let pokemonDetail = allPokemonsDetail[i];
  pokemonBig.innerHTML = generateCardHTML(i, pokemon, pokemonDetail);
  chart(i, allPokemons);
  pokemonMoves(i);
}

function pokemonMoves(i) {
  let move = document.getElementById('tab3');
  let pokemon = allPokemons[i];
  for (let m = 0; m < pokemon.moves.length; m++) {
    const element = pokemon.moves[m]['move']['name'];
    move.innerHTML += generateCardMovesHTML(element);
  }
}

function cardTab(tab1, tab2, tab3) {
  document.getElementById('tab1').style.display = `${tab1}`;
  document.getElementById('tab2').style.display = `${tab2}`;
  document.getElementById('tab3').style.display = `${tab3}`;
}

function showPopup() {
  document.body.style.overflow = 'hidden';
  document.getElementById("topButton").style.display = "none";
}

function closePopup() {
  document.body.style.overflow = '';
  document.getElementById("topButton").style.display = "block";
}



function openCardSearch(j) {
  let pokemonBig = document.getElementById("openPokemonBox");
  document.getElementById("openPokemonBox").classList.remove("d-none");
  showPopup()
  let pokemon = searchPokemonArrayResult[j];
  let pokemonDetail = searchPokemonArrayResultDetail[j];
  pokemonBig.innerHTML = generateCardSearchHTML(j, pokemon, pokemonDetail);
  chart(j, searchPokemonArrayResult);
  pokemonMoves(j);
}


function tabs(about, stats, moves) {
  document.getElementById('about').style.display = `${about}`;
  console.log('klick');
  document.getElementById('stats').style.display = `${stats}`;
  document.getElementById('movesTab').style.display = `${moves}`;
}

function backCard(i, array, card) {
  if (i > 0) {
    i--;
  } else {
    i = array.length - 1;
  }
  card(i);
}

function forwardCard(i, array, card) {
  if (i < array.length - 1) {
    i++;
  } else {
    i = 0;
  }
  card(i);
}

function closeDialog() {
  document.getElementById("openPokemonBox").classList.add("d-none");
  closePopup();
}

function loadMoreHide() {
  document.getElementById('loadMore').style.display = 'none';
}
function spinner() {
  document.getElementById('spinner').style.display = "flex";
}
function spinnerHide() {
  document.getElementById('spinner').style.display = "none";
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
  return `#` + numToString.padStart(4, '0');
}

async function loadMore() {
  start += 10;
  end += 10;
  await init();
  window.scrollTo(0, document.body.scrollHeight);
}
