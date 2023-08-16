const GOOGLE_API_KEY = 'AIzaSyAxJmlSP5sAWhgytC-1BUocKHnC842ySoE';



export async function getAddressFromCoords(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch the address!`);
    }

    const data = await response.json();

    const address = data.results[0].formatted_address;
    return address;
}

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch coordinates! Try Again');
    }
    const data = await response.json();

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}