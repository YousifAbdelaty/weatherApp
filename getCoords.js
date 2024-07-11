async function getCordinates(city) {
    const urlCordinates = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`
    const response = await fetch(urlCordinates)
    const data = await response.json()
    return data.results;
}
export default getCordinates;