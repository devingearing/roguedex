import Species from "./Pokemon_To_Id";
import EvolutionMap from "./PokemonEvolutions";

export default class PokemonMapperClass{
    constructor() {
        this.P2I = Species;
        this.I2P = PokemonMapperClass.#calcIdToPokemon(this.P2I);
        this.EvoMap = EvolutionMap;
        this.PrevoMap = PokemonMapperClass.#calcPrevolution(this.EvoMap);
        PokemonMapperClass.#init(this);
    }

    static #init($this){
    // console.log($this.P2I);
    // console.log($this.I2P);
    // console.log($this.EvoMap);
    // console.log($this.PrevoMap);
    }
    static #calcIdToPokemon(pokemon){
        let SpeciesNumberToName = {};
        for (const [key, value] of Object.entries(pokemon)) {
        SpeciesNumberToName[value] = key;
        }
        return SpeciesNumberToName;
    }
    static #calcPrevolution(evoMap){
        let preEvolutions = {};
        const prevolutionKeys = Object.keys(evoMap);
        prevolutionKeys.forEach(pk =>{
            let evolutions =  evoMap[pk];
            if (Array.isArray(evolutions)) {
                evolutions.forEach(evo => {
                    preEvolutions[evo.name] = pk;
                });
            } else {
                preEvolutions[evolutions.name] = pk;
            }
        });
        return preEvolutions;
    }

    findBasePokemon(pokemonName) {
        let currentName = pokemonName;
        while (this.PrevoMap[currentName] !== undefined) {
            currentName = this.PrevoMap[currentName];
        }
        return currentName;
    }

     mapPartyToPokemonArray(party) {
        return party.map(({ species, abilityIndex, nature, ivs }) => ({ species, abilityIndex, nature, ivs }))
    }


}


