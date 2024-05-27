class PokemonMapperClass{
    constructor() {
        this.P2I = window.__Species;
        this.I2P;
        this.EvoMap = window.__EvolutionMap;
        this.PrevoMap;
        this.W2I = window.__WeatherMap;
        this.I2W;
        this.A2I = window.__AbilityMap;
        this.I2A;
        this.N2I = window.__NatureMap;
        this.I2N;
        this.MoveList = window.__MoveList;
        PokemonMapperClass.#init(this);
    }

    static #init($this) {
        $this.I2P = PokemonMapperClass.#calculateInverseMap($this.P2I);
        $this.I2W = PokemonMapperClass.#calculateInverseMap($this.W2I);
        $this.I2A = PokemonMapperClass.#calculateInverseMap($this.A2I);
        $this.I2N = PokemonMapperClass.#calculateInverseMap($this.N2I);
        $this.PrevoMap = PokemonMapperClass.#calcPrevolution($this.EvoMap);
    }

    static #calculateInverseMap(map){
        console.log(map);
        let returnMap = {};
        for (const [key, value] of Object.entries(map)) {
            returnMap[value] = key;
        }
        return returnMap;
    }

    static #calcPrevolution(evoMapT){
        // let evoMapT = window.__EvolutionMap;
        let preEvolutions = {};
        const prevolutionKeys = Object.keys(evoMapT);
        prevolutionKeys.forEach(pk =>{
            let evolutions =  evoMapT[pk];
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
            variant: pokemon.variant,
            fusionSpecies: (pokemon.hasOwnProperty('fusionSpecies')) ? pokemon.fusionSpecies : null,
            fusionAbilityIndex: pokemon.fusionAbilityIndex,
            moveset: pokemon.moveset,
            boss: pokemon.boss,
            friendship: pokemon.friendship,
            level: pokemon.level,
            luck: pokemon.luck,
        }));
    }
    
    static async #getPokeType(id) {
        console.log(id);
        const maxRetries = 3;
        let attempts = 0;
        while (attempts < maxRetries) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const types = data.types.map(type => type.type.name);
                return types;
            } catch (error) {
                attempts += 1;
                console.error(`Attempt ${attempts} - Error fetching Pokémon type:`, error);
                if (attempts >= maxRetries) {
                    console.error('Max retries reached. Failed to fetch Pokémon type.');
                    return null;
                }
            }
        }
    }

    static async #getPokemonTypeMoveset(movelist, id, movesetObj) {
        // https://pokeapi.co/api/v2/move/${id}
        
        /* currently does not account for g-moves and z-moves */
        const moveset = movesetObj.map(move => ({
            id: move.moveId,
            name: movelist.default[move.moveId].name,
            type: movelist.default[move.moveId].type,
            category: movelist.default[move.moveId].category,
            power: movelist.default[move.moveId].power,
            maxPP: movelist.default[move.moveId].pp, // doesn't account for pp up
            accuracy: movelist.default[move.moveId].accuracy,
        }));
        return moveset
    }

    static async #getPokemonTypeEffectiveness($this, id) {
        const types = await PokemonMapperClass.#getPokeType(id);
        if (types) {
            const { weaknesses, resistances, immunities } = await PokemonMapperClass.#calculateTypeEffectiveness($this, types);
            return {
                'weaknesses': weaknesses,
                'resistances': resistances,
                'immunities': immunities
            }
        }
        return {}
    }

    static async #getPokemonTypeEffectivenessDetailed($this, id, typeOverload) {
        let types;
        if (!typeOverload) {
         types = await PokemonMapperClass.#getPokeType(id);
        }
        else{
            types = typeOverload;
        }
        // ignore single type pokemon
        if (types.length > 1) {
            const { weaknesses, resistances, immunities, cssClasses } = await PokemonMapperClass.#calculateTypeEffectivenessDetailed($this, types);            
            return {
                'weaknesses': weaknesses,
                'resistances': resistances,
                'immunities': immunities,
                'cssClasses' : cssClasses
            }
        }
        else {
            const { weaknesses, resistances, immunities } = await PokemonMapperClass.#calculateTypeEffectiveness($this, types);
            console.log("single type");
            console.log(weaknesses, resistances, immunities);
            return {
                'weaknesses': {normal: [...weaknesses]},
                'resistances': {normal: [...resistances]},
                'immunities': {normal: [...immunities]},
                'cssClasses' : {}
            }
        }
        return { }
    }

    async getTypeEffectiveness(type) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await response.json();
            return data.damage_relations;
        } catch (error) {
            console.error(`Error fetching type effectiveness for ${type}:`, error);
            return null;
        }
    }

    /* 
        Quick and dirty function to get type weaknesses for dual types, including x4 and x0.25 dmg multipliers.
    */
    static async #calculateTypeEffectivenessDetailed($this, types) {        
        const typesInPokemondbOrder = [	
            "normal",
            "fire",
            "water",
            "electric",
            "grass",
            "ice",
            "fighting",
            "poison",
            "ground",
            "flying",
            "psychic",
            "bug",
            "rock",
            "ghost",
            "dragon",
            "dark",
            "steel",
            "fairy",
            "stellar"
        ]

        const _ = 1;
        const h = 1 / 2;     

        // matrix of types against other types in pokemonDB order
        // https://pokemondb.net/type
        // taken from https://github.com/wavebeem/pkmn.help/blob/master/src/misc/data-matchups.ts
        const genDefault = [
            [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h, _, _],
            [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2, _, _],
            [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _, _, _],
            [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _, _, _],
            [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, _, h, _, _],
            [_, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, _, _],
            [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, 2, 2, h, _],
            [_, _, _, _, 2, _, _, h, h, _, _, _, h, h, _, _, 0, 2, _],
            [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, _, 2, _, _],
            [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, _, h, _, _],
            [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, 0, h, _, _],
            [_, h, _, _, 2, _, h, h, _, h, 2, _, _, h, _, 2, h, h, _],
            [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, _, h, _, _],
            [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, h, 0, _],
            [_, _, _, _, _, _, h, _, _, _, 2, _, _, 2, _, h, _, h, _],
            [_, h, h, h, _, 2, _, _, _, _, _, _, 2, _, _, _, h, 2, _],
            [_, h, _, _, _, _, 2, h, _, _, _, _, _, _, 2, 2, h, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
        ];

        let type1 = types[0]
        let type2 = types[1]
        let primaryIndex	= typesInPokemondbOrder.indexOf(type1)
        let secondaryIndex	= typesInPokemondbOrder.indexOf(type2)

        //let results = { defenderPair : [type1, type2], immune : [], normal : [], half : [], quarter : [], double : [], quadrupel : [] }
        let weaknesses = { 'normal' : [], 'double' : [] }
        let resistances = { 'normal' : [], 'double' : [] }
        let immunities = { 'normal' : [] }
        let cssClasses = {}
        //const typeEffectivenessObj = {}

        typesInPokemondbOrder.forEach((attackerType, i) => {
            let defenderType_1 = genDefault[i][primaryIndex]
            let defenderType_2 = genDefault[i][secondaryIndex]

            // at least 1 type is immune => immune
            if (defenderType_1 == 0 || defenderType_2 == 0) {
                console.log("AT");
                console.log(attackerType);
                immunities.normal.push(attackerType)
                cssClasses[attackerType] = 'no-dmg'
                return
            }
            // both types are weak => quadrupel dmg
            else if ((defenderType_1 == 2 && defenderType_2 == 2)) {
                weaknesses.double.push(attackerType)
                cssClasses[attackerType] = 'super-dmg'
            }
            // one type is weak, the other takes normal dmg => double dmg
            else if ((defenderType_1 == 2 && defenderType_2 == 1) || (defenderType_2 == 2 && defenderType_1 == 1)) {
                weaknesses.normal.push(attackerType)
                cssClasses[attackerType] = 'double-dmg'
            }
            // one type is weak, the other resists (half) => normal dmg
            else if ((defenderType_1 == 2 && defenderType_2 == h) || (defenderType_2 == 2 && defenderType_1 == h)) {
                // for the moment don't return, default dmg not being used
            }
            // both types take normal dmg => normal dmg
            else if (defenderType_1 == _ && defenderType_2 == _) {
                // for the moment don't return, default dmg not being used
            }
            // one type resists, the other takes normal dmg => half dmg
            else if ((defenderType_1 == h && defenderType_2 == _) || (defenderType_2 == h && defenderType_1 == _)) {
                resistances.normal.push(attackerType)
                cssClasses[attackerType] = 'resist'
            }
            // both types resist (half) => quarter dmg
            else if (defenderType_1 == h && defenderType_2 == h) {
                resistances.double.push(attackerType)
                cssClasses[attackerType] = 'super-resist'
            }
        });



        return { weaknesses, resistances, immunities, cssClasses };    
    }

    static async #calculateTypeEffectiveness($this, types) {
        const typeEffectiveness = await Promise.all(types.map(type => $this.getTypeEffectiveness(type)));
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

    async getPokemonAbility(pokemonId, pokemonAbilityIndex, fusionId, fusionAbilityIndex) {
        let $this = this;
        let pokeID;
        let abilityIndex;
        if(fusionId){
            pokeID = (this.I2P[fusionId]).toLowerCase();
            abilityIndex = fusionAbilityIndex;
        }
        else{
            //pokeID = (this.I2P[pokemonId]).toLowerCase();
            pokeID = $this.fixVariantPokemonNames($this.I2P, pokemonId).toLocaleLowerCase();
            abilityIndex = pokemonAbilityIndex;
        }
        try {
            const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
            const data = await pokemonInfo.json();

            const abilityLength = data.abilities.length

            if (abilityIndex >= abilityLength) {
                abilityIndex = abilityLength - 1 // Pokerogue uses a "None" ability as padding when pokémon have less than 3.
            }

            const abilityName = data.abilities[abilityIndex].ability.name
            const abilityInfo = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
            const abilityData = await abilityInfo.json();
            return {
                'name': abilityName.toUpperCase().replace('-', ' '),
                'description': abilityData.flavor_text_entries[abilityData.flavor_text_entries.length - 1].flavor_text,
                'isHidden': data.abilities[abilityIndex].is_hidden
            }
        } catch (error) {
            console.error('Error fetching Pokémons ability:', error);
            return null;
        }
    }

    capitalizeFirstLetter(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static async #getFullTypeEffectivenessAllCases($this, pokemonName, fusionName){
        if(!fusionName){
            return await PokemonMapperClass.#getPokemonTypeEffectivenessDetailed($this, pokemonName);
        }
        else{
            const baseTypes = await PokemonMapperClass.#getPokeType(pokemonName);
            const fusionTypes = await PokemonMapperClass.#getPokeType(fusionName);
            let finalType = [];
            finalType.push(baseTypes[0]);
            if(fusionTypes.length > 1) {
                if(fusionTypes[1] !== finalType[0]) {
                    finalType.push(fusionTypes[1]);
                }
                else{
                    finalType.push(fusionTypes[0]);
                }
            }
            else{
                if(fusionTypes[0] !== finalType[0]) {
                    finalType.push(fusionTypes[0]);
                }
            }
            console.log(finalType);
            return await PokemonMapperClass.#getPokemonTypeEffectivenessDetailed($this, null, finalType)
        }
    }

    async getPokemonArray(pokemonData, arena) {
        let $this = this;
        let pokemonArray = PokemonMapperClass.#mapPartyToPokemonArray(pokemonData);
        console.log(pokemonArray);
        let frontendPokemonArray = [];
        let weather = {};

        if (arena.weather && arena.weather.weatherType) {
            weather = {
                type: $this.I2W[arena.weather.weatherType],
                turnsLeft: arena.weather.turnsLeft || 0,
            };
        }

        const pokemonPromises = pokemonArray.map(async (pokemon) => {
            const pokemonId = $this.fixVariantPokemonNames($this.I2P, pokemon.species).toLocaleLowerCase();
            const fusionId = $this.fixVariantPokemonNames($this.I2P, pokemon.fusionSpecies)?.toLocaleLowerCase();
            console.log(pokemonId)
            //const pokemonId = $this.I2P[$this.convertPokemonId(pokemon.species)].toLocaleLowerCase();
            const moveset = await PokemonMapperClass.#getPokemonTypeMoveset($this.MoveList, pokemonId, pokemon.moveset);
            const typeEffectiveness = await PokemonMapperClass.#getPokemonTypeEffectiveness($this, pokemonId);
            const typeEffectivenessDetailed = await PokemonMapperClass.#getPokemonTypeEffectivenessDetailed($this, pokemonId);
            let basePokemon = $this.findBasePokemon($this.I2P[pokemon.species]);
            let name = $this.getPokemonName(pokemon);
            return {
                id: $this.convertPokemonId(pokemon.species),
                name: $this.capitalizeFirstLetter(name.toUpperCase()),
                typeEffectiveness: {
                    weaknesses: typeEffectiveness.weaknesses,
                    resistances: typeEffectiveness.resistances,
                    immunities: typeEffectiveness.immunities,
                    cssClasses: typeEffectiveness.cssClasses,
                },
                ivs: pokemon.ivs,
                ability: await $this.getPokemonAbility(pokemon.species, pokemon.abilityIndex, pokemon.fusionSpecies, pokemon.fusionAbilityIndex),
                nature: $this.I2N[pokemon.nature],
                basePokemon: basePokemon,
                baseId: $this.P2I[basePokemon],
                fusionId: pokemon.fusionSpecies,
                moveset: moveset,
                boss: pokemon.boss,
                friendship: pokemon.friendship,
                level: pokemon.level,
                luck: pokemon.luck,
            };
        });

        frontendPokemonArray = await Promise.all(pokemonPromises);

        return { pokemon: frontendPokemonArray, weather: weather };
    }

    getPokemonName(pokemon){
        if(pokemon.fusionSpecies){
            let nameA = this.I2P[pokemon.species];
            let nameB = this.I2P[pokemon.fusionSpecies];
            return this.getFusedSpeciesName(nameA, nameB);
            //getFusedSpeciesName
        }
        else{
            //this.I2P[pokemon.species]
            return this.fixVariantPokemonNames(this.I2P, pokemon.species)                
        }

    }

     getFusedSpeciesName(speciesAName, speciesBName) {
        const fragAPattern = /([a-z]{2}.*?[aeiou(?:y$)\-\']+)(.*?)$/i;
        const fragBPattern = /([a-z]{2}.*?[aeiou(?:y$)\-\'])(.*?)$/i;

        const [ speciesAPrefixMatch, speciesBPrefixMatch ] = [ speciesAName, speciesBName ].map(n => /^(?:[^ ]+) /.exec(n));
        const [ speciesAPrefix, speciesBPrefix ] = [ speciesAPrefixMatch, speciesBPrefixMatch ].map(m => m ? m[0] : '');

        if (speciesAPrefix)
            speciesAName = speciesAName.slice(speciesAPrefix.length);
        if (speciesBPrefix)
            speciesBName = speciesBName.slice(speciesBPrefix.length);

        const [ speciesASuffixMatch, speciesBSuffixMatch ] = [ speciesAName, speciesBName ].map(n => / (?:[^ ]+)$/.exec(n));
        const [ speciesASuffix, speciesBSuffix ] = [ speciesASuffixMatch, speciesBSuffixMatch ].map(m => m ? m[0] : '');

        if (speciesASuffix)
            speciesAName = speciesAName.slice(0, -speciesASuffix.length);
        if (speciesBSuffix)
            speciesBName = speciesBName.slice(0, -speciesBSuffix.length);

        const splitNameA = speciesAName.split(/ /g);
        const splitNameB = speciesBName.split(/ /g);

        let fragAMatch = fragAPattern.exec(speciesAName);
        let fragBMatch = fragBPattern.exec(speciesBName);
        let fragA;
        let fragB;

        fragA = splitNameA.length === 1
            ? fragAMatch ? fragAMatch[1] : speciesAName
            : splitNameA[splitNameA.length - 1];

        if (splitNameB.length === 1) {
            if (fragBMatch) {
                const lastCharA = fragA.slice(fragA.length - 1);
                const prevCharB = fragBMatch[1].slice(fragBMatch.length - 1);
                fragB = (/[\-']/.test(prevCharB) ? prevCharB : '') + fragBMatch[2] || prevCharB;
                if (lastCharA === fragB[0]) {
                    if (/[aiu]/.test(lastCharA))
                        fragB = fragB.slice(1);
                    else {
                        const newCharMatch = new RegExp(`[^${lastCharA}]`).exec(fragB);
                        if (newCharMatch?.index > 0)
                            fragB = fragB.slice(newCharMatch.index);
                    }
                }
            } else
                fragB = speciesBName;
        } else
            fragB = splitNameB[splitNameB.length - 1];

        if (splitNameA.length > 1)
            fragA = `${splitNameA.slice(0, splitNameA.length - 1).join(' ')} ${fragA}`;

        fragB = `${fragB.slice(0, 1).toLowerCase()}${fragB.slice(1)}`;
        return `${speciesAPrefix || speciesBPrefix}${fragA}${fragB}${speciesBSuffix || speciesASuffix}`;
    }

    fixVariantPokemonNames(I2P, pokemonSpeciesID) {
        /* 
        convertPokemonId() isn't working for a bunch of pokemon.
        At least not when trying to get the pokemon identifier/name via '$this.I2P[pokemonSpeciesID]'.
        For example in the function 'getPokemonArray()'.
        I2P has the same keys as the conversion list (2019 ... 8901), it doesn't have keys matching the values that are returned by the conversion 
        list (10091 ... 10272), so the return value is always undefined when any converted ID is used as a I2P key.
        That would effect variants like galar and alola pokemon.
        
        So for anything that needs a pokemon identifier like 'farfetched-galar' or 'farfetched' instead of the 
        converted ID (number), this is a quick workaround.
        */
        if(pokemonSpeciesID) {
            const pokemonIdentifier = I2P[pokemonSpeciesID];

            if (pokemonSpeciesID > 2018) {
                // turns something like GALAR_FARFETCHD into FARFETCHD-GALAR, which is the correct pokemon identifier used by pokeapi
                const splits = pokemonIdentifier.split('_');
                return splits[1] + '-' + splits[0];
            } else {
                return pokemonIdentifier
            }
        }
        else{
            return null;
        }
    }

    convertPokemonId(pokemonId) {
        const conversionList = {
            2019: 10091,
            2020: 10092,
            2026: 10100,
            2027: 10101,
            2028: 10102,
            2037: 10103,
            2038: 10104,
            2050: 10105,
            2051: 10106,
            2052: 10107,
            2053: 10108,
            2074: 10109,
            2075: 10110,
            2076: 10111,
            2088: 10112,
            2089: 10113,
            2103: 10114,
            2105: 10115,
            2670: 10061,
            4052: 10161,
            4077: 10162,
            4078: 10163,
            4079: 10164,
            4080: 10165,
            4083: 10166,
            4110: 10167,
            4122: 10168,
            4144: 10169,
            4145: 10170,
            4146: 10171,
            4199: 10172,
            4222: 10173,
            4263: 10174,
            4264: 10175,
            4554: 10176,
            4555: 10177,
            4562: 10179,
            4618: 10180,
            6058: 10229,
            6059: 10230,
            6100: 10231,
            6101: 10232,
            6157: 10233,
            6211: 10234,
            6215: 10235,
            6503: 10236,
            6549: 10237,
            6570: 10238,
            6571: 10239,
            6628: 10240,
            6705: 10241,
            6706: 10242,
            6713: 10243,
            6724: 10244,
            8128: 10252,
            8194: 10253,
            8901: 10272
        }
        if (pokemonId in conversionList) {
            return conversionList[pokemonId]
        } else {
            return pokemonId
        }
    }
}



