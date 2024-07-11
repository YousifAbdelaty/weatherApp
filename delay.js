function delayONeSeconds() {  // this function to make like effect that wait loaders until the data fetch from the api 
    return new Promise((resolve,) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}
export default delayONeSeconds;