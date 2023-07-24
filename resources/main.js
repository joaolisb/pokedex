let dexList = document.getElementById("pkmn-list");
let modalbg = document.getElementById("modal-bg");
let entrybg = document.getElementById("entry-bg");
let entrypage = document.getElementById("dex-entry");
let about = document.getElementById("about");
let species;

createFilters();

const fetchPoke = () => {
	const promises = [];
	
	
	for(let i = 650; i <= 721; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		
		promises.push(fetch(url).then((res) => res.json()));
	}
		
	Promise.all(promises).then((results) => {
		const pokemon = results.map(data => ({
			id: data.id,
			name: data.name.replace('-male', '').replace('-average', '').replace('-shield', '').replace('-50', ''), //In case of some extra-named Pokémon
			artwork: data.sprites.other["official-artwork"]["front_default"],
			sprite: data.sprites.versions["generation-v"]["black-white"]["front_default"],
			types: data.types.map((item) => item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)),
			height: data.height/10,
			weight: data.weight/10,
			abilities: data.abilities.map((item) => item.ability.name.charAt(0).toUpperCase()+item.ability.name.slice(1).replace(/-/g, ' ')),
			stats: data.stats.map((item) => item["base_stat"]),
		}))
		addPoke(pokemon);
	})
}

fetchPoke();

function addPoke(x) {
	for (let i = 0; i < x.length; i++) {
		let pokemon = document.createElement("li");
		pokemon.id = x[i].id;
		pokemon.innerHTML = `<span class="poke-number">#${x[i].id}</span><img src="${x[i].sprite}" /><span class="poke-name">${x[i]["name"]}</span><ol class="types">${x[i].types.map((type) => `<li class="type type-${type}">${type}</li>`).join('')}</ol>`;
		pokemon.classList.add("pkmn-item");
		pokemon.classList.add(`main-${x[i].types[0]}`);
		pokemon.setAttribute("onclick","openEntry(this.id, this.getAttribute('data-name'), this.getAttribute('data-types'), this.getAttribute('data-pic'), this.getAttribute('data-height'), this.getAttribute('data-weight'), this.getAttribute('data-abilities'), this.getAttribute('data-stats'))");
		pokemon.setAttribute("data-name", x[i].name);
		pokemon.setAttribute("data-types", x[i].types);
		pokemon.setAttribute("data-pic", x[i].artwork);
		pokemon.setAttribute("data-height", x[i].height);
		pokemon.setAttribute("data-weight", x[i].weight);
		pokemon.setAttribute("data-abilities", x[i].abilities);
		pokemon.setAttribute("data-stats", x[i].stats);
		
		dexList.append(pokemon);
	}
}

function getGenera(x, a, b) {
	
		
	let species = fetch(`https://pokeapi.co/api/v2/pokemon-species/${x}`, {
		method: 'GET',
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		entrybg.innerHTML = a + data.genera[7].genus + b;
		modalbg.style.display = "flex";
		entrybg.style.display = "flex";
	});
}


function openEntry(id, name, types, artwork, height, weight, abilities, stats) {
	
	const arrTypes = types.split(',');
	const arrAbilities = abilities.split(',');
	const arrStats = stats.split(',');
	
	let newHTMLone = `<div id="dex-entry" class="entry-${arrTypes[0]}">
						<button id="close-btn" onclick="closeModal()"></button>
						<img class="picture-day" src="${artwork}" />
						<button id="poke-cry" onclick="playCry('${name}')"><i class="fa fa-volume-up" aria-hidden="true"></i></button>
						<div class="info">
						<h2 class="entry-name">${name}<span class="entry-number"> #${id}</span></h2>
						<ol class="no-list entry-types">${arrTypes.map((type) => `<li class="type-onDex type-${type}">${type}</li>`).join('')}</ol>
						<table class="specs-table">
							<tbody>
								<tr class="sub-title">
									<td>Species</td>
									<td>Height</td>
									<td>Weight</td>
								</tr>
								<tr>
									<td>`
									
	let newHTMLtwo = `</td>
									<td>${height}m</td>
									<td>${weight}kg</td>
								</tr>
							</tbody>
						</table>
						<h4 class="sub-title" style="margin-top:30px">Abilities</h4>
						<ol class="no-list abilities">${arrAbilities.map((ability) => `<li>${ability}</li>`).join('')}</ol>
						<table class="stats-table">
							<tbody>
								<tr class="sub-title">
									<td>Stats</td>
								</tr>
								<tr>
									<td>HP</td>
									<td class="stat-bar" style="background-color: #ffa3a3;"><div class="stat-line" style="background-color: #ff0000; color: #ff0000; width: calc(97.5% * ${arrStats[0]}/255);"></div></td>
									<td>${arrStats[0]}</td>
								</tr>
								<tr>
									<td>Attack</td>
									<td class="stat-bar" style="background-color: #ffcda9;"><div class="stat-line" style="background-color: #f08030; color: #f08030; width: calc(100% * ${arrStats[1]}/255);"></div></td>
									<td>${arrStats[1]}</td>
								</tr>
								<tr>
									<td>Defense</td>
									<td class="stat-bar" style="background-color: #fff2c0;"><div class="stat-line" style="background-color: #f8d030; color: #f8d030; width: calc(100% * ${arrStats[2]}/255);"></div></td>
									<td>${arrStats[2]}</td>
								</tr>
								<tr>
									<td>Sp. Attack</td>
									<td class="stat-bar" style="background-color: #ccdbff;"><div class="stat-line" style="background-color: #6890f0; color: #6890f0; width: calc(100% * ${arrStats[3]}/255);"></div></td>
									<td>${arrStats[3]}</td>
								</tr>
								<tr>
									<td>Sp. Defense</td>
									<td class="stat-bar" style="background-color: #d5ffc0;"><div class="stat-line" style="background-color: #78c850; color: #78c850; width: calc(100% * ${arrStats[4]}/255);"></div></td>
									<td>${arrStats[4]}</td>
								</tr>
								<tr>
									<td>Speed</td>
									<td class="stat-bar" style="background-color: #ffc7d7;"><div class="stat-line" style="background-color: #f85888; color: #f85888; width: calc(100% * ${arrStats[5]}/255);"></div></td>
									<td>${arrStats[5]}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>`;

	getGenera(id, newHTMLone, newHTMLtwo)
}

function closeModal() {
	modalbg.style.display = "none";
	entrybg.style.display = "none";
	about.style.display = "none";
}

function openAbout() {	
	modalbg.style.display = "flex";
	about.style.display = "block";
}

function playCry(name) {
	let cry = document.getElementById("poke-cry");
	let audio = new Audio(`files/cries/${name}.mp3`);
	
	cry.style.color = "#b80b0b";
	cry.style.borderStyle = "inset"
	
	audio.volume = 0.2;
	audio.play();
	audio.addEventListener("ended", (event) => {
		cry.style.color = "#121212";
		cry.style.borderStyle = "outset"
	});
}



let activeType = "None";
let items = document.getElementsByClassName("pkmn-item");
let fbtn = document.getElementsByClassName("type-filter");

function filterType(type) {	
	if(activeType == type || type == "None") {
		for(let i = 0; i < items.length; i++) {
			items[i].style.display = "flex";
		}
		activeType = "None"
	} else {
		for(let i = 0; i < items.length;i++) {
			if(items[i].getAttribute("data-types").includes(type)) {
				items[i].style.display = "flex";
			} else {
				items[i].style.display = "none";
			}
		}
		activeType = type;
	}

	for(let i = 0; i < fbtn.length; i++) {
		if(fbtn[i].id.includes(activeType)) {
			fbtn[i].style.outline = "3px #c41f1f solid"
			if(activeType == "Fighting") {
				fbtn[i].style.outline = "3px #3931de solid"
			}
		} else {
			fbtn[i].style.outline = "none"
		}
	}
}

function searchPoke() {
	let target = document.getElementById("search-bar").value.toLowerCase();
	
		if(target == "") {
		for(let i = 0; i < items.length; i++) {
			items[i].style.display = "flex";
		}
	} else {
		for(let i = 0; i < items.length;i++) {
			if(items[i].getAttribute("data-name").includes(target)) {
				items[i].style.display = "flex";
			} else {
				items[i].style.display = "none";
			}
		}
	}
	
	for(let i = 0; i < fbtn.length; i++) {
		fbtn[i].style.outline = "none"
	}
}

function resetFilters() {
	for(let i = 0; i < items.length; i++) {
		items[i].style.display = "flex";
	}
	
	for(let i = 0; i < fbtn.length; i++) {
		fbtn[i].style.outline = "none"
	}
	
	document.getElementById("search-bar").value = "";
	document.getElementById("filter-all").value = "None";
}

function createFilters() {
	const types = ["Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric", "Ground", "Psychic", "Rock", "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];
	
	for(let i = 0; i < types.length; i++) {
		document.getElementById("filter-list").innerHTML += `<img id="filter-${types[i]}" class="type-filter filter-selected" src="files/type-icons/${types[i]}.png" alt="${types[i]}" title="Filter by ${types[i]} Types" onclick="filterType(this.alt)" />`;
		document.getElementById("filter-all").innerHTML += `<option id="option-${types[i]}" value="${types[i]}">${types[i]}</option>`
	}	 
}