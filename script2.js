let allPokemons = [];
let allPokemonsDetail = [];
let searchPokemonArray = [];
let searchPokemonArrayResult = [];
let start = 1;
let end = 10;

async function init() {
  for (let i = start; i <= end; i++) {
    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let responseDetail = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
      let responseAsJson = await response.json();
      let responseDetailAsJson = await responseDetail.json();
      allPokemons.push(responseAsJson);
      allPokemonsDetail.push(responseDetailAsJson);
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

async function fetchPokemonDetail(i) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
  let responseAsJson = await response.json();
  return responseAsJson;
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
  showPopup();
  let pokemon = allPokemons[i];
  let pokemonDetail = allPokemonsDetail[i];
  pokemonBig.innerHTML =/*html*/ `
<div class="pokemonBox" onclick="doNotClose(event)">
<!-- <div class="pokemonBox" > -->
  <button class="arrow-left" onclick="backImage(${i})">
      <i class="material-icons icon"><</i>
  </button>
  <div class="card-container">
  <!-- <div class="card-container" onclick="doNotClose(event)"> -->
    <div class="card-item-top ${pokemon['types'][0]['type']['name']}">
      <!-- <div class=""> -->
      <div class="card-item-header ">
        <div onclick="closeDialog()" class="cardClose">X</div>
        <!-- <div class="cardClose">X</div> -->
        <h1 class="pokemonBoxHeadlineText">${upperCase(pokemon.name)}</h1>
        <div class="cardLikeIconHeart"></div>
      </div>
      <!-- </div> -->
      <div class="card-item">
        <img class="card-item-image" src='${pokemon['sprites']['other']['home']['front_default']}' alt="">
      </div>
    </div>
    <div class="card-item">
      <div class="card-item-tab-header">
        <p class="card-item-tab" onclick="cardTab('flex','none','none')">ABOUT</p>
        <p class="card-item-tab" onclick="cardTab('none','flex','none')">BASE STATS</p>
        <p class="card-item-tab" onclick="cardTab('none','none','flex')">MOVES</p>
      </div>
    </div>
    <div class="card-item">
      <div id="tab1" class="card-item-tab-content" style="display: flex;">
        <div class="card-table" role="region" tabindex="0">
          <table>
            <tbody>
              <tr>
                <td>Height</td>
                <td>${pokemon['height'] / 10} m</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>${pokemon['weight'] / 10} kg</td>
              </tr>
              <tr>
                <td>Egg Group</td>
                <td>${upperCase(pokemonDetail['egg_groups'][0]['name'])}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>${upperCase(pokemonDetail['color']['name'])}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="tab2" class="card-item-tab-content" style="display: none;">
        <canvas id="barChart" height="100%" width="100%"></canvas>
      </div>
      <div id="tab3" class="card-item-tab-content card-item-tab-content-move" style="display: none;">
      </div>
    </div>
  </div>
  <button class="arrow-right" onclick="forwardImage(${i})">
      <i class="material-icons icon">></i>
  </button>
</div>`;
  chart(i, allPokemons);
  pokemonMoves(i);
}

function pokemonMoves(i) {
  let move = document.getElementById('tab3');
  let pokemon = allPokemons[i];
  for (let m = 0; m < pokemon.moves.length; m++) {
    const element = pokemon.moves[m]['move']['name'];
    move.innerHTML += /*html*/`
    <div class="card-item-move">${upperCase(element)} <img src="img/ball_tab.png" style="width:10px"> </div>
    `;
  }
}


function cardTab(tab1, tab2, tab3) {
  document.getElementById('tab1').style.display = `${tab1}`;
  document.getElementById('tab2').style.display = `${tab2}`;
  document.getElementById('tab3').style.display = `${tab3}`;
}

function showPopup() {
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.body.style.overflow = '';
}



function backImage(i) {
  if (i > 0) {
    i--;
  } else {
    i = allPokemons.length - 1;
  }

  openCard(i);
}

function forwardImage(i) {
  if (i < allPokemons.length - 1) {
    i++;
  } else {
    i = 0;
  }

  openCard(i);
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
        searchPokemonArray.push(pokemon.name); s
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


function tabs(about, stats, moves) {
  document.getElementById('about').style.display = `${about}`;
  console.log('klick');
  document.getElementById('stats').style.display = `${stats}`;
  document.getElementById('movesTab').style.display = `${moves}`;
}

function closeDialog() {
  document.getElementById("openPokemonBox").classList.add("d-none");
  closePopup();
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
