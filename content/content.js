import Utils from "./utils.js";

// Creates the main wrapper div
function createDiv() {
  const mainWrapper = document.createElement("div");
  mainWrapper.className = "main-fixed";

  // Create the table header row
  const headerRow = document.createElement("div");
  headerRow.className = "header-row";
  headerRow.id = "headerRow";

  const pokemonHeader = document.createElement("div");
  pokemonHeader.textContent = "Pokemon";
  headerRow.appendChild(pokemonHeader);

  const weaknessHeader = document.createElement("div");
  weaknessHeader.textContent = "Weakness";
  headerRow.appendChild(weaknessHeader);

  const resistanceHeader = document.createElement("div");
  resistanceHeader.textContent = "Resistance";
  headerRow.appendChild(resistanceHeader);

  const immunityHeader = document.createElement("div");
  immunityHeader.textContent = "Immunity";
  headerRow.appendChild(immunityHeader);

  mainWrapper.appendChild(headerRow);
  return mainWrapper;
}

function createEnemyDiv() {
	const enemies = document.createElement("div");
	enemies.className = 'enemy-team'
  enemies.id = "enemies";
  return enemies;
}

function createAlliesDiv() {
	const allies = document.createElement("div");
	allies.className = 'allies-team'
  allies.id = "allies";
  return allies;
}

// Enables drag-and-drop functionality on an element
function enableDragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const dragStartElement = elmnt;

  // Attach the mousedown event handler
  dragStartElement.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.type === 'submit' || e.target.type === 'range') return
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Handles dragging movement
  function dragElement(e) {
    e = e || window.event;
    if (e.target.type === 'submit' || e.target.type === 'range') return
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  // Stops dragging on mouse release
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const enemiesDiv = createEnemyDiv()
const alliesDiv = createAlliesDiv()

enableDragElement(enemiesDiv);
enableDragElement(alliesDiv);

document.body.appendChild(enemiesDiv);
document.body.appendChild(alliesDiv);

let Types
(function (Types) {
	Types[Types["normal"] = 1] = 1;
	Types[Types["fighting"] = 2] = 2;
	Types[Types["flying"] = 3] = 3;
	Types[Types["poison"] = 4] = 4;
	Types[Types["ground"] = 5] = 5;
	Types[Types["rock"] = 6] = 6;
	Types[Types["bug"] = 7] = 7;
	Types[Types["ghost"] = 8] = 8;
	Types[Types["steel"] = 9] = 9;
	Types[Types["fire"] = 10] = 10;
	Types[Types["water"] = 11] = 11;
	Types[Types["grass"] = 12] = 12;
	Types[Types["electric"] = 13] = 13;
	Types[Types["psychic"] = 14] = 14;
	Types[Types["ice"] = 15] = 15;
	Types[Types["dragon"] = 16] = 16;
	Types[Types["dark"] = 17] = 17;
	Types[Types["fairy"] = 18] = 18;
})(Types || (Types = {}));

let Stat;
(function (Stat) {
    Stat[Stat["HP"] = 0] = "HP";
    Stat[Stat["ATK"] = 1] = "ATK";
    Stat[Stat["DEF"] = 2] = "DEF";
    Stat[Stat["SPATK"] = 3] = "SPATK";
    Stat[Stat["SPDEF"] = 4] = "SPDEF";
    Stat[Stat["SPD"] = 5] = "SPD";
})(Stat || (Stat = {}));
;

function createTooltipDiv(tip) {
	const tooltip = document.createElement('div')
	tooltip.classList.add('tooltiptext')
	tooltip.textContent = tip
	return tooltip
}

// Current values: weaknesses, resistances, immunities
function createTypeEffectivenessWrapper(effectiveness, types) {
	const typeEffectivenessWrapper = document.createElement('div')
	typeEffectivenessWrapper.classList.add(`pokemon-${effectiveness}`);
	typeEffectivenessWrapper.classList.add('tooltip');
	let counter = 0;
	let block = document.createElement('div');
	typeEffectivenessWrapper.appendChild(block)
	types.forEach(type => {
		if (counter % 3 === 0) {
			block = document.createElement('div');
			typeEffectivenessWrapper.appendChild(block)
		}
    const typeIcon = document.createElement('div');
    typeIcon.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${Types[type]}.png')`;
    typeIcon.className = 'type-icon';
    block.appendChild(typeIcon)
    counter += 1;
  });
  return typeEffectivenessWrapper
}

let currentEnemyPage = 0;
let currentAllyPage = 0;
let enemiesPokemon = [];
let alliesPokemon = [];
let weather = {};

function createArrowButtonsDiv(divId, isMin) {
	const buttonsDiv = document.createElement('div')
	buttonsDiv.classList.add('arrow-button-wrapper')
	const arrowUpButton = document.createElement('button')
	const arrowDownButton = document.createElement('button')
	arrowUpButton.classList.add('text-base')
	arrowDownButton.classList.add('text-base')
	if(isMin) {
		arrowUpButton.classList.add('arrow-button-sm')
		arrowDownButton.classList.add('arrow-button-sm')
	}
	else{
		arrowUpButton.classList.add('arrow-button')
		arrowDownButton.classList.add('arrow-button')
	}
	arrowUpButton.textContent = "↑"
	arrowDownButton.textContent = "↓"
	arrowUpButton.id = `${divId}-up`
	arrowDownButton.id = `${divId}-down`
	arrowUpButton.addEventListener('click', changePage)
	arrowDownButton.addEventListener('click', changePage)
	buttonsDiv.appendChild(arrowUpButton)
	buttonsDiv.appendChild(arrowDownButton)
	return buttonsDiv
}

function createOpacitySliderDiv(divId) {
	const sliderDiv = document.createElement('div')
	sliderDiv.classList.add('slider-wrapper')

	const opacityTextDiv = document.createElement('div')
	opacityTextDiv.classList.add('text-base')
	opacityTextDiv.textContent = "Opacity:"
	const slider = document.createElement('input')
	slider.type = "range"
	slider.min = "10"
	slider.max = "100"
	slider.value = "100"
	slider.id = `${divId}-slider`
	sliderDiv.appendChild(opacityTextDiv)
	sliderDiv.appendChild(slider)
	sliderDiv.addEventListener('input', changeOpacity)
	return sliderDiv
}

function changeOpacity(e) {
	const divId = e.target.id.split("-")[0]
	const div = document.getElementById(divId)
	div.style.opacity = `${e.target.value / 100}`
}

async function changePage(click) {
	const buttonId = click.target.id
	const divId = buttonId.split("-")[0]
	const direction = buttonId.split("-")[1]
	if (direction === 'up') {
		if (divId === 'enemies') {
			if (currentEnemyPage > 0) {
				currentEnemyPage -= 1
			} else {
				currentEnemyPage = enemiesPokemon.length - 1
			}
		} else if (divId === 'allies') {
			if (currentAllyPage > 0) {
				currentAllyPage -= 1
			} else {
				currentAllyPage = alliesPokemon.length - 1
			}
		}		
	} else if (direction === 'down') {
		if (divId === 'enemies') {
			if ((currentEnemyPage + 1) < enemiesPokemon.length) {
				currentEnemyPage += 1
			} else {
				currentEnemyPage = 0
			}
		} else if (divId === 'allies') {
			if ((currentAllyPage + 1) < alliesPokemon.length) {
				currentAllyPage += 1
			} else {
				currentAllyPage = 0
			}
		}
	}
	await createCardsDiv(divId).then(()=>{
		scaleElements();
	})
}

async function createPokemonCardDiv(divId, pokemon) {
	const data = await browserApi.storage.sync.get('showMinified');
	const isMinified = (data.hasOwnProperty('showMinified') ? data.showMinified : false);
	console.log(isMinified);
	let returnObj;
	if (isMinified) {
		returnObj = createPokemonCardDivMinifed(divId, pokemon);
	} else {
		returnObj = createCardsMain(divId, pokemon);
	}
	return returnObj;
}

async function readLocalStorage(key) {
	key = "sessionData";
	// Send a message to the injected script via window.postMessage
	window.postMessage({ type: "INJ_READ_LOCAL_STORAGE", data: key }, "*");

	// Listen for the response from the injected script
	window.addEventListener("message", (event) => {
		if (event.data.type === "INJ_READ_LOCAL_STORAGE_RESPONSE") {
			console.log("Received response from injected script:");
			console.log(event.data.response);
		}
	});
}

// function test(){
// 	browserApi.storage.local.get("sessionData", function(result) {
// 		console.log(result);
// 		if (result.data) {
// 			var gameData = result.data;
// 			console.log(gameData)
// 			// Process the game data and create the overlay
// 			//createOverlay(gameData);
// 		} else {
// 			console.log("Game data not found in Local Storage.");
// 		}
// 	});
//
// 	browserApi.storage.local.get("updateSaveData", function(result) {
// 		console.log(result);
// 		if (result.data) {
// 			var gameData = result.data;
// 			console.log(gameData)
// 			// Process the game data and create the overlay
// 			//createOverlay(gameData);
// 		} else {
// 			console.log("Dex data not found in Local Storage.");
// 		}
// 	});
// }





function createPokemonCardDivMinifed(divId, pokemon) {

	let savedData = JSON.parse(localStorage.getItem('updateSaveData'));

	//console.log(savedData);
	let dexData = savedData["dexData"];
	let dexIvs = dexData[pokemon.baseId]["ivs"];
	//console.log(pokemon.ivs);
	//console.log(dexIvs);

	const card = document.createElement('div');
	card.classList.add('pokemon-card');

	const opacitySliderDiv = createOpacitySliderDiv(divId)

	const infoRow = document.createElement('div');
	infoRow.style.display = 'flex';

	const iconWrapper = document.createElement('div');
	iconWrapper.className = 'pokemon-icon';
	const icon = document.createElement('img');
	console.log(pokemon);
	icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
	iconWrapper.appendChild(icon);
	infoRow.appendChild(iconWrapper);

	const weaknessesWrapper = createTypeEffectivenessWrapper('weaknesses', pokemon.typeEffectiveness.weaknesses)
	weaknessesWrapper.appendChild(createTooltipDiv('Weak to'))

	const resistancesWrapper = createTypeEffectivenessWrapper('resistances', pokemon.typeEffectiveness.resistances)
	resistancesWrapper.appendChild(createTooltipDiv('Resists'))

	const immunitiesWrapper = createTypeEffectivenessWrapper('immunities', pokemon.typeEffectiveness.immunities)
	immunitiesWrapper.appendChild(createTooltipDiv('Immune to'))

	infoRow.appendChild(weaknessesWrapper)
	infoRow.appendChild(resistancesWrapper)
	infoRow.appendChild(immunitiesWrapper)

	const pokemonName = document.createElement('div');
	pokemonName.classList.add('text-base');
	pokemonName.textContent = `Name: ${pokemon.name}`;

	const extraInfoRow = document.createElement('div');
	extraInfoRow.classList.add('text-base')
	extraInfoRow.textContent = `Ability: ${pokemon.ability} - Nature: ${pokemon.nature}`;

	const ivsRow = document.createElement('div');
	ivsRow.classList.add('text-base');
	for (let i in pokemon.ivs) {
		let curIV = pokemon.ivs[i];
		let statDiv = document.createElement('div');
		statDiv.className = 'stat-p';
		statDiv.innerHTML = `${Stat[i]}:&nbsp;<div class="stat-c" style="color: ${getColor(curIV)}">${curIV}${ivComparison(curIV, dexIvs[i])}</div>&nbsp;&nbsp;`;
		ivsRow.appendChild(statDiv);
	}

	let weatherRow = undefined
	if (weather.type && weather.turnsLeft) {
		weatherRow = document.createElement('div');
		weatherRow.classList.add('text-base');
		weatherRow.textContent = `Weather: ${weather.type}, Turns Left: ${weather.turnsLeft}`
	}

	card.appendChild(pokemonName);
	card.appendChild(extraInfoRow)
	card.appendChild(ivsRow)
	if (weatherRow) {
		card.appendChild(weatherRow)
	}
	return card
}

function createCardsMain(divId, pokemon){
	console.log(pokemon);
	const card = document.createElement('div');
	card.classList.add('pokemon-card');

	const opacitySliderDiv = createOpacitySliderDiv(divId)

	const infoRow = document.createElement('div');
	infoRow.style.display = 'flex';

	const iconWrapper = document.createElement('div');
	iconWrapper.className = 'pokemon-icon';
	const icon = document.createElement('img');
	icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
	iconWrapper.appendChild(icon);
	infoRow.appendChild(iconWrapper);

	const weaknessesWrapper = createTypeEffectivenessWrapper('weaknesses', pokemon.typeEffectiveness.weaknesses)
	weaknessesWrapper.appendChild(createTooltipDiv('Weak to'))

	const resistancesWrapper = createTypeEffectivenessWrapper('resistances', pokemon.typeEffectiveness.resistances)
	resistancesWrapper.appendChild(createTooltipDiv('Resists'))

	const immunitiesWrapper = createTypeEffectivenessWrapper('immunities', pokemon.typeEffectiveness.immunities)
	immunitiesWrapper.appendChild(createTooltipDiv('Immune to'))

	infoRow.appendChild(weaknessesWrapper)
	infoRow.appendChild(resistancesWrapper)
	infoRow.appendChild(immunitiesWrapper)

	const extraInfoRow = document.createElement('div');
	extraInfoRow.classList.add('text-base')
	extraInfoRow.textContent = `Ability: ${pokemon.ability} - Nature: ${pokemon.nature}`;

	const ivsRow = document.createElement('div');
	ivsRow.classList.add('text-base');
	ivsRow.textContent = `HP: ${pokemon.ivs[Stat["HP"]]}, ATK: ${pokemon.ivs[Stat["ATK"]]}, DEF: ${pokemon.ivs[Stat["DEF"]]}, SPE: ${pokemon.ivs[Stat["SPD"]]}, SPD: ${pokemon.ivs[Stat["SPDEF"]]}, SPA: ${pokemon.ivs[Stat["SPATK"]]}`;

	let weatherRow = undefined
	if (weather.type && weather.turnsLeft) {
		weatherRow = document.createElement('div');
		weatherRow.classList.add('text-base');
		weatherRow.textContent = `Weather: ${weather.type}, Turns Left: ${weather.turnsLeft}`
	}

	card.appendChild(opacitySliderDiv)
	card.appendChild(infoRow)
	card.appendChild(extraInfoRow)
	card.appendChild(ivsRow)
	if (weatherRow) {
		card.appendChild(weatherRow)
	}
	return card
}

function listenForDataUiModeChange() {
	const touchControlsElement = document.getElementById('touchControls');

	if (touchControlsElement) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(async (mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'data-ui-mode') {
					const newValue = touchControlsElement.getAttribute('data-ui-mode');
					console.log('New value:', newValue);
					if(newValue === 'CONFIRM'){
						let sessionData = Utils.LocalStorage.getSessionData();
						console.log(sessionData);
						await Utils.PokeMapper.getPokemonArray(sessionData.enemyParty, sessionData.arena).then(async (ePokemonData) =>{
							enemiesPokemon = ePokemonData.pokemon;
							weather = ePokemonData.hasOwnProperty('weather') ? ePokemonData.weather : null;
							await createCardsDiv("enemies").then(()=>{
								scaleElements();
							});
						});
						//enemiesPokemon = enemyPokemonData.pokemon;
						// let alliesPokemonData = await Utils.PokeMapper.getPokemonArray(sessionData.party, sessionData.arena);
						// alliesPokemon = alliesPokemonData.pokemon;
						//weather = message.weather;
						await createCardsDiv("enemies").then(()=>{
							scaleElements();
						});
						// await createCardsDiv("allies").then(()=>{
						// 	scaleElements();
						// });
					}
					//CONFIRM -- this is when game starts
					//MODIFIER_SELECT -- this is in store
					//PARTY -- when in party
					//SUMMARY -- in pokemon inspect
					//CONFIRM -- battle again
					//COMMAND -- waiting for input
				}
			});
		});

		observer.observe(touchControlsElement, { attributes: true });
	} else {
		console.error('Element with ID "touchControls" not found.');
	}
}


// let divId = message.type === 'UPDATE_ENEMIES_DIV' ? 'enemies' : 'allies'
// if (message.type === 'UPDATE_ENEMIES_DIV') {
// 	enemiesPokemon = message.pokemon
// }
// else {
// 	alliesPokemon = message.pokemon
// }
// weather = message.weather;
// if (weather.turnsLeft === 0) weather.turnsLeft = 'N/A'
// await createCardsDiv(divId).then(()=>{
// 	scaleElements();
// })



listenForDataUiModeChange();

function ivComparison(pokeIv, dexIv) {
	let iconA = "";
	let colorS = "#00FF00";
	if(pokeIv > dexIv){
		iconA = "↑";
		colorS = "#00FF00";
	}
	else if (pokeIv < dexIv) {
		iconA = "↓";
		colorS = "#FF0000";
	}
	else{
		iconA = "-";
		colorS = "#FFFF00";
	}
	let returnHTML = `<div class="stat-icon" style="color: ${colorS} !important; opacity: 0.3">${iconA}</div>`
	return returnHTML;
}

function getColor(num) {
	if (num < 0 || num > 31) {
		throw new Error('Number must be between 0 and 31');
	}

	// Calculate the red component: It decreases as 'num' increases
	let red = Math.floor(255 * (1 - num / 31));
	// Calculate the green component: It increases as 'num' increases
	let green = Math.floor(255 * (num / 31));
	// Blue component is always 0 for a red to green gradient
	let blue = 0;

	// Convert each color component to a hex string and pad with 0 if necessary
	let redHex = red.toString(16).padStart(2, '0');
	let greenHex = green.toString(16).padStart(2, '0');
	let blueHex = blue.toString(16).padStart(2, '0');

	// Combine the hex values and return the result
	return `#${redHex}${greenHex}${blueHex}`;
}

function createWrapperDiv(divId) {
	const oldDiv = document.getElementById(divId)
	let oldTop = ''
	let oldLeft = ''
	let oldOpacity = ''
	if (oldDiv) {
		console.log("Removing DIV with id", divId)
		oldTop = oldDiv.style.top;
		oldLeft = oldDiv.style.left;
		oldOpacity = oldDiv.style.opacity;
		oldDiv.remove();
	}
	const newDiv = divId === 'enemies' ? createEnemyDiv() : createAlliesDiv()
	enableDragElement(newDiv)
	newDiv.style.top = oldTop
	newDiv.style.left = oldLeft
	newDiv.style.opacity = oldOpacity
	return newDiv;
}

async function createCardsDiv(divId) {
	let newDiv = createWrapperDiv(divId)

	//fix how this works
	let buttonsDiv = createArrowButtonsDiv(divId, true)
  newDiv.appendChild(buttonsDiv)
  let pokemon = {}
	//let pokemon = pokemonData.pokemon;
  if (divId === 'enemies') {
	  console.log("Current E Page: ", currentEnemyPage);
  	if (currentEnemyPage >= enemiesPokemon.length) currentEnemyPage = enemiesPokemon.length - 1
  	pokemon = enemiesPokemon[currentEnemyPage]
	  console.log("Current E Pokemon");
	  console.log(pokemon);
  }
  else {
  	if (currentAllyPage >= alliesPokemon.length) currentAllyPage = alliesPokemon.length - 1
  	pokemon = alliesPokemon[currentAllyPage]
  }
  const pokemonCards = document.createElement("div");
  pokemonCards.className = "pokemon-cards"

	const card = await createPokemonCardDiv(divId, pokemon)
	pokemonCards.appendChild(card);
	newDiv.appendChild(pokemonCards)
	document.body.appendChild(newDiv)
	console.log("Appended", newDiv)
	return newDiv
}

async function scaleElements() {
	let testPokemonBase = Utils.PokeMapper.findBasePokemon("CHARIZARD");
	console.log(testPokemonBase);

	console.log(Utils.LocalStorage.getSessionData())
	//const localStorageData = localStorage.getItem("sessionData");
	//console.log(localStorageData);
	//readLocalStorage("sessionData");
	const data = await browserApi.storage.sync.get('scaleFactor');
	//console.log(data);
	const scaleFactorMulti = data.scaleFactor || 1;
	const baseWidth = 1920; // Assume a base width of 1920 pixels
	const baseHeight = 1080; // Assume a base height of 1080 pixels
	const currentWidth = window.innerWidth;
	const currentHeight = window.innerHeight;
	const scaleFactor_width = currentWidth / baseWidth;
	const scaleFactor_height = currentHeight / baseHeight;
	let scaleFactor = scaleFactor_width < scaleFactor_height ? scaleFactor_width : scaleFactor_height;

	const enemiesDiv = document.getElementById('enemies');
	const alliesDiv = document.getElementById('allies');

	enemiesDiv.style.fontSize = `${16 * scaleFactor * scaleFactorMulti}px`;
	alliesDiv.style.fontSize = `${16 * scaleFactor * scaleFactorMulti}px`;
}

// Call scaleElements initially and on window resize
window.addEventListener('resize', scaleElements);

browserApi.runtime.onMessage.addListener(async (incomingMessage, sender, sendResponse) => {
	let message = incomingMessage.data;
	console.log("Got message:", message, "from", sender)
	if (message.type === 'UPDATE_ENEMIES_DIV' || message.type === 'UPDATE_ALLIES_DIV') {
		let divId = message.type === 'UPDATE_ENEMIES_DIV' ? 'enemies' : 'allies'
		if (message.type === 'UPDATE_ENEMIES_DIV') {
			enemiesPokemon = message.pokemon
		}
		else {
			alliesPokemon = message.pokemon
		}
		weather = message.weather;
		if (weather.turnsLeft === 0) weather.turnsLeft = 'N/A'
		await createCardsDiv(divId).then(()=>{
			scaleElements();
		})
    sendResponse({ success: true });
	}
	if(message.type === "HTTP_SESSION_DATA"){
		console.log("GOT THE MESSAGE WE NEEDED");
		Utils.LocalStorage.setSessionData(message.data);
		sendResponse({ success: true });
	}
});