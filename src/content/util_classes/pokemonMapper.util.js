class PokemonMapperClass{
    constructor() {
        this.P2I = window.__Species;
        this.I2P = null;
        this.EvoMap = window.__EvolutionMap;
        this.PrevoMap = null;
        this.W2I = window.__WeatherMap;
        this.I2W = null;
        this.A2I = window.__AbilityMap;
        this.I2A = null;
        this.N2I = window.__NatureMap;
        this.I2N = null;
        this.MoveList = window.__moveList;
        this.AbilityList = window.__abilityList;
        this.PokemonList = window.__pokemonList;
        // this.SpeciesData = window.__SpeciesData;
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
        // console.log(map);
        const returnMap = {};
        for (const [key, value] of Object.entries(map)) {
            returnMap[value] = key;
        }
        return returnMap;
    }

    static #calcPrevolution(evoMapT){
        // let evoMapT = window.__EvolutionMap;
        const preEvolutions = {};
        const prevolutionKeys = Object.keys(evoMapT);
        prevolutionKeys.forEach(pk =>{
            const evolutions =  evoMapT[pk];
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
            fusionSpecies: (Object.hasOwn(pokemon,'fusionSpecies')) ? pokemon.fusionSpecies : null,
            fusionAbilityIndex: pokemon.fusionAbilityIndex,
            moveset: pokemon.moveset,
            boss: pokemon.boss,
            friendship: pokemon.friendship,
            level: pokemon.level,
            luck: pokemon.luck,
            fusionLuck: pokemon.fusionLuck,
            natureOverride: pokemon.natureOverride,
            formIndex: pokemon.formIndex,
        }));
    }
    
    static async #fetchDataWithFallback(primaryUrl, fallbackUrls) {
        async function fetchJson(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(`Failed to fetch data from ${url}:`, error);
                return null;
            }
        }
    
        // Try the primary URL first
        const primaryData = await fetchJson(primaryUrl);
        if (primaryData) {
            return primaryData;
        }
    
        // Try each fallback URL in order
        for (const fallbackUrl of fallbackUrls) {
            const fallbackData = await fetchJson(fallbackUrl);
            if (fallbackData) {
                return fallbackData;
            }
        }
    
        throw new Error('Failed to fetch data from the primary URL and all fallback URLs');
    }

    static async #getPokemonTypeMoveset(movelist, movesetObj) {
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

    static async #getPokemonTypeEffectivenessDetailed(typeArray) {
        let types = typeArray;

        try {
            const { weaknesses, resistances, immunities, cssClasses } = await PokemonMapperClass.#calculateTypeEffectivenessDetailed(types);        
            return {
                weaknesses,
                resistances,
                immunities,
                cssClasses
            }
        } catch (error) {
            console.error(error)
        }
        return { }
    }

    static async #calculateTypeEffectivenessDetailed(types) {        
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

        const weaknesses = { 'normal' : [], 'double' : [] }
        const resistances = { 'normal' : [], 'double' : [] }
        const immunities = { 'normal' : [] }
        const cssClasses = {}

        const type1 = types[0];
        const primaryIndex = typesInPokemondbOrder.indexOf(type1);

        if (types.length === 1) {
            typesInPokemondbOrder.forEach((attackerType, i) => {
                const defenderType1 = genDefault[i][primaryIndex];
                if (defenderType1 === 0) {
                    immunities.normal.push(attackerType)
                    cssClasses[attackerType] = 'no-dmg'
                }
                else if (defenderType1 === 2) {
                    weaknesses.normal.push(attackerType)
                    cssClasses[attackerType] = 'double-dmg'
                }
                else if (defenderType1 === _) {
                    // for the moment don't return, default dmg not being used
                }
                else if (defenderType1 === h) {
                    resistances.normal.push(attackerType)
                    cssClasses[attackerType] = 'resist'
                }
            });
        }
        else if (types.length > 1) {
            const type2 = types[1];       
            const secondaryIndex = typesInPokemondbOrder.indexOf(type2);           

            typesInPokemondbOrder.forEach((attackerType, i) => {
                const defenderType1 = genDefault[i][primaryIndex]
                const defenderType2 = genDefault[i][secondaryIndex]

                // at least 1 type is immune => immune
                if (defenderType1 === 0 || defenderType2 === 0) {
                    // console.log("AT");
                    // console.log(attackerType);
                    immunities.normal.push(attackerType)
                    cssClasses[attackerType] = 'no-dmg'
                    
                }
                // both types are weak => quadrupel dmg
                else if ((defenderType1 === 2 && defenderType2 === 2)) {
                    weaknesses.double.push(attackerType)
                    cssClasses[attackerType] = 'super-dmg'
                }
                // one type is weak, the other takes normal dmg => double dmg
                else if ((defenderType1 === 2 && defenderType2 === 1) || (defenderType2 === 2 && defenderType1 === 1)) {
                    weaknesses.normal.push(attackerType)
                    cssClasses[attackerType] = 'double-dmg'
                }
                // one type is weak, the other resists (half) => normal dmg
                else if ((defenderType1 === 2 && defenderType2 === h) || (defenderType2 === 2 && defenderType1 === h)) {
                    // for the moment don't return, default dmg not being used
                }
                // both types take normal dmg => normal dmg
                else if (defenderType1 === _ && defenderType2 === _) {
                    // for the moment don't return, default dmg not being used
                }
                // one type resists, the other takes normal dmg => half dmg
                else if ((defenderType1 === h && defenderType2 === _) || (defenderType2 === h && defenderType1 === _)) {
                    resistances.normal.push(attackerType)
                    cssClasses[attackerType] = 'resist'
                }
                // both types resist (half) => quarter dmg
                else if (defenderType1 === h && defenderType2 === h) {
                    resistances.double.push(attackerType)
                    cssClasses[attackerType] = 'super-resist'
                }
            });
        }

        return { weaknesses, resistances, immunities, cssClasses };    
    }

    async getPokemonAbility(pokemonId, pokemonAbilityIndex, fusionId, fusionAbilityIndex) {
        const $this = this;
        let pokeID;
        let abilityIndex;
        if (fusionId) {
            pokeID = fusionId;
            abilityIndex = fusionAbilityIndex;
        }
        else {
            pokeID = pokemonId;
            abilityIndex = pokemonAbilityIndex;
        }

        try {
            const pokemonAbilityData = $this.PokemonList[pokeID].abilities;
            const abilityLength = pokemonAbilityData.length;
            if (abilityIndex >= abilityLength) {
                abilityIndex = abilityLength - 1;   // Pokerogue uses a "None" ability as padding when pokémon have less than 3.
            }
            const abilityName = pokemonAbilityData[abilityIndex].name;

            return {
                'name': abilityName.toUpperCase().replace('-', ' '),
                'description': $this.AbilityList[abilityName].flavor_text_entries[0].flavor_text,   // may have to be changed if a data file with multiple languages were to be used.
                'isHidden': pokemonAbilityData[abilityIndex].is_hidden
            }

        } catch (error) {
            return {
                'name': 'null',
                'description': 'null',
                'isHidden': false
            }
        }
    }

    capitalizeFirstLetter(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static async #getFullTypeEffectivenessAllCases(baseTypeArray, fusionTypeArray) {
        if (fusionTypeArray) {
            const newTypeArray = [baseTypeArray[0], (fusionTypeArray.length > 1 ? fusionTypeArray[1] : fusionTypeArray[0]) ];
            return await PokemonMapperClass.#getPokemonTypeEffectivenessDetailed(newTypeArray);            
        }
        else{
            return await PokemonMapperClass.#getPokemonTypeEffectivenessDetailed(baseTypeArray);
        }
    }

    async getPokemonArray(pokemonData, arena) {
        const $this = this;
        const pokemonArray = PokemonMapperClass.#mapPartyToPokemonArray(pokemonData);
        // console.log(pokemonArray);
        let frontendPokemonArray = [];
        let weather = {};

        if (arena.weather && arena.weather.weatherType) {
            weather = {
                type: $this.I2W[arena.weather.weatherType],
                turnsLeft: arena.weather.turnsLeft || 0,
            };
        }

        const pokemonPromises = pokemonArray.map(async (pokemon) => {           
            const pokemonId = $this.PokemonList[pokemon.species].name;
            // console.log("pokemonId", pokemonId)

            const fusionId = $this.PokemonList[pokemon.fusionSpecies]?.name
            // console.log("fusionId", fusionId)

            const moveset = await PokemonMapperClass.#getPokemonTypeMoveset($this.MoveList, pokemon.moveset);
            // console.log("moveset", moveset)

            const baseTypes = $this.PokemonList[pokemon.species]?.types;
            const fusionTypes = $this.PokemonList[pokemon.fusionSpecies]?.types;
            // console.log("baseTypes", baseTypes)
            // console.log("fusionTypes", fusionTypes)
            const typeEffectiveness = await PokemonMapperClass.#getFullTypeEffectivenessAllCases(baseTypes, fusionTypes);
            // console.log("typeEffectiveness", typeEffectiveness)
            
            const basePokemon = $this.PokemonList[pokemon.species].basePokemonName;
            const fusionPokemon = $this.PokemonList[pokemon.fusionSpecies]?.basePokemonName;            
            const name = $this.getPokemonName(pokemon, basePokemon, fusionPokemon);
            const pokemonSprite = $this.PokemonList[pokemon.species].sprite;

            return {
                id: pokemon.species,
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
                basePokemon,
                baseId: $this.PokemonList[pokemon.species].basePokemonId,
                sprite: pokemonSprite,
                fusionId: pokemon.fusionSpecies,
                moveset,
                boss: pokemon.boss,
                friendship: pokemon.friendship,
                level: pokemon.level,
                luck: pokemon.luck,
                fusionLuck: pokemon.fusionLuck,
            };
        });

        frontendPokemonArray = await Promise.all(pokemonPromises);

        return { pokemon: frontendPokemonArray, weather };
    }

    getPokemonName(pokemon, basePokemon, fusionPokemon) {
        if(pokemon.fusionSpecies) {
            //const nameA = this.I2P[pokemon.species];
            const nameA = basePokemon;
            //const nameB = this.I2P[pokemon.fusionSpecies];
            const nameB = fusionPokemon;
            return this.getFusedSpeciesName(nameA, nameB);
            // getFusedSpeciesName
        }
        else{
            // this.I2P[pokemon.species]
            // return this.fixVariantPokemonNames(this.I2P, pokemon.species, pokemon.formIndex)                
            return basePokemon;
        }

    }

    getPokemonName_old(pokemon) {
        if(pokemon.fusionSpecies) {
            const nameA = this.I2P[pokemon.species];
            const nameB = this.I2P[pokemon.fusionSpecies];
            return this.getFusedSpeciesName(nameA, nameB);
            // getFusedSpeciesName
        }
        else{
            // this.I2P[pokemon.species]
            return this.fixVariantPokemonNames(this.I2P, pokemon.species, pokemon.formIndex)                
        }

    }

     getFusedSpeciesName(speciesAName, speciesBName) {
        const fragAPattern = /([a-z]{2}.*?[aeiou(?:y$)\-']+)(.*?)$/i;
        const fragBPattern = /([a-z]{2}.*?[aeiou(?:y$)\-'])(.*?)$/i;

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

        const fragAMatch = fragAPattern.exec(speciesAName);
        const fragBMatch = fragBPattern.exec(speciesBName);
        let fragA;
        let fragB;

        fragA = splitNameA.length === 1
            ? fragAMatch ? fragAMatch[1] : speciesAName
            : splitNameA[splitNameA.length - 1];

        if (splitNameB.length === 1) {
            if (fragBMatch) {
                const lastCharA = fragA.slice(fragA.length - 1);
                const prevCharB = fragBMatch[1].slice(fragBMatch.length - 1);
                fragB = (/[-']/.test(prevCharB) ? prevCharB : '') + fragBMatch[2] || prevCharB;
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

    fixVariantPokemonNames_old(I2P, pokemonSpeciesID, formIndex) {
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
            let pokemonForm = '';
            try {
                let formsObj = this.SpeciesData[pokemonSpeciesID].forms[formIndex];
                pokemonForm = formsObj.typeKey ? formsObj.typeKey : formsObj.name.toLowerCase().replace(/( mode)|( forme)/g, "");
            } catch (error) {
                // console.error(error)
            }

            if (pokemonSpeciesID > 2018) {
                // turns something like GALAR_FARFETCHD into FARFETCHD-GALAR, which is the correct pokemon identifier used by pokeapi          
                const splits = pokemonIdentifier.split('_');
                let newIdentifier = '';
                for (const i in splits) {
                    if (i > 0) {
                        newIdentifier += splits[i] + '-';
                    }
                }

                newIdentifier += splits[0];
                return pokemonForm ? (newIdentifier + '-' + pokemonForm) : newIdentifier
            } else {
                return pokemonForm ? (pokemonIdentifier + '-' + pokemonForm) : pokemonIdentifier
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



