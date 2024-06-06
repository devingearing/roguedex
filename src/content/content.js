/* Ideally only bundle/import what is used. 
 * lit-html: https://lit.dev/
 * Template rendering.
 * templates and helper functions are prefixed with `window.lit.`
*/
const { html, render, ref, unsafeHTML, unsafeSVG, templateContent, asyncAppend, asyncReplace, until, 
	live, guard, cache, keyed, ifDefined, range, repeat, join, map, choose, when, classMap, styleMap } = window.LitHtml;

const initStates = { panelsInitialized : false };
//const imageCache = {}
window.activePokemonParties = { "enemies" : {}, "allies" : {} };

scriptInjector();
addRunningStatus();

function scriptInjector() {
    const scriptElem = document.createElement("script");
    scriptElem.src = chrome.runtime.getURL("/content/utils.js");
    scriptElem.type = "module";
    document.head.append(scriptElem);
    scriptElem.addEventListener("load", initUtilities);
}

function initUtilities() {
    // Initialize and set up UtilsClass
    window.Utils = new UtilsClass();
    window.Utils.init();

    // Listen for the 'isReadyChange' event to check if all scripts are loaded
    window.Utils.addEventListener('isReadyChange', () => {
        if (window.Utils.isReady) {
            console.log("All Scripts Loaded!");
            extensionSettingsListener();
        } else {
            console.log("Error Loading Scripts :(");
        }
    });
}

const wrapperDivPositions = {
    'enemies': {
        'top': '0',
        'left': '0',
        'opacity': '100'
    },
    'allies': {
        'top': '0',
        'left': '0',
        'opacity': '100'
    }
}

function addRunningStatus() {
    const runningStatusDiv = document.createElement('div')
    runningStatusDiv.textContent = 'RogueDex is running!'
    runningStatusDiv.classList.add('text-base')
    runningStatusDiv.classList.add('running-status')
    document.body.insertBefore(runningStatusDiv, document.body.firstChild);
}

function createEnemyDiv(showSidebar = false) {
    const enemies = document.createElement("div");
    enemies.className = 'enemy-team'
    if (showSidebar) {
        enemies.className = 'hidden'
    }
    enemies.id = "enemies";
    return enemies;
}

function createAlliesDiv(showSidebar = false) {
    const allies = document.createElement("div");
    allies.className = 'allies-team'
    if (showSidebar) {
        allies.className = 'hidden'
    }
    allies.id = "allies";
    return allies;
}

// Enables drag-and-drop functionality on an element
function enableDragElement(elmnt) {
    let po1, po2, pos3, pos4;
    pos1 = pos2 = pos3 = pos4 = 0;
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

document.body.append(enemiesDiv);
document.body.append(alliesDiv);

let Types
(function (Types) {
    Types[Types.normal = 1] = 1;
    Types[Types.fighting = 2] = 2;
    Types[Types.flying = 3] = 3;
    Types[Types.poison = 4] = 4;
    Types[Types.ground = 5] = 5;
    Types[Types.rock = 6] = 6;
    Types[Types.bug = 7] = 7;
    Types[Types.ghost = 8] = 8;
    Types[Types.steel = 9] = 9;
    Types[Types.fire = 10] = 10;
    Types[Types.water = 11] = 11;
    Types[Types.grass = 12] = 12;
    Types[Types.electric = 13] = 13;
    Types[Types.psychic = 14] = 14;
    Types[Types.ice = 15] = 15;
    Types[Types.dragon = 16] = 16;
    Types[Types.dark = 17] = 17;
    Types[Types.fairy = 18] = 18;
})(Types || (Types = {}));

let Stat;
(function (Stat) {
    Stat[Stat.HP = 0] = "HP";
    Stat[Stat.ATK = 1] = "ATK";
    Stat[Stat.DEF = 2] = "DEF";
    Stat[Stat.SPATK = 3] = "SPATK";
    Stat[Stat.SPDEF = 4] = "SPDEF";
    Stat[Stat.SPD = 5] = "SPD";
})(Stat || (Stat = {}));


function createTooltipDiv(tip) {
    const tooltipHtml = `
        <div class="text-base tooltiptext">${tip}</div>
    `
    return tooltipHtml

    /*
    const tooltip = document.createElement('div')
    tooltip.classList.add('text-base')
    tooltip.classList.add('tooltiptext')
    tooltip.textContent = tip
    return tooltip
    */
}

// Current values: weaknesses, resistances, immunities
function createTypeEffectivenessWrapper(typeEffectivenesses) {
    const typesHTML = `
        ${Object.keys(typeEffectivenesses).map((effectiveness) => {
        const effectivenessObj = typeEffectivenesses[effectiveness];
        // console.log(typeEffectivenesses);
        if (!effectivenessObj || (!effectivenessObj.normal?.length && !effectivenessObj.double?.length)) return '';

        const tooltipMap = {
            weaknesses: "Weak to",
            resistances: "Resists",
            immunities: "Immune to"
        };

        const allTypes = [
            ...(effectivenessObj.double || []),
            ...(effectivenessObj.normal || [])
        ];

        return `
            <div class="pokemon-${effectiveness} tooltip">
                ${allTypes.map((type, counter) => {
                    const cssClass = getTypeEffectivenessCssClass(type, typeEffectivenesses);
                    if (effectiveness === "cssClasses") {
                        return ''; // Skip if effectiveness is not equal to cssClass
                    }
                    return `
                            ${/* The current html structure requires to wrap every third element in a div, the implementation here gets a bit ugly. */''}
                            ${(counter % 3 === 0) ? `<div>` : ''}

                            <div class="type-icon ${cssClass}" 
                                style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${Types[type]}.png')"></div>
                            
                            ${/* Closing div, after every third element or when the arrays max length is reached. */''}
                            ${((counter + 1) % 3 === 0) || ((counter + 1) === allTypes.length) ? `</div>` : ''}
                        `;
                }).join('')}
                ${createTooltipDiv(tooltipMap[effectiveness] || "")}
            </div>
        `;
    }).join('')}`;

    return typesHTML;
}


function getTypeEffectivenessCssClass(type, typeEffectivenessDetailed) {
    try {
        return typeEffectivenessDetailed.cssClasses[type]
    } catch (error) {
        return ''
    }
}

const pages = {
    "enemies": 0,
    "allies": 0,
}
const partySize = {
    "enemies": 0,
    "allies": 0
}
let weather = {};

function createArrowButtonsDiv(divId, upString, downString, showMinified) {
    let sizes = "2.5em !important"
    if (showMinified) {
        sizes = "1em !important"
    }
    const result = {};
    result.idUp = `${divId}-up`
    result.idDown = `${divId}-down`
    result.html = `
		<div class="arrow-button-wrapper" style="font-size: ${sizes}">
			<button class="text-base arrow-button" id="${result.idUp}">${upString}</button>
			<button class="text-base arrow-button" id="${result.idDown}">${downString}</button>
		</div>
	`

    return result
}

function createOpacitySliderDiv(divId, initialValue = "100", min = "10", max = "100") {
    const result = {};
    result.id = `${divId}-slider`
    result.html = `
  		<div class="slider-wrapper">
  			<div class="text-base">Opacity:</div>
  			<input class="op-slider" type="range" min="${min}" max="${max}" value="${initialValue}" id="${result.id}">
  		</div>
  	`
    return result
}

function changeOpacity(e) {
    const divId = e.target.id.split("-")[0]
    const div = document.getElementById(divId)
    wrapperDivPositions[divId].opacity = e.target.value
    div.style.opacity = `${e.target.value / 100}`
}

async function changePage(click) {
    const buttonId = click.target.id
    const divId = buttonId.split("-")[0]
    const direction = buttonId.split("-")[1]
    if (direction === 'up') {
        if (pages[divId] > 0) {
            pages[divId] -= 1
        } else {
            pages[divId] = partySize[divId]
        }
    } else if (direction === 'down') {
        if (pages[divId] < partySize[divId]) {
            pages[divId] += 1
        } else {
            pages[divId] = partySize[divId]
        }
    }
    const sessionData = window.Utils.LocalStorage.getSessionData();
    await initCreation(sessionData);
}

async function createPokemonCardDiv(cardId, pokemon) {
    const opacityRangeMin = 10;
    const opacityRangeMax = 100;
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    const opacitySlider = createOpacitySliderDiv(cardId, wrapperDivPositions[cardId].opacity, opacityRangeMin, opacityRangeMax);
    const typeEffectivenessHTML = createTypeEffectivenessWrapper(pokemon.typeEffectiveness);
    const cardHTML = `
  	<div class="pokemon-cards">
	    <div class="pokemon-card">
	      ${opacitySlider.html}
	      <div style="display: flex;">
	        <canvas id="pokemon-icon_${cardId}" class="pokemon-icon">
	        </canvas>
	        ${typeEffectivenessHTML}
	        
	      </div>

	      <div class="text-base">
	      	<div class="tooltip ${pokemon.ability.isHidden ? 'hidden-ability' : ''}">
	        	Ability: ${pokemon.ability.name} 
	        	${createTooltipDiv(pokemon.ability.description)}
	        </div>
	        &nbsp-&nbsp 
	        <div class = "tooltip">
	        	Nature: ${pokemon.nature}
	        	${createTooltipDiv("")}
	        </div>
	      </div>
	      <div class="text-base">
            HP: ${pokemon.ivs[Stat.HP]}, ATK: ${pokemon.ivs[Stat.ATK]}, DEF: ${pokemon.ivs[Stat.DEF]}
          </div>
          <div class="text-base">
            SPE: ${pokemon.ivs[Stat.SPD]}, SPD: ${pokemon.ivs[Stat.SPDEF]}, SPA: ${pokemon.ivs[Stat.SPATK]}
          </div>
	        
	      ${(weather.type && weather.turnsLeft) ?
        `<div class="text-base">Weather: ${weather.type}, Turns Left: ${weather.turnsLeft}</div>`
        : ''}
	    </div>
    </div>
  `

    const cardObj = {}
    cardObj.html = cardHTML;
    cardObj.slider = opacitySlider.id;

    return cardObj
}

function generateMovesetHTML(pokemon) {
    let html = '';
    for (const i in pokemon.moveset) {
        const move = pokemon.moveset[i];
        html += `
            <div class="pokemon-move">
                <span class="pokemon-move-name move-${(move.type).toLowerCase()}">${move.name}</span>
            </div>         
        `
    }
    return html;
}

function generateIVsHTML__(pokemon, dexIvs, simpleDisplay = false, addStyleClasses = false) {
    let fullHTML = ``;
    for (const i in pokemon.ivs) {
        const curIV = pokemon.ivs[i];

        if (simpleDisplay === true && addStyleClasses === false) {
            // skip the colors and indicators for whether the ivs would be an upgrade for your own starters
            fullHTML += `<div class="stat-p">${Stat[i]}:&nbsp;<div class="stat-c">${curIV}</div>&nbsp;&nbsp;</div>`;
        } else if (simpleDisplay === true && addStyleClasses === true) {
            // skip the color gradients and indicators, but add css-classes to style the descriptors and values differently
            fullHTML += `<div class="stat-p stat-p-colors">${Stat[i]}:&nbsp;<div class="stat-c stat-c-colors">${curIV}</div>&nbsp;&nbsp;</div>`;
        } else if (simpleDisplay === false && addStyleClasses === true) {
            // don't skip the color gradients and indicators, but add css-classes to style the descriptors and values differently anyways
            fullHTML += `<div class="stat-p stat-p-colors">${Stat[i]}:&nbsp;<div class="stat-c stat-c-colors">${curIV}</div>&nbsp;&nbsp;</div>`;
        } else {
            // add (hardcode) color gradients and icons
            fullHTML += `<div class="stat-p">${Stat[i]}:&nbsp;<div class="stat-c" style="color: ${getColor(curIV)}">${curIV}${ivComparison(curIV, dexIvs[i])}</div>&nbsp;&nbsp;</div>`;
        }
    }
    return fullHTML;
}

function ivComparison(pokeIv, dexIv) {
    let iconA = "";
    let colorS = "#00FF00";
    if (pokeIv > dexIv) {
        iconA = "↑";
        colorS = "#00FF00";
    } else if (pokeIv < dexIv) {
        iconA = "↓";
        colorS = "#FF0000";
    } else {
        iconA = "-";
        colorS = "#FFFF00";
    }
    const returnHTML = `<div class="stat-icon" style="color: ${colorS} !important; opacity: 0.3">${iconA}</div>`
    return returnHTML;
}

async function createPokemonCardDivMinified(cardId, pokemon) {
    const savedData = window.Utils.LocalStorage.getPlayerData();
    const dexData = savedData.dexData;
    const dexIvs = dexData[pokemon.baseId].ivs;
    const opacityRangeMin = 10;
    const opacityRangeMax = 100;
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    const opacitySlider = createOpacitySliderDiv(cardId, wrapperDivPositions[cardId].opacity, opacityRangeMin, opacityRangeMax);
    const typeEffectivenessHTML = createTypeEffectivenessWrapper(pokemon.typeEffectiveness);
    const ivsGeneratedHTML = generateIVsHTML(pokemon, dexIvs);

    const cardHTML = `
      	<div class="pokemon-cards">
    	    <div class="pokemon-card">
    	        <div class="text-base centered-flex">${pokemon.name}</div>
    	      <div class="text-base centered-flex">
    	      <div class="image-overlay">
    	      <canvas id="pokemon-icon_${cardId}" class="pokemon-icon"></canvas>
                </div>
    	      	<div class="tooltip ${pokemon.ability.isHidden ? 'hidden-ability' : ''}">
    	        	Ability: ${pokemon.ability.name} 
    	        	${createTooltipDiv(pokemon.ability.description)}
    	        </div>
    	        &nbsp-&nbsp 
    	        <div class = "tooltip">
    	        	Nature: ${pokemon.nature}
    	        	${createTooltipDiv("")}
    	        </div>
    	      </div>
    	      <div class="text-base stat-cont">
    	        ${ivsGeneratedHTML}
    	      </div>
    	        
    	      ${(weather.type && weather.turnsLeft) ?
            `<div class="text-base">Weather: ${weather.type}, Turns Left: ${weather.turnsLeft}</div>`
            : ''}
    	    </div>
        </div>
    `

    const cardObj = {}
    cardObj.html = cardHTML;
    return cardObj
}

function createWrapperDiv(divId, showSidebar) {
    const oldDiv = document.getElementById(divId)
    if (oldDiv) {
        wrapperDivPositions[divId].top = oldDiv.style.top;
        wrapperDivPositions[divId].left = oldDiv.style.left;
        oldDiv.remove();
    }
    const newDiv = divId === 'enemies' ? createEnemyDiv(showSidebar) : createAlliesDiv(showSidebar)
    enableDragElement(newDiv)
    newDiv.style.top = wrapperDivPositions[divId].top
    newDiv.style.left = wrapperDivPositions[divId].left
    newDiv.style.opacity = "" + (Number(wrapperDivPositions[divId].opacity) / 100)
    return newDiv;
}

function getColor(num) {
    if (num < 0 || num > 31) {
        throw new Error('Number must be between 0 and 31');
    }

    // Calculate the red component: It decreases as 'num' increases
    const red = Math.floor(255 * (1 - num / 31));
    // Calculate the green component: It increases as 'num' increases
    const green = Math.floor(255 * (num / 31));
    // Blue component is always 0 for a red to green gradient
    const blue = 0;

    // Convert each color component to a hex string and pad with 0 if necessary
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Combine the hex values and return the result
    return `#${redHex}${greenHex}${blueHex}`;
}


async function chooseCardType(divId, pokemon, minified) {
    if (minified) {
        return await createPokemonCardDivMinified(divId, pokemon);
    } else {
        return await createPokemonCardDiv(divId, pokemon);
    }
}

async function createCardsDiv(divId, pokemonData, pokemonIndex) {
    const pokemon = pokemonData[pokemonIndex]
    const extensionSettings = await window.Utils.LocalStorage.getExtensionSettings();
    const newDiv = createWrapperDiv(divId, extensionSettings.showSidebar);

    return await chooseCardType(divId, pokemon, extensionSettings.showMinified).then(async (cardObj) => {
        const buttonsObj = createArrowButtonsDiv(divId, "↑", "↓", extensionSettings.showMinified);
        const cardsHTML = `
    	   ${buttonsObj.html}
    	   ${cardObj.html}
        `;
        newDiv.insertAdjacentHTML("afterbegin", cardsHTML)
        document.body.append(newDiv);
        window.Utils.PokemonIconDrawer.getPokemonIcon(pokemon, divId);

        if (cardObj.slider) {
            document.getElementById(cardObj.slider).addEventListener('input', changeOpacity)
        }
        document.getElementById(buttonsObj.idUp).addEventListener('click', (event) => {
            changePage(event);
        })
        document.getElementById(buttonsObj.idDown).addEventListener('click', (event) => {
            changePage(event);
        })
        return newDiv
    })
}

/**
 * Creates the sidebar and bottom-panel elements.
 * Binds click controls to switch between showing IVs and movesets (optional: keyboard and gamepad). 
 * 
 * @param {Object} sessionData
 */
function createPanels(sessionData) {
    const sidebarTemplate = window.lit.createSidebarTemplate(sessionData);
    const bottomPanelTemplate = window.lit.createBottomPanelTemplate();

    render(sidebarTemplate, document.body, { renderBefore: document.body.firstChild });
    render(bottomPanelTemplate, document.body, { renderBefore: null });

    onElementAvailable("#sidebar-switch-iv-moves", () => {
        const uiControllerSwitchIVsMovesetDisplay = new UIController(sidebarSwitchBetweenIVsAndMoveset, '#sidebar-switch-iv-moves', { bindMouse: true, bindKeyboard: false, bindGamepad: false });
        // uiControllerSwitchIVsMovesetDisplay.setBindings(null, [6, 5]) // xbox lt + rb
    });    
}

const generateIVsHTML = (pokemon, dexIvs, simpleDisplay = false, addStyleClasses = false) => html`
    ${Object.keys(pokemon.ivs).map(i => {
        const curIV = pokemon.ivs[i];
        const dexIv = dexIvs[i];
        const isBetter = curIV > dexIv;
        const isWorse = curIV < dexIv;
        const icon = isBetter ? '↑' : (isWorse ? '↓' : '-');
        const color = isBetter ? '#00FF00' : (isWorse ? '#FF0000' : '#FFFF00');
        const colorStyle = !simpleDisplay && !addStyleClasses ? { color: color } : {};
        const ivValue = simpleDisplay ? curIV : html`${curIV}${icon}`;
        const statClass = addStyleClasses ? `stat-p-colors` : '';
        const valueClass = addStyleClasses ? `stat-c-colors` : '';

        return html`
            <div class="stat-p ${statClass}">
                ${Stat[i]}:&nbsp;
                <div class="stat-c ${valueClass}" style=${styleMap(colorStyle)}>${ivValue}</div>&nbsp;&nbsp;
            </div>
        `;
    })}
`;

/**
 * Updates the sidebar cards with the provided Pokémon data.
 * 
 * @param {Object} sessionData - The session data containing various modifiers.
 * @param {string} partyID - The ID of the party ('allies' or 'enemies').
 * @param {number} maxPokemonForDetailedView - The maximum number of Pokémon for detailed view.
 */
async function renderSidebarPartyTemplate(sessionData, partyID, maxPokemonForDetailedView = 8) {
    const savedData = window.Utils.LocalStorage.getPlayerData();
    const pokeData = window.activePokemonParties[partyID];
    const sidebarPartyElement = document.getElementById(`sidebar-${partyID}-box`);

    if (pokeData?.pokemon?.length) {
        const partyTemplate = window.lit.createSidebarPartyTemplate(pokeData, partyID, savedData.dexData, sessionData, maxPokemonForDetailedView);
        render(partyTemplate, sidebarPartyElement);

        for (const [i, value] of pokeData.pokemon.entries()) {
            await window.Utils.PokemonIconDrawer.getPokemonIcon(value, `sidebar_${partyID}_${i}`);
        }
    }

    const headerElement = document.getElementById(`sidebar-header`);
    const headerTemplate = window.lit.updateSidebarHeader(sessionData);
    render(headerTemplate, headerElement);
}

async function sidebarSwitchBetweenIVsAndMoveset() {
    const sidebarElement = document.getElementById('roguedex-sidebar');

    const currentInfo = sidebarElement.dataset.shownPokemonTextInfo || 'ivs';
    const newInfo = currentInfo === 'ivs' ? 'movesets' : 'ivs';

    sidebarElement.dataset.shownPokemonTextInfo = newInfo;
    sidebarElement.classList.toggle('hideIVs', newInfo !== 'ivs');
    sidebarElement.classList.toggle('hideMoveset', newInfo !== 'movesets');
}

/**
 * Updates the bottom panel content (weather, global modifiers, pokemon specific modifiers).
 * 
 * @param {Object} sessionData - The session data containing various modifiers.
 * @param {Object} pokemonData - The data for the Pokémon in the party.
 */
async function updateBottomPanel(sessionData, pokemonData) {
    const partyID = pokemonData.partyId;
    if (partyID == "enemies") {
        return;
    }

    const bottomPanelElement = document.getElementById('roguedex-bottom-panel');

    const showTab = (tabId) => {
        window.lit.updateActiveTab(tabId);
    };
    const template = window.lit.createBottomPanelContentTemplate(sessionData, pokemonData, showTab);
    render(template, bottomPanelElement);
    const activeTabId = window.lit.getActiveTab();

    if (!activeTabId) {
        showTab('bottom-panel-global');
    }
}

function deleteAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    element.innerHTML = '';
}

function deleteWrapperDivs() {
    try {
        // console.log("DELETE CALLED")
        const enemies = document.getElementById("enemies");
        // console.log(enemies);
        deleteAllChildren(enemies);
        const allies = document.getElementById("allies");
        deleteAllChildren(allies);
    } catch (e) {
        console.error(e)
    }
}

async function scaleElements() {
    const data = await browserApi.storage.sync.get('scaleFactor');
    const scaleFactorMulti = data.scaleFactor || 1;
    const baseWidth = 1920; // Assume a base width of 1920 pixels
    const baseHeight = 1080; // Assume a base height of 1080 pixels
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const scaleFactorWidth = currentWidth / baseWidth;
    const scaleFactorHeight = currentHeight / baseHeight;
    const scaleFactor = scaleFactorWidth < scaleFactorHeight ? scaleFactorWidth : scaleFactorHeight;
    const enemiesDiv = document.getElementById('enemies');
    const alliesDiv = document.getElementById('allies');
    enemiesDiv.style.fontSize = `${16 * scaleFactor * scaleFactorMulti}px`;
    alliesDiv.style.fontSize = `${16 * scaleFactor * scaleFactorMulti}px`;
}

/* should probably refactor this and combine it with the scaleElements() function */
async function scaleSidebarElements() {
    const data = await browserApi.storage.sync.get('sidebarScaleFactor');
    const scaleFactorMulti = data.sidebarScaleFactor || 1;
    const baseWidth = 1920; // Assume a base width of 1920 pixels
    const baseHeight = 1080; // Assume a base height of 1080 pixels
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const scaleFactorWidth = currentWidth / baseWidth;
    const scaleFactorHeight = currentHeight / baseHeight;
    const scaleFactor = scaleFactorWidth < scaleFactorHeight ? scaleFactorWidth : scaleFactorHeight;
    const sidebarDiv = document.getElementById('roguedex-sidebar');
    sidebarDiv.style.fontSize = `${12 * scaleFactor * scaleFactorMulti}px`;
}

async function toggleSidebar() {
    const data = await browserApi.storage.sync.get('showSidebar')
    const sidebarToggleState = data.showSidebar
    const sidebarElement = document.getElementById('roguedex-sidebar')
    const bottomPanelElement = document.getElementById('roguedex-bottom-panel')
    const gameAppElement = document.getElementById('app')
    const runningStatusElement = document.getElementsByClassName('running-status')[0]
    const enemyCardDiv = document.getElementById('enemies')
    const allyCardDiv = document.getElementById('allies')

    if (sidebarToggleState === true) {
        sidebarElement.classList.remove('hidden')
        sidebarElement.classList.add('active')
        gameAppElement.classList.add('sidebar-active')
        runningStatusElement.classList.add('sidebar-active')
        bottomPanelElement.classList.add('sidebar-active')

        allyCardDiv.classList.add('hidden')
        enemyCardDiv.classList.add('hidden')
        console.log("SIDEBAR toggled ON, #enemies and #allies DOM elements (pokemon cards) have been hidden via css classes.")
    } else if (sidebarToggleState === false) {
        sidebarElement.classList.remove('active')
        sidebarElement.classList.add('hidden')
        gameAppElement.classList.remove('sidebar-active')
        runningStatusElement.classList.remove('sidebar-active')
        bottomPanelElement.classList.remove('sidebar-active')

        allyCardDiv.classList.remove('hidden')
        enemyCardDiv.classList.remove('hidden')
        console.log("SIDEBAR toggled OFF, #enemies and #allies DOM elements (pokemon cards) have been shown again via css classes.")
    }
}

async function changeSidebarPosition() {
    const { sidebarPosition } = await browserApi.storage.sync.get('sidebarPosition');
    const sidebarParentElement = document.body;
    const bottomPanelElement = document.getElementById('roguedex-bottom-panel');

    const positions = ['Left', 'Right', 'Top', 'Bottom'];
    positions.forEach(position => {
        sidebarParentElement.classList.remove(`sidebar-${position}`);
        bottomPanelElement.classList.remove(`sidebar-${position}`);
    });

    sidebarParentElement.classList.add(`sidebar-${sidebarPosition}`);
    bottomPanelElement.classList.add(`sidebar-${sidebarPosition}`);
}

async function toggleSidebarPartyDisplay(partyID, state) {
    const sidebarPartyElement = document.getElementById(`sidebar-${partyID}-box`);
    sidebarPartyElement.classList.toggle('visible', state);
    sidebarPartyElement.classList.toggle('hidden', !state);
}

async function switchSidebarTypesDisplay(state) {
    const sidebarElement = document.getElementById('roguedex-sidebar');
    sidebarElement.classList.toggle('compactTypeDisplay', state);
    sidebarElement.classList.toggle('defaultTypeDisplay', !state);
}

async function initCreation(sessionData) {
    deleteWrapperDivs();
    const extensionSettings = await window.Utils.LocalStorage.getExtensionSettings();
    if (extensionSettings.showEnemies) {
        await dataMapping("enemyParty", "enemies", sessionData);
    }
    if (extensionSettings.showParty) {
        await dataMapping("party", "allies", sessionData);
    }
    if (extensionSettings.showSidebar) {
        await toggleSidebar(sessionData);
        await changeSidebarPosition(sessionData);
        await switchSidebarTypesDisplay(extensionSettings.sidebarCompactTypes);
    }
}

async function dataMapping(pokemonLocation, divId, sessionData) {
    const modifiers = (pokemonLocation === "enemyParty" ? sessionData.enemyModifiers : sessionData.modifiers);
    await window.Utils.PokeMapper.getPokemonArray(sessionData[pokemonLocation], sessionData.arena, modifiers, pokemonLocation).then(async (pokemonData) => {
        weather = Object.hasOwn(pokemonData, 'weather') ? pokemonData.weather : null;
        partySize[divId] = pokemonData.pokemon.length;
        const pIndex = determinePage(divId, pokemonData.pokemon);

        if (false) {
            console.log('/*---------Pokemon mapping----------*/')
            console.group();
            console.log('SesionData', sessionData);
            console.log('PokemonData', pokemonData);
            console.log(`${divId}: Pokemon`, pokemonData.pokemon);
            console.groupEnd();
            console.log('/*----------------------------------*/')
        }

        await createCardsDiv(divId, pokemonData.pokemon, pIndex).then(() => {
            scaleElements();
        });    
        observeGameCanvasResize();

        if (!initStates.panelsInitialized) {
            initStates.panelsInitialized = true;
            createPanels(sessionData, pokemonData);            
        }

        const partyID = (pokemonLocation === "enemyParty" ? "enemies" : "allies");
        window.activePokemonParties[partyID] = pokemonData;
        await renderSidebarPartyTemplate(sessionData, partyID);
        await updateBottomPanel(sessionData, pokemonData);
    });
}

function determinePage(divId, pokemon) {
    if (pages[divId] >= pokemon.length) {
        pages[divId] = pokemon.length - 1;
        return pages[divId];
    } else {
        return pages[divId];
    }
}

function extensionSettingsListener() {
    browserApi.storage.onChanged.addListener(async function (changes, namespace) {
        for (const [key, values = {oldValue, newValue}] of Object.entries(changes)) {
            if (key === 'showMinified') {
                const sessionData = window.Utils.LocalStorage.getSessionData();
                await initCreation(sessionData);
            }
            if (key === 'scaleFactor') {
                await scaleElements();
            }
            if (key === 'showEnemies') {
                const sessionData = window.Utils.LocalStorage.getSessionData();
                await initCreation(sessionData);
                await toggleSidebarPartyDisplay('enemies', values.newValue);
            }
            if (key === 'showParty') {
                const sessionData = window.Utils.LocalStorage.getSessionData();
                await initCreation(sessionData);
                await toggleSidebarPartyDisplay('allies', values.newValue);
            }
            if (key === 'showSidebar') {
                const sessionData = window.Utils.LocalStorage.getSessionData();
                await toggleSidebar(sessionData);
            }
            if (key === 'sidebarPosition') {
                const sessionData = window.Utils.LocalStorage.getSessionData();
                await changeSidebarPosition(sessionData);
            }
            if (key === 'sidebarScaleFactor') {
                await scaleSidebarElements();
            }
            if (key === 'sidebarCompactTypes') {
                const sessionData = window.Utils.LocalStorage.getSessionData();
                await switchSidebarTypesDisplay(values.newValue);
            }            
        }
    });
}

function listenForDataUiModeChange() {
    function observeTouchControls() {
        const touchControlsElement = document.getElementById('touchControls');
        if (touchControlsElement) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(async (mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-ui-mode') {
                        const newValue = touchControlsElement.getAttribute('data-ui-mode');
                        console.log('New value:', newValue);

                        // Existing logic for handling data-ui-mode changes
                        if (newValue === "MESSAGE" || newValue === "COMMAND" || newValue === "CONFIRM") {
                            try {
                                window.Utils.LocalStorage.setSessionData();
                                const sessionData = window.Utils.LocalStorage.getSessionData();
                                if (sessionData && Object.keys(sessionData).length > 0) {
                                    await initCreation(sessionData);
                                } else {
                                    console.log("SessionData empty. 'await initCreation(sessionData)' not called.")
                                }                      
                            } catch (err) {
                                console.error(err)
                            }
                        }
                        if (newValue === "SAVE_SLOT") {
                            window.Utils.LocalStorage.clearAllSessionData();
                        }
                        if (newValue === "SAVE_SLOT" || newValue === "TITLE" || newValue === "MODIFIER_SELECT" || newValue === "STARTER_SELECT") {
                            deleteWrapperDivs()
                        }
                    }
                });
            });

            observer.observe(touchControlsElement, {attributes: true});
            console.log('Touch control listener called');
        } else {
            console.error('Element with ID "touchControls" not found.');
            // Retry after a short delay if the element might be added later
            setTimeout(observeTouchControls, 1000);
        }
    }

    observeTouchControls();
}

listenForDataUiModeChange();

function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function observeGameCanvasResize() {
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            // console.log(entry)
            resizeUIBottomPanel(entry.contentRect.right, entry.contentRect.width, entry.contentRect.height)
        }
        // console.log("Size changed");
    });

    resizeObserver.observe(document.getElementById('app').getElementsByTagName('canvas')[0]);
}

function resizeUIBottomPanel(right, width, height) {
    const panel = document.getElementById('roguedex-bottom-panel')
    const sidePanel = document.getElementById('roguedex-sidebar')

    if (typeof panel !== "undefined") {
        const sidebarPos = sidePanel.getBoundingClientRect();

        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        /* bottom panel should take up the height that is leftover from the game apps canvas */
        panel.style['max-height'] = `${pageHeight - Math.round(height)}px`;

        /*  
            bottom panel should fill out the entire leftover horizontal space,
            and should therefore be "anchored" to the sidebar.
        */
        panel.style['max-width'] = `${pageWidth - sidebarPos.width}px`;
    }
}