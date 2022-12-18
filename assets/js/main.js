let offset = 0;
const limit = 12;
const maxNumber = 144;
const listagem = document.getElementById('list-poke');
const loadButton = document.getElementById('loadMore');

function loadPokes(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map((pokemon) => `<li id="id-${pokemon.speciesName}" class="pokemon mainType${pokemon.mainType}" onClick="loadEntry(this.id)">
        <span class="number">#${pokemon.dexNumber}</span>
        <span class="name">${pokemon.speciesName}</span>
        <div class="detail">
        <ol class="types">${pokemon.types.map((type) => `<li class="type type${type}">${type}</li>`).join('')}</ol>
        <img src="${pokemon.image}" alt="${pokemon.speciesName}">
        </div>
        </li>`);
        listagem.innerHTML += newHtml.join('');
    });
}

loadPokes(offset, limit);

loadButton.addEventListener('click', () => {
    offset += limit;
    if(offset == 144) {
        loadPokes(offset, 7);
        loadButton.parentElement.removeChild(loadButton);
    } else {
        loadPokes(offset, limit);
    }
    
})

function loadEntry(speciesId) {
    const species = speciesId.slice(3);

    pokeApi.getEntry(species)
}

