import PokemonMapperClass from "./pokemonMapper.util.js";

class UtilsClass{
    constructor() {
        UtilsClass.#init(this);
        this.PokeMapper = new PokemonMapperClass();
    }

    static #init($this){

    }


}

const Utils = new UtilsClass();
export default Utils;