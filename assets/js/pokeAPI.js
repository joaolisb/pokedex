const pokeApi = {};


pokeApi.getEntry = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((pokes) => pokeApi.getTheThing(pokes, name));
};

pokeApi.getTheThing = (poke, name) => {
    const newSpecies = new SelectedPokemon();

    newSpecies.speciesName = poke.name;
    newSpecies.gender = poke.gender_rate;
    newSpecies.eggGroup = eggGrouper(poke.egg_groups);
    newSpecies.eggCycles = poke.hatch_counter;
    newSpecies.genus = genusFinder(poke.genera);

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url)
    .then((response) => response.json())
    .then((more) => pokeApi.moreThings(more,newSpecies));

    return newSpecies;
};

pokeApi.moreThings = (poke, species) => {
    species.dexNumber = poke.id;
    species.speciesName = poke.name;
    
    const types = poke.types.map((typeSlot) => typeSlot.type['name'].charAt(0).toUpperCase() + typeSlot.type['name'].substring(1));
    const [type] = types;

    species.types = types;
    species.mainType = type;

    species.image = poke.sprites.other['official-artwork'].front_default;
    species.height = poke.height;
    species.weight = poke.weight;
    species.hp = poke.stats[0].base_stat;
    species.attack = poke.stats[1].base_stat;
    species.defense = poke.stats[2].base_stat;
    species.spatk = poke.stats[3].base_stat;
    species.spdef = poke.stats[4].base_stat;
    species.speed = poke.stats[5].base_stat;

    const abilities = poke.abilities.map((abSlot) => abSlot.ability['name'].replace(/-/g, ' '));

    species.abilities = abilities;

    document.getElementById('replace-genus').innerHTML = species.eggGroup;
           document.getElementById('dexPage').innerHTML =
    `<div class="species-data">
           <h1 class="cap">${species.speciesName}</h1>
           <img src="${species.image}" alt="${species.speciesName}" width="70%">
       </div>
       <div class="pokedex-data">
           <h2>Pokédex data</h2>
           <table class="reg-table">
               <tbody>
                   <tr>
                       <td class="td-left">Species</td>
                       <td class="td-right" id="replace-genus">${species.genus}</td>
                   </tr>
                   <tr>
                       <td class="td-left">Dex Number</td>
                       <td class="td-right">#${species.dexNumber}</td>
                   </tr>
                   <tr>
                       <td class="td-left">Type</td>
                       <td class="td-right">${species.types.map((type) => `<span class="type-onDex type${type}">${type}</span>`).join(' ')}</td>
                   </tr>
                   <tr>
                       <td class="td-left">Height</td>
                       <td class="td-right">${species.height/10}m</td>
                   </tr>
                   <tr>
                       <td class="td-left">Weight</td>
                       <td class="td-right">${species.weight/10}kg</td>
                   </tr>
                   <tr>
                       <td class="td-left">Abilities</td>
                       <td class="td-right cap">${species.abilities.map((ability) => ability).join(' / ')}</td>
                   </tr>
               </tbody>
           </table>
       </div>
       <div class="breeding-data">
           <h2>Breeding</h2>
           <table class="reg-table" id="replace-breeding">
               <tbody>
                   <tr>
                       <td class="td-left">Gender ratio</td>
                       <td class="td-right"><span>${genderReveal(species.gender)}</span></td>
                   </tr>
                   <tr>
                       <td class="td-left">Egg group</td>
                       <td class="td-right cap">${species.eggGroup.map((group) => group).join(' / ')}</td>
                   </tr>
                   <tr>
                       <td class="td-left">Egg cycles</td>
                       <td class="td-right">${species.eggCycles} (~ ${species.eggCycles*256} steps)</td>
                   </tr>
               </tbody>
           </table>
       </div>
       <div class="stats-data">
           <h2>Base stats</h2>
           <table class="stat-table">
               <!--HP====================================-->
               <tr>
                   <td class="td-left td-title">HP</td>
                   <td></td>
               </tr>
               <tr>
                   <td class="td-left">${species.hp}</td>
                   <td class="back-progress" style="background-color: #ffa3a3;"><div class="progress" style="background-color: #ff0000; color: #ff0000; width: calc(100% * ${species.hp}/255);">${species.hp}</div></td>
               </tr>
               <!--Attack====================================-->
               <tr>
                   <td class="td-left td-title">Attack</td>
                   <td></td>
               </tr>
               <tr>
                   <td class="td-left">${species.attack}</td>
                   <td class="back-progress" style="background-color: #ffcda9;"><div class="progress" style="background-color: #f08030; color: #f08030; width: calc(100% * ${species.attack}/255);">${species.attack}</div></td>
               </tr>
               <!--Defense====================================-->
               <tr>
                   <td class="td-left td-title">Defense</td>
                   <td></td>
               </tr>
               <tr>
                   <td class="td-left">${species.defense}</td>
                   <td class="back-progress" style="background-color: #fff2c0;"><div class="progress" style="background-color: #f8d030; color: #f8d030; width: calc(100% * ${species.defense}/255);">${species.defense}</div></td>
               </tr>
               <!--Sp. Atk====================================-->
               <tr>
                   <td class="td-left td-title">Sp. Atk</td>
                   <td></td>
               </tr>
               <tr>
                   <td class="td-left">${species.spatk}</td>
                   <td class="back-progress" style="background-color: #ccdbff;"><div class="progress" style="background-color: #6890f0; color: #6890f0; width: calc(100% * ${species.spatk}/255);">${species.spatk}</div></td>
               </tr>
               <!--Sp. Def====================================-->
               <tr>
                   <td class="td-left td-title">Sp. Def</td>
                   <td></td>
               </tr>
               <tr>
                   <td class="td-left">${species.spdef}</td>
                   <td class="back-progress" style="background-color: #d5ffc0;"><div class="progress" style="background-color: #78c850; color: #78c850; width: calc(100% * ${species.spdef}/255);">${species.spdef}</div></td>
               </tr>
               <!--Speed====================================-->
               <tr>
                   <td class="td-left td-title">Speed</td>
                   <td></td>
               </tr>
               <tr>
                   <td class="td-left">${species.speed}</td>
                   <td class="back-progress" style="background-color: #ffc7d7;"><div class="progress" style="background-color: #f85888; color: #f85888; width: calc(100% * ${species.speed}/255);">${species.speed}</div></td>
               </tr>
           </table>
       </div>
       <div class="evolution-data">
           <!--Coming soon!-->
    </div>`

    return species;
}


genderReveal = (gender) => {
    switch(gender) {
        case 0:
            return "100% male";
            break;
        case 1:
            return "87.5% male, 12.5% female";
            break;
        case 2:
            return "75% male, 25% female";
            break;
        case 4:
            return "50% male, 50% female";
            break;
        case 6:
            return "25% male, 75% female";
            break;
        case 7:
            return "12.5% male, 87.5% female";
            break;
        case 8:
            return "100% female";
            break;
        case -1:
            return "Genderless";
            break;
        default:
            break;
    }
}

function genusFinder(genera) {
    for(let i = 0; i < genera.length; i++) {
        if(genera[i].language.name == "en") {
            return genera[i].genus;
        }
    }
}

function eggGrouper(group) {
    let groups = [];
    for(let i = 0; i < group.length; i++) {
        groups[i] = group[i].name;
        if(groups[i] == 'plant') {
            groups[i] = 'grass';
        } else if(groups[i] == 'water1') {
            groups[i] = 'water 1';
        } else if(groups[i] == 'water2') {
            groups[i] = 'water 2';
        } else if(groups[i] == 'water3') {
            groups[i] = 'water 3';
        } else if(groups[i] == 'ground') {
            groups[i] = 'field';
        } else if(groups[i] == 'humanshape') {
            groups[i] = 'human-like';
        } else if(groups[i] == 'indeterminate') {
            groups[i] = 'amorphous';
        } else if(groups[i] == 'no-eggs') {
            groups[i] = 'undiscovered';
        }
    }
    return groups;
}





//Filling the List
pokeApi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertApiToPoke);
}

function convertApiToPoke(pkmnDetail) {
    const species = new Pokemon();
    species.dexNumber = pkmnDetail.id;
    species.speciesName = pkmnDetail.name;
    
    const types = pkmnDetail.types.map((typeSlot) => typeSlot.type['name'].charAt(0).toUpperCase() + typeSlot.type['name'].substring(1));
    const [type] = types;

    species.types = types;
    species.mainType = type;
    
    species.image = pkmnDetail.sprites.other['official-artwork'].front_default;

    return species;
}

pokeApi.getPokemon = (offset = 0, limit = 12) => {
    const mainUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(mainUrl)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pkmn) => pkmn.map(pokeApi.getDetails))
        .then((detailRequests) => Promise.all(detailRequests))
};