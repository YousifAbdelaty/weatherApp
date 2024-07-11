import { main, loaders, city, objOfCordiantes } from './main'
import manipulateDatatoday from './mainpulateData'
import delayONeSeconds from './delay';
import cityobj from './city';
async function getPosition() {   
    loaders.style.display = 'flex' 
    main.style.display = 'none'
    let cityfake = city
    cityfake = await new Promise( get => {
        navigator.geolocation.getCurrentPosition(position => {
            get(showPosition(position))
        })


    })
    cityobj.name = cityfake
    manipulateDatatoday(cityfake);
    await delayONeSeconds()
    main.style.display = 'flex'
    loaders.style.display = 'none'

}

async function showPosition(position) {  
    objOfCordiantes.latitude = position.coords.latitude;
    objOfCordiantes.longitude = position.coords.longitude;
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${objOfCordiantes.latitude}&lon=${objOfCordiantes.longitude}`);
    const data = await response.json();
    return data.address.town || data.address.state || data.address.country;
}
export default getPosition