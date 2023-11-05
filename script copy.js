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
  let pokemonDetail = allPokemonsDetail[i];
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
      <!-- TABS POPUP HEADER -->
  <ul class="nav justify-content-evenly" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="pokemonBoxTab active" id="base-tab" data-bs-toggle="tab" data-bs-target="#base" type="button"
        role="tab" aria-controls="base" aria-selected="false">About</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="pokemonBoxTab" id="evolution-tab" data-bs-toggle="tab" data-bs-target="#evolution" type="button"
        role="tab" aria-controls="evolution" aria-selected="false">Base Stats</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="pokemonBoxTab" id="moves-tab" data-bs-toggle="tab" data-bs-target="#moves" type="button" role="tab"
        aria-controls="moves" aria-selected="false">Moves</button>
    </li>
  </ul>
  <!-- TABS POPUP HEADER -->
  <div class="tab-content mt-1 " id="myTabContent">
    <div class="tab-pane fade show active" id="base" role="tabpanel" aria-labelledby="base">
    <div class="divTable unstyledTable">
  <div class="divTableBody">
  <div class="divTableRow">
  <div class="divTableCell">Height</div><div class="divTableCell">${pokemon['height'] / 10} m</div></div>
  <div class="divTableRow">
  <div class="divTableCell">Weight</div><div class="divTableCell">${pokemon['weight'] / 10} kg</div></div>
  <div class="divTableRow">
  <div class="divTableCell">Egg-Group</div><div class="divTableCell">${upperCase(pokemonDetail['egg_groups'][0]['name'])}</div></div>
  <div class="divTableRow">
  <div class="divTableCell">Color</div><div class="divTableCell">${upperCase(pokemonDetail['color']['name'])}</div></div>
  </div>
  </div>


    
    </div>
    <div class="tab-pane fade" id="evolution" role="tabpanel" aria-labelledby="evolution">
    <div style="width: 99%; height:400px">
    <canvas id="barChart"></canvas>
  </div>

    </div>
    <div class="tab-pane fade red height" id="moves" role="tabpanel" aria-labelledby="moves">
      
    </div>
  </div>
  </div>
</div>`;
  chart(i, allPokemons);
  pokemonMoves(i);
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


function pokemonMoves(i) {
  let move = document.getElementById('moves');
  let pokemon = allPokemons[i];
  for (let m = 0; m < pokemon.moves.length; m++) {
    const element = pokemon.moves[m]['move']['name'];
    move.innerHTML += /*html*/`
    <li class="moves">${upperCase(element)}</li>
    `;
  }
}

function tabs(about, stats, moves) {
  document.getElementById('about').style.display = `${about}`;
  console.log('klick');
  document.getElementById('stats').style.display = `${stats}`;
  document.getElementById('moves').style.display = `${moves}`;
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
