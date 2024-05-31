const contentInjectables = [
    "/content/maps/PokemonEvolutions.js",
    "/content/maps/abilityMap.js",
    "/content/maps/natureMap.js",
    "/content/maps/Pokemon_To_Id.js",
    "/content/maps/weatherMap.js",
    "/content/maps/moveList.js",
    "/content/util_classes/pokemonMapper.util.js",
    "/content/util_classes/localStorage.util.js",
    "/content/util_classes/uiController.util.js",
    "/content/data/speciesData.js"
];

class UtilsClass extends EventTarget {  // eslint-disable-line no-unused-vars
    constructor() {
        super();
        this.PokeMapper = null; // Initialize properly
        this.LocalStorage = null; // Initialize properly
        this.classesReady = {
            "pokemonMapper.util.js": false,
            "localStorage.util.js": false,
            "uiController.util.js": false,
        };
        this._isReady = false; // Use a private variable for the actual value
        this.index = 0;
    }

    get isReady() {
        return this._isReady;
    }

    set isReady(value) {
        if (this._isReady !== value) {
            this._isReady = value;
            this.dispatchEvent(new Event('isReadyChange'));
        }
    }

    init() {
        this.scriptInjector();
    }

    checkIfRead() {
        let isReady = true;
        for (const cI in this.classesReady) {
            const targetClass = this.classesReady[cI];
            if (targetClass === false) {
                isReady = false;
            }
        }
        this.isReady = isReady;
    }

    scriptInjector() {
        if (this.index >= contentInjectables.length) {
            console.log("All scripts injected.");
            return;
        }

        const targetScript = contentInjectables[this.index];
        console.log(`Injecting script: ${targetScript}`);
        const scriptElem = document.createElement("script");
        scriptElem.src = chrome.runtime.getURL(targetScript);
        scriptElem.type = "module";
        document.head.appendChild(scriptElem);

        scriptElem.addEventListener("load", () => {
            console.log(`${targetScript} loaded.`);
            if (targetScript === "/content/util_classes/pokemonMapper.util.js") {
                this.classesReady["pokemonMapper.util.js"] = true;
                this.PokeMapper = new PokemonMapperClass();
                this.checkIfRead();
            } else if (targetScript === "/content/util_classes/localStorage.util.js") {
                this.classesReady["localStorage.util.js"] = true;
                this.LocalStorage = new LocalStorageClass();
                this.checkIfRead();
            } else if (targetScript === "/content/util_classes/uiController.util.js") {
                this.classesReady["uiController.util.js"] = true;
                // this.UiController = new UIController();
                this.checkIfRead();
            } else {
                console.log(`Script ${targetScript} loaded but no special handling required.`);
            }
            this.index += 1;
            this.scriptInjector(); // Inject the next script
        });

        scriptElem.addEventListener("error", (e) => {
            console.error(`Failed to load script: ${targetScript}`, e);
        });
    }
}
