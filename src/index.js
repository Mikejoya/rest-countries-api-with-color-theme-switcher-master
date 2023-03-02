console.log('Hola hermoso mundo...');

const darkMode = document.getElementById('dark');
const body = document.querySelector('body');
const textLabels = document.querySelectorAll('p, h1, h2, span, li');

console.log(darkMode);

let darkModeEnabled = false;

darkMode.addEventListener('click', ()=> {
    console.log('Cambio de colores');
    if(darkModeEnabled) {
        body.style.backgroundColor = 'var(--Very-Light--Gray)';
        body.style.color = 'var(--Very-Dark--Blue-1)';
        inputValue.style.backgroundColor = 'var(--Very-Light--Gray)';
        btnFilter.style.backgroundColor = 'var(--Very-light--Gray)';
        btnFilter.style.color = 'var(--Very-Dark--Blue-1)';
        filterOptions.style.backgroundColor = 'var(--White)';
        back.style.backgroundColor = 'var(--Very-light--Gray)';
        back.style.color = 'var(--Very-Dark--Blue-1)';
        darkModeEnabled = false;
    }else {
        body.style.backgroundColor = 'var(--Very-Dark--Blue)';
        body.style.color = 'white';
        inputValue.style.backgroundColor = 'var(--Very-Dark--Blue)';
        btnFilter.style.backgroundColor = 'var(--Very-Dark--Blue)';
        btnFilter.style.color = 'white';
        filterOptions.style.backgroundColor = 'var(--Very-Dark--Blue)';
        back.style.backgroundColor = 'var(--Very-Dark--Blue)';
        back.style.color = 'var(--White)';
        darkModeEnabled = true;
    }
});

async function fetchCountries(){
    try{
        const response = await fetch('../data/data.json');
        const data = await response.json();
        console.log(data[0].borders);
        return data;
    }catch(err){
        console.log('Esta llamada no funciona...');
    }
}
//console.log(fetchCountries());
const allCountries = document.querySelector('.container-country');

const lazyLoader = new IntersectionObserver(entris =>{
    entris.forEach(entri =>{
        if(entri.isIntersecting){
            const url = entri.target.getAttribute('data-img');
            entri.target.setAttribute('src', url);
        }
    });
});

function createCountry(data, countries, {lazyLoad = false, clean = true} = {}) {
    
    if(clean){
        while(countries.firstChild && countries.firstChild){
            countries.removeChild(countries.firstChild);
        }
    }
    data.forEach((country) => {
        
        const article = document.createElement('article');
        article.classList.add('article-country');
        
        const img = document.createElement('img');
        img.setAttribute(
            lazyLoad ? "data-img" : 'src' , country.flags.png);
        const div = document.createElement('div');
        div.setAttribute('class', 'info-country');
        const h2 = document.createElement('h2');
        h2.innerText = country.name;
        const population = document.createElement('p');
        population.textContent = 'Population:';
        const spanPopulation = document.createElement('span');
        spanPopulation.innerText = country.population;
        const region = document.createElement('p');
        region.textContent = 'Region:';
        const spanRegion = document.createElement('span');
        spanRegion.innerText = country.region;
        const capital = document.createElement('p');
        capital.textContent = 'Capital:';
        const spanCapital = document.createElement('span');
        spanCapital.innerText = country.capital;
        
        article.appendChild(img);
        article.appendChild(div);
        div.appendChild(h2);
        div.appendChild(population);
        population.appendChild(spanPopulation);
        div.appendChild(region);
        region.appendChild(spanRegion);
        div.appendChild(capital);
        capital.appendChild(spanCapital);
        countries.appendChild(article);

        article.addEventListener('click', ()=>{
            viewCountry(country.alpha3Code, country);
            sectionHome.classList.add('inactive');
            sectionInfoCountry.classList.remove('inactive');

            console.log(country.alpha3Code, country);
        });

        if(lazyLoad){
            lazyLoader.observe(img);
        }

    });
}

async function loadCountries(){
    const data = await fetchCountries();
    createCountry(data, allCountries, { lazyLoad: true});
    filterContinents(data,continents);

    inputValue.addEventListener('input', ()=> {
        searchCountry(data);
    });
}

loadCountries();

const inputValue = document.querySelector('#search');
function searchCountry(data) {
    const searchValue = inputValue.value;
    let filteredCountries = data.filter(country => {
        return country.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(filteredCountries);
    
    createCountry(filteredCountries, allCountries);
}


const btnFilter = document.querySelector('.btn-filter--country');
const filterOptions = document.querySelector('.filter-country');

btnFilter.addEventListener('click', (e)=>{
    e.stopPropagation();

    filterOptions.classList.toggle('inactive');
    filterOptions.style.position = 'absolute';
});

document.addEventListener('click', (e) => {
  if (!filterOptions.classList.contains('inactive') && e.target !== btnFilter) {
    filterOptions.classList.add('inactive');
  }
});

const continents = document.querySelectorAll('#continents');
console.log(continents);

function filterContinents(data, continent){
    continent.forEach((element)=>{
        console.log(element);
        element.addEventListener('click',(e)=>{
            const worldContinent = e.target.dataset.cultural;
            const listRegion = data.filter(count => count.region === worldContinent);
            console.log(worldContinent);
            console.log(listRegion);
            
            createCountry(listRegion, allCountries);
        });
    });
}
/*------------------------- page info country ------------------------------*/
const containerInfoCountry = document.querySelector('.container-info--each_country');

function viewCountry(id, country, {clean = true} = {}) {
    window.location.hash = `#country=${id}`;
    
    if(clean){
        while(containerInfoCountry.firstChild && containerInfoCountry.firstChild){
            containerInfoCountry.removeChild(containerInfoCountry.firstChild);
        }
    }
    
    const img = document.createElement('img');
    img.src = country.flags.svg;
    const article = document.createElement('article');
    article.classList.add('detailed-country--info');
    const h2 = document.createElement('h2');
    h2.textContent = country.name;
    const divFirstInfo = document.createElement('div');
    divFirstInfo.classList.add('first-info', 'text');
    const pName = document.createElement('p');
    pName.textContent = 'Native name:';
    const spanName = document.createElement('span');
    spanName.textContent = country.nativeName;
    
    const pPopulation = document.createElement('p');
    pPopulation.textContent = 'Population:';
    const spanPopulation = document.createElement('span');
    spanPopulation.textContent = country.population;
    const pRegion = document.createElement('p');
    pRegion.textContent = 'Region:';
    const spanRegion = document.createElement('span');
    spanRegion.textContent = country.region;
    const pSubRegion = document.createElement('p');
    pSubRegion.textContent = 'Sub Region:';
    const spanSubRegion = document.createElement('span');
    spanSubRegion.textContent = country.subregion;
    const pCapital = document.createElement('p');
    pCapital.textContent = 'Capital:';
    const spanCapital = document.createElement('span');
    spanCapital.textContent = country.capital;
    const divSecondInfo = document.createElement('div');
    divSecondInfo.classList.add('second-info', 'text');
    const pTopLevelDonain = document.createElement('p');
    pTopLevelDonain.textContent = 'Top Level Donain:';
    const spanTopLevelDomain = document.createElement('span');
    spanTopLevelDomain.textContent = country.topLevelDomain;
    const pCurrencies = document.createElement('p');
    pCurrencies.textContent = 'Currencies:';
    const spanCurrencies = document.createElement('span');
    spanCurrencies.textContent = country.currencies[0].name;
    const pLenguges = document.createElement('p');
    pLenguges.textContent = 'Lenguages:';
    const spanLanguages = document.createElement('span');
    spanLanguages.textContent = `${country.languages.map(language => language.name).join(', ')}`;
    const divThirdInfo = document.createElement('div');
    divThirdInfo.classList.add('third-info', 'text');
    divThirdInfo.setAttribute('id', 'third-info');
    const h2BorderCountries = document.createElement('h2');
    h2BorderCountries.textContent = 'Border countries: ';
    divThirdInfo.appendChild(h2BorderCountries);
    if(country.borders){
        const borderCountries = document.createElement('div');
        borderCountries.classList.add('border-countries');
        for(let i = 0; i < country.borders.length; i++){
            const btn = document.createElement('button');
            btn.classList.add('btn-country');
            btn.textContent = country.borders[i];
            
            borderCountries.appendChild(btn);
        }
        divThirdInfo.appendChild(borderCountries);
    }
    
    containerInfoCountry.appendChild(img);
    article.appendChild(h2);
    article.appendChild(divFirstInfo);
    
    divFirstInfo.appendChild(pName);
    divFirstInfo.appendChild(pPopulation);
    divFirstInfo.appendChild(pRegion);
    divFirstInfo.appendChild(pSubRegion);
    divFirstInfo.appendChild(pCapital);
    pName.appendChild(spanName);
    pPopulation.appendChild(spanPopulation);
    pRegion.appendChild(spanRegion);
    pSubRegion.appendChild(spanSubRegion);
    pCapital.appendChild(spanCapital);
    
    article.appendChild(divSecondInfo);
    divSecondInfo.appendChild(pTopLevelDonain);
    divSecondInfo.appendChild(pCurrencies);
    divSecondInfo.appendChild(pLenguges);
    pTopLevelDonain.appendChild(spanTopLevelDomain);
    pCurrencies.appendChild(spanCurrencies);
    pLenguges.appendChild(spanLanguages);
    
    article.appendChild(divThirdInfo);
    
    containerInfoCountry.appendChild(article);

}


const back = document.getElementById('btn-back--home');

back.addEventListener('click', () => {
    window.history.back();
    home();
    console.log('si funciono');
});

const sectionHome = document.querySelector('.home');
const sectionInfoCountry = document.querySelector('.countryes');
function home(){
    sectionHome.classList.remove('inactive');
    sectionInfoCountry.classList.add('inactive');

}
