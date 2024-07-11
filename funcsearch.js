
import { searchInput, searchPlace, main, loaders, objOfCordiantes, placesTosearch, city } from './main'
import manipulateDatatoday from './mainpulateData';
import delayONeSeconds from './delay';
import getCordinates from './getCoords';
import cityobj from './city';
let cityfake;
async function showcities() {
    cityfake = city
    cityfake = searchInput.value
    cityobj.name = cityfake;
    let citiesAfterSearch = await getCordinates(cityfake);
    if (placesTosearch.innerHTML == '') {
        citiesAfterSearch.forEach((cityAfterSearch) => {
            placesTosearch.innerHTML += `<div class="place" data-latitude=${cityAfterSearch.latitude} data-longitude=${cityAfterSearch.longitude}>
        ${cityAfterSearch.name}-${cityAfterSearch.country}
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            /></svg
        ></span>
        </div>`
        })
    } else {
        placesTosearch.innerHTML += ''
    }
    searchInput.value = ''
}
async function chooseSearch(e) {
    if (e.target.closest('.place')) {
        main.style.display = 'none';
        loaders.style.display = 'flex';
        objOfCordiantes.latitude = +(e.target.dataset.latitude);
        objOfCordiantes.longitude = +(e.target.dataset.longitude);
        manipulateDatatoday(cityfake);
        await delayONeSeconds();
        main.style.display = 'flex';
        loaders.style.display = 'none';
        placesTosearch.innerHTML = '';
        searchPlace.classList.remove("show");
    }
}
export { showcities, chooseSearch }

// dfasdfasdfa dfadfa