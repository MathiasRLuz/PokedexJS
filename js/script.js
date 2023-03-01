const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const maxID = 1008;

// let é uma variavel
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    // await só funciona em funções assincronas, é necessário pq o fetch pode demorar
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json(); // para ler os dados do json providenciado pela API
        return data;
    }    
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    pokemonImage.style.display = 'block';
    pokemonImage.src = "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif"; //"./favicons/favicon-16x16.png"

    const data = await fetchPokemon(pokemon);
    if (data){
        if (data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']){            
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            searchPokemon = +data.id;
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        else if (data['sprites']['front_default']){            
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            searchPokemon = +data.id;
            pokemonImage.src = data['sprites']['front_default'];
        }
        else {
            pokemonImage.style.display = 'none';
            pokemonName.innerHTML = "Not found";
            pokemonNumber.innerHTML = "";
        }
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
    }
    input.value = '';
}

buttonNext.addEventListener('click',()=>{    
    if (searchPokemon<maxID){
        searchPokemon += 1;        
    }   
    else {
        searchPokemon = 1;
    }
    renderPokemon(searchPokemon.toString());
});

buttonPrev.addEventListener('click',()=>{    
    if (searchPokemon>1){
        searchPokemon -= 1;
    } 
    else {
        searchPokemon = maxID;
    }  
    renderPokemon(searchPokemon.toString());
});

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(input.value);    
});

renderPokemon(searchPokemon.toString());