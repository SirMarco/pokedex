let allPokemons = [];
let searchPokemonArray = [];
let start = 1;
let end = 5;

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
    cards.innerHTML = '';
    let results = '';

    for (let j = 0; j < data.results.length; j++) {
      let pokemon = data.results[j];
      if (pokemon.name.includes(search)) {
        searchPokemonArray.push(pokemon.name);
        console.log(fetchPokemon(pokemon.name));
        results += `${pokemon['name']}
        <a>${pokemon['id']}</a>`;

        /*results += `
          <div id="card${[j + 1]}" class="card">
            <h1>${pokemon['name']}</h1>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${[j + 1]}.png'>
            <button onclick="openCard(${[j + 1]})">CLick me</button>
          </div>`;*/
      }

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
    <div id="card${[i + 1]}" class="card">
      <h1>${element['name']}</h1>
      <img src='${element['sprites']['front_default']}'>
      <button onclick="openCard(${[i]})">CLick me</button>
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
  let pokemon = searchPokemonArray[j];
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
