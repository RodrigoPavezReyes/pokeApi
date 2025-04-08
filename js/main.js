const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")



let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
    .then((response) => response.json())
    .then((data)=> mostrarPokemon(data))
    
}


function mostrarPokemon(pokemon) {
    
        let tipos = pokemon.types.map(pokemon=> `<p class="tipo ${pokemon.type.name}">${pokemon.type.name}</p>`);
        tipos = tipos.join("");

        let pokeId = pokemon.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        }else if(pokeId.length === 2){
            pokeId = "0" + pokeId;
        }
        
        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML=`
                        <p class="pokemon-id-back">#${pokeId}</p>
                        <div class="pokemon-imagen">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default} " alt="${pokemon.name}">
                        </div>
                        <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${pokemon.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.height}</p>
                            <p class="stat">${pokemon.weight}kg</p>
                        </div>
                    </div>                
        `

        listaPokemon.append(div);
}


botonesHeader.forEach(boton => {
    boton.addEventListener("click", filtrarPokemon)
}); 

function filtrarPokemon(e) {
    const botonId = e.currentTarget.id;

    listaPokemon.innerHTML = "";
    
    for (let i = 1; i <= 151; i++){
        fetch(URL + i)
        .then((response) => response.json())
        .then(data =>{
            
            if(botonId ==="ver todos"){
                mostrarPokemon(data);
            }else{
                const tipos = data.types.map(type => type.type.name);
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data)
                }
            }
        })
    }
}