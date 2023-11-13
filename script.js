let allPokemons = [];
let allPokemonsDetail = [];
let searchPokemonArray = [];
let searchPokemonArrayResult = [];
let searchPokemonArrayResultDetail = [];
let start = 1;
let end = 20;
let loadMoreBlock = false;
const NORESULTSMODAL = new bootstrap.Modal(document.getElementById("noresults"));
const ERRORSEARCHMODAL = new bootstrap.Modal(document.getElementById("errorSearch"));

async function init() {
  for (let i = start; i <= end; i++) {
    try {
      const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const RESPONSEDETAIL = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
      const RESPONSEASJSON = await RESPONSE.json();
      const RESPONSEDETAILASJSON = await RESPONSEDETAIL.json();
      allPokemons.push(RESPONSEASJSON);
      allPokemonsDetail.push(RESPONSEDETAILASJSON);
      generateOverview();
    } catch {
      errorFunction();
      break;
    }
  }
  spinnerHide();
}

async function fetchPokemon(i) {
  const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  const RESPONSEASJSON = await RESPONSE.json();
  return RESPONSEASJSON;
}

async function fetchPokemonDetail(i) {
  const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
  const RESPONSEASJSON = await RESPONSE.json();
  searchPokemonArrayResultDetail.push(RESPONSEASJSON);
  console.log('hello' + i);
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
  spinner(); // Load spinner
  let search = document.getElementById('inputValue').value.toLowerCase(); // hole value aus Suchfeld und umwandeln in Kleinbuchstaben 
  let cards = document.getElementById('cards'); //deklariert Variable Cards
  const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`); // abrufen der Daten von der Pokedex API
  try { // versuche auszuführen
    let data = await RESPONSE.json(); // response als JSON umwandeln und als Variable data deklarieren
    let results = ''; // leere Variable results deklarieren.
    loadMoreHide(); // LoadMore Button verstecken
    cards.innerHTML = ''; // Variable cards leeren
    searchPokemonArray = []; // Array leeren für Suchergebnis (nur Name von Pokemon)
    searchPokemonArrayResult = []; // Array leeren für JSON von Suchergebnis 
    searchPokemonArrayResultDetail = []; // Array leeren für JSON von Suchergebnis - Details Pokemon

    for (let j = 0; j < data.results.length; j++) { // durchläuft array x-mal(length array)
      let pokemon = data.results[j]; // deklariert variable pokemon mit wert aus data.results[j]
      if (pokemon.name.includes(search)) { // wenn value aus search input in pokemon.name enthalten ist
        searchPokemonArray.push(pokemon.name); // push pokemon.name in Array searchPokemonArray
        //fetchPokemonDetail(j);
      }
    }
    for (let k = 0; k < searchPokemonArray.length; k++) { // durchläuft array mit result aus vorheriger for Schleife x-mal (lenght)
      const element = searchPokemonArray[k]; // deklariert variable element mit wert aus array[k]
      searchPokemonArrayResult.push(await fetchPokemon(element));// führe function fetchPokemon mit Parameter(name pokemon) aus und push json return in Array searchPokemonArrayResult
      fetchPokemonDetail(element);  // hole weitere details zum Pokemon von anderem API Endpoint mit Parameter (name pokemon) und push Response in Array searchPokemonArrayResultDetail
      results += generateCardsSearchHTML(k, searchPokemonArrayResult); // führe generateCardsSearchHTML aus und generiere Pokemoncard, weise value der varaible results zu.
    }
    spinnerHide(); // blende spinner aus
    if (results === '') { // wenn Sucheingabe nicht gefunden wird
      NORESULTSMODAL.show(); // zeige Bootstrap Modal mit "Leider wurde kein Pokemon gefunden"
      init(); // lade Startseite neu
    }
    cards.innerHTML = results; // füge value aus results in HTML Tag mit der ID cards ein
  }
  catch (error) { // wenn try error zurückgibt
    spinnerHide(); // blende spinner aus
    ERRORSEARCHMODAL.show(); // zeige Bootstrap Modal mit "Leider ist die API aktuell nicht erreichbar"
  }
}

function openCard(i) {
  let pokemonBig = document.getElementById("openPokemonBox");
  document.getElementById("openPokemonBox").classList.remove("d-none");
  showPopup();
  let pokemon = allPokemons[i];
  let pokemonDetail = allPokemonsDetail[i];
  pokemonBig.innerHTML = generateCardHTML(i, pokemon, pokemonDetail);
  hideArrowLeft(i);
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

function hideArrowLeft(i) {
  let arrowLeft = document.getElementById('arrowLeft0');
  if (i == 0) {
    arrowLeft.classList.add('d-none');
  }
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
  if (loadMoreBlock == false) {
    loadMoreBlock = true;
    start += 10;
    end += 10;
    await init();
    window.scrollTo(0, document.body.scrollHeight);
    loadMoreBlock = false;
  }
}