function generateCardsHTML(i, element) {
  return /*html*/`
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

function generateCardHTML(i, pokemon, pokemonDetail) {
  return /*html*/ `
  <div class="pokemonBox" onclick="doNotClose(event)">
    <div class="card-container">
    <button class="arrow-left-button ${pokemon['types'][0]['type']['name']}" onclick="backCard(${i}, allPokemons, openCard)" id="arrowLeft${i}">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    </button>
      <div class="card-item-top ${pokemon['types'][0]['type']['name']}">
        <div class="card-item-header ">
          <div onclick="closeDialog()" class="cardClose">X</div>
          <h1 class="pokemonBoxHeadlineText">${upperCase(pokemon.name)}</h1>
          <div class=""></div>
        </div>
        <div class="card-item">
          <p class="${pokemon['types'][0]['type']['name']}-text popup-type">${upperCase(pokemon['types']['0']['type']['name'])}</p>
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
        <div id="tab2" class="card-item-tab-content" style="display: none; height: 210px";>
          <canvas id="barChart" height="210px" width="100%"></canvas>
        </div>
        <div id="tab3" class="card-item-tab-content card-item-tab-content-move" style="display: none;">
        </div>
      </div>
      <button class="arrow-right-button ${pokemon['types'][0]['type']['name']}" onclick="forwardCard(${i}, allPokemons, openCard)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
      </button>
    </div>
  </div>`;
}

function generateCardsSearchHTML(k, searchPokemonArrayResult) {
  return /*html*/ `
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



function generateCardSearchHTML(j, pokemon, pokemonDetail) {
  return /*html*/`
  <div class="pokemonBox" onclick="doNotClose(event)">
    <div class="card-container">
    <button class="arrow-left-button ${pokemon['types'][0]['type']['name']}" onclick="backCard(${j}, searchPokemonArrayResult, openCardSearch)">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    </button>
      <div class="card-item-top ${pokemon['types'][0]['type']['name']}">
        <div class="card-item-header ">
          <div onclick="closeDialog()" class="cardClose">X</div>
          <h1 class="pokemonBoxHeadlineText">${upperCase(pokemon.name)}</h1>
          <div class="cardLikeIconHeart"></div>
        </div>
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
                <td style="width: 19.6994%;">Egg Group</td>
                <td style="width: 80.1049%;">${upperCase(pokemonDetail['egg_groups'][0]['name'])}</td>
              </tr>
              <tr>
                <td style="width: 19.6994%;">Color</td>
                <td style="width: 80.1049%;">${upperCase(pokemonDetail['color']['name'])}</td>
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
      <button class="arrow-right-button ${pokemon['types'][0]['type']['name']}" onclick="forwardCard(${j}, searchPokemonArrayResult, openCardSearch)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
      </button>
    </div>
  </div>`;

}

function generateCardMovesHTML(element) {
  return /*html*/`
  <div class="card-item-move">${upperCase(element)} <img src="img/ball_tab.png" style="width:10px"> </div>
  `;
}