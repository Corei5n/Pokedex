
// Variables 
let searchfield = document.getElementById("site-search")

let searchbutton = document.getElementById("search-button")

let pokemonName = document.getElementById("pokemon-name")

let pokemonImage = document.getElementById("pokemon-image")

let pokemonType = document.getElementById("pokemon-type")

let dexNumber = document.getElementById("dex")

let pokemonId = document.getElementById("pokemon-id")

// Event listener for clicking 
searchbutton.addEventListener("click", function(){
    let searchvalue = searchfield.value.toLowerCase()
    
    async function searchpokemon(){
        // First API fetch 
        let url = "https://pokeapi.co/api/v2/pokemon/" + searchvalue
        let fetching = await fetch(url);
        let jsons = await fetching.json()
        console.log(jsons)
        pokemonName.textContent = jsons.name.charAt(0).toUpperCase() + jsons.name.slice(1)
        pokemonImage.src = jsons.sprites.front_default
        pokemonType.textContent = "Tipo: " + jsons.types.map(t => t.type.name).join("/")
        pokemonId.textContent = "Pokemon ID: " +  jsons.id


        // Second Fetch for description
        let speciesURL = "https://pokeapi.co/api/v2/pokemon-species/" + searchvalue 
        let fetchspecies = await fetch(speciesURL)
        let fetchjson = await fetchspecies.json()
        let entry = fetchjson.flavor_text_entries.find(e => e.language.name ==="es")
        dexNumber.textContent = entry ? "Descripcion de Dex: " + entry.flavor_text.replace(/\f/g," "): "No description found"

    }
     searchpokemon()

})



