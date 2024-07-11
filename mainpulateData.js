import weatherConditions from "./weatercode";
import {
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
    windSpeedUnit
} from './main'


async function manipulateDatatoday(city) { // this function is the main func that get the data from the api by calling getForecst by passing the name of the city as param
    try {
        const allWeatherData = await getForecast(city);
        const weatherConditionToday = weatherConditions[allWeatherData.maintenant.weather_code] //start to know the condition of the weateh according to the weather code
        //after this start to change th data that from the obj allWeatherData
        currentTemp.innerHTML = tempUnits == 'celsius' ? `<span >${allWeatherData.maintenant.temperature_2m}</span>°C` : `<span >${allWeatherData.maintenant.temperature_2m}</span>F`;
        cityPlace.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <path
    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
    />
    </svg>
    ${city} `
        condition.innerHTML = `${weatherConditionToday}`
        imageToday.innerHTML = `<img src="./public/assets/images/${weatherConditionToday}.png" alt="" />`
        wind.children[1].innerHTML = `${allWeatherData.maintenant.wind_speed_10m}<span> mph</span>`
        wind.children[2].children[0].style.transform = `rotate(${allWeatherData.maintenant.wind_direction_10m}deg)`;
        humidity.children[1].innerHTML = `${allWeatherData.maintenant.relative_humidity_2m}<span>%</span>`;
        console.log(allWeatherData.maintenant.visibility)
        visibility.children[1].innerHTML = `${Math.ceil((allWeatherData.maintenant.visibility) / 1609.34)}<span>miles</span>`
        root.style.setProperty('--width-bar', `${allWeatherData.maintenant.relative_humidity_2m}%`);
        pressure.children[1].innerHTML = `${allWeatherData.maintenant.pressure_msl}<span>mb</span>`;
        const weatherCode5days = allWeatherData.dataWeek.weather_code //condtions for the 5 days
        const { temperature_2m_max, temperature_2m_min } = allWeatherData.dataWeek
        currentDate.add(1, 'days');
        daysWeek.forEach((day, i) => {
            day.children[0].innerHTML = `${currentDate.format(' Do MMM YY')}`;//date
            let weatherConditionThisDAy = weatherConditions[weatherCode5days[i]]//image of condition
            day.children[1].setAttribute('src', `./public/assets/images/${weatherConditionThisDAy}.png`);
            const unit = tempUnits == 'celsius' ? 'C' : 'F'
            day.children[2].innerHTML = ` <span class="great">${temperature_2m_max[i]}${unit}</span> <span class="small">${temperature_2m_min[i]}${unit}</span>`
            currentDate.add(1, 'days');
        })
        currentDate.subtract(6, 'days')

    }
    catch {
        console.log('hello world')
    }

}
async function getForecast() {
    const { latitude, longitude } = objOfCordiantes;
    const urlForecast = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&temperature_unit=${tempUnits}&wind_speed_unit=${windSpeedUnit}&current=temperature_2m,pressure_msl,weather_code,wind_direction_10m,relative_humidity_2m,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min`;
    const response = await fetch(urlForecast);
    const data = await response.json();
    console.log(data)
    const allWeatherData = { maintenant: data.current, dataWeek: data.daily }
    return allWeatherData;
}
export default manipulateDatatoday