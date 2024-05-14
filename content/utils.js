import PokemonMapperClass from "./pokemonMapper.util.js";
import LocalStorageClass from "./localStorage.util.js";
class UtilsClass{
    constructor() {
        UtilsClass.#init(this);
        this.PokeMapper = new PokemonMapperClass();
        this.LocalStorage = new LocalStorageClass();
    }

    static #init($this){

    }


}

const Utils = new UtilsClass();
export default Utils;