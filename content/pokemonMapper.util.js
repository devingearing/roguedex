import Species from "./Pokemon_To_Id";
import EvolutionMap from "./PokemonEvolutions";
import WeatherMap from "./weatherMap";
import AbilityMap from "./abilityMap";
import NatureMap from "./natureMap";

export default class PokemonMapperClass{
    constructor() {
        this.P2I = Species;
        this.I2P = PokemonMapperClass.#calculateInverseMap(this.P2I);
        this.EvoMap = EvolutionMap;
        this.PrevoMap = PokemonMapperClass.#calcPrevolution(this.EvoMap);
        this.W2I = WeatherMap;
        this.I2W = PokemonMapperClass.#calculateInverseMap(this.W2I);
        this.A2I = AbilityMap;
        this.I2A = PokemonMapperClass.#calculateInverseMap(this.A2I);
        this.N2I = NatureMap;
        this.I2N = PokemonMapperClass.#calculateInverseMap(this.N2I);
        PokemonMapperClass.#init(this);
    }

    static #init($this){
    // console.log($this.P2I);
    // console.log($this.I2P);
    // console.log($this.EvoMap);
    // console.log($this.PrevoMap);
    }

    static #calculateInverseMap(map){
        let returnMap = {};
        for (const [key, value] of Object.entries(map)) {
            returnMap[value] = key;
        }
        return returnMap;
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

    static #mapPartyToPokemonArray(party) {
        return party.map(pokemon => ({
            species: pokemon.species,
            abilityIndex: pokemon.abilityIndex,
            nature: pokemon.nature,
            ivs: pokemon.ivs,
            pokerus: pokemon.pokerus,
            shiny: pokemon.shiny,
            variant: pokemon.variant
        }));
    }

    static async #getPokeType(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            const types = data.types.map(type => type.type.name);
            return types;
        } catch (error) {
            console.error('Error fetching Pokémon type:', error);
            return null;
        }
    }

    static async #getPokemonTypeEffectiveness($this, id) {
        const types = await PokemonMapperClass.#getPokeType(id);
        console.log("Pokemon Types");
        console.log(types);
        if (types) {
            const { weaknesses, resistances, immunities } = await PokemonMapperClass.#calculateTypeEffectiveness($this, types);
            console.log(weaknesses, resistances, immunities);
            return {
                'weaknesses': weaknesses,
                'resistances': resistances,
                'immunities': immunities
            }
        }
        return {}
    }

    async getTypeEffectiveness(type) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await response.json();
            console.log(data);
            return data.damage_relations;
        } catch (error) {
            console.error(`Error fetching type effectiveness for ${type}:`, error);
            return null;
        }
    }

    static async #calculateTypeEffectiveness($this, types) {
        const typeEffectiveness = await Promise.all(types.map(type => $this.getTypeEffectiveness(type)));
        console.log("typeEffectiveness");
        console.log(typeEffectiveness);
        if (typeEffectiveness.some(data => data === null)) {
            return null;
        }

        const weaknesses = new Set();
        const resistances = new Set();
        const immunities = new Set();

        if (types.length === 1) {
            const data = typeEffectiveness[0];
            data.double_damage_from.forEach(t => weaknesses.add(t.name));
            data.half_damage_from.forEach(t => resistances.add(t.name));
            data.no_damage_from.forEach(t => immunities.add(t.name));
        } else if (types.length === 2) {
            const [type1, type2] = types;
            const type1Effectiveness = typeEffectiveness[0];
            const type2Effectiveness = typeEffectiveness[1];

            // Calculate weaknesses
            type1Effectiveness.double_damage_from.forEach(t => {
                if (!type2Effectiveness.half_damage_from.some(r => r.name === t.name)) {
                    weaknesses.add(t.name)
                }
            });
            type2Effectiveness.double_damage_from.forEach(t => {
                if (!type1Effectiveness.half_damage_from.some(r => r.name === t.name)) {
                    weaknesses.add(t.name)
                }
            });

            // Calculate resistances
            type1Effectiveness.half_damage_from.forEach(t => {
                if (!type2Effectiveness.double_damage_from.some(r => r.name === t.name)) {
                    resistances.add(t.name)
                }
            });

            type2Effectiveness.half_damage_from.forEach(t => {
                if (!type1Effectiveness.double_damage_from.some(r => r.name === t.name)) {
                    resistances.add(t.name)
                }
            });

            // Calculate immunities
            type1Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
            type2Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
            immunities.forEach(immunity => {
                weaknesses.delete(immunity);
                resistances.delete(immunity);
            })
        }

        return { weaknesses, resistances, immunities };
    }

    async getPokemonArray(pokemonData, arena) {
        let $this = this;
        let pokemonArray = PokemonMapperClass.#mapPartyToPokemonArray(pokemonData);
        let frontendPokemonArray = [];
        let weather = {};

        if (arena.weather && arena.weather.weatherType) {
            weather = {
                type: $this.I2W[arena.weather.weatherType],
                turnsLeft: arena.weather.turnsLeft || 0,
            };
        }

        const pokemonPromises = pokemonArray.map(async (pokemon) => {
            const pokemonId = $this.I2P[pokemon.species].toLocaleLowerCase();
            const typeEffectiveness = await PokemonMapperClass.#getPokemonTypeEffectiveness($this, pokemonId);
            console.log("Got pokemon", pokemonId, "type effectiveness", typeEffectiveness);

            let basePokemon = $this.findBasePokemon($this.I2P[pokemon.species]);
            return {
                id: pokemon.species,
                name: $this.I2P[pokemon.species],
                typeEffectiveness: {
                    weaknesses: Array.from(typeEffectiveness.weaknesses),
                    resistances: Array.from(typeEffectiveness.resistances),
                    immunities: Array.from(typeEffectiveness.immunities),
                },
                ivs: pokemon.ivs,
                ability: $this.I2A[pokemon.abilityIndex],
                nature: $this.I2A[pokemon.nature],
                basePokemon: basePokemon,
                baseId: $this.P2I[basePokemon],
            };
        });

        frontendPokemonArray = await Promise.all(pokemonPromises);

        return { pokemon: frontendPokemonArray, weather: weather };
    }


}


