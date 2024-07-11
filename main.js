import moment from 'moment';
import manipulateDatatoday from './mainpulateData';
import getPosition from './geturlocatoin';
import delayONeSeconds from './delay';
import getCordinates from './getCoords';
import cityobj from './city';
import { showcities, chooseSearch } from './funcsearch'
let currentDate = moment();
let city = '';
let tempUnits = 'celsius';
const windSpeedUnit = 'mph'
const fahrenheit = document.querySelector(".fahrenheit");
const celsius = document.querySelector(".celsius");
const root = document.documentElement;
const btnSearch = document.querySelector(".btn-search");
const searchPlace = document.querySelector(".search-place");
const closeBtn = document.querySelector(".close");
const currentTemp = document.querySelector('#currentTemp');
const cityPlace = document.querySelector('#cityPlace');
const condition = document.querySelector("#condition");
const imageToday = document.querySelector(".image");
const dateToday = document.querySelector("#dateToday");
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const visibility = document.querySelector('#visibility');
const pressure = document.querySelector('#pressure');
const daysWeek = document.querySelectorAll('.card.day');
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn")
const placesTosearch = document.querySelector(".places");
const getLocationButton = document.querySelector("#getYourLocation");
const main = document.querySelector("main");
const loaders = document.querySelector(".loaders")
const objOfCordiantes = {}
getPosition();
dateToday.innerHTML = `${moment().format('MMM Do YY')}`
getLocationButton.addEventListener("click", getPosition)
searchInput.addEventListener('input', () => {
    placesTosearch.innerHTML = ''
})
searchBtn.addEventListener('click', showcities)
placesTosearch.addEventListener('click', chooseSearch)
fahrenheit.addEventListener("click", () => {
    tempUnits = 'fahrenheit'
    manipulateDatatoday(cityobj.name)
})
celsius.addEventListener("click", () => {
    tempUnits = 'celsius'
    manipulateDatatoday(cityobj.name)
})

btnSearch.addEventListener('click', () => {
    searchPlace.classList.add("show");
});
closeBtn.addEventListener('click', () => {
    searchPlace.classList.remove("show");
});
export {
    currentTemp,
    cityPlace,
    condition,
    imageToday,
    wind,
    humidity,
    visibility,
    root,
    pressure,
    currentDate,
    daysWeek,
    objOfCordiantes,
    tempUnits,
    windSpeedUnit, main, loaders, city, placesTosearch, searchInput, searchPlace
}