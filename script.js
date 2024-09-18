let pokeData = [];
let mainContainer = document.getElementById('main-container');

async function getPokemonData(count) {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=0`);
    let data = await res.json();
    console.log(data.results);
    pokeData.push(...data.results); // flatten the array
    console.log(pokeData)
    displayData(pokeData);
}

async function displayData(arr) {
    mainContainer.innerHTML='';
    arr.forEach(async (element) => {
        let pokeDetails = await getUrlPoke(element.url);
        console.log(pokeDetails);

        let div1 = document.createElement('div');
        div1.setAttribute('class', 'flip-card');

        let div2 = document.createElement('div');
        div2.setAttribute('class', 'flip-card-inner');

        let div3 = document.createElement('div');
        div3.setAttribute('class', 'flip-card-front');

        let imgChar = document.createElement('img');
        imgChar.alt = "avatar"
        imgChar.src = pokeDetails.sprites.other.dream_world.front_default;
        div3.append(imgChar);


        let div4 = document.createElement('div');
        div4.setAttribute('class', 'flip-card-back');

        let h1 = document.createElement('h2');

        h1.innerText = element.name;

        let p1 = document.createElement('p');
        p1.innerText = pokeDetails.types[0].type.name;

        let p2 = document.createElement('p');
        p2.innerText = pokeDetails.base_experience;

        div4.append(h1, p1, p2);

        div2.append(div3, div4);
        div1.appendChild(div2);


        let loadMoreBtn = document.createElement('button');
        loadMoreBtn.textContent = "Load More";

        loadMoreBtn.addEventListener('click',()=>{
            let count = 20;
            getPokemonData(count+20);
            count+=20;

        })
        mainContainer.append(div1);
    });
}

async function getUrlPoke(url) {
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

getPokemonData(20);