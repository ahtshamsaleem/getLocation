import { Map } from './UI/Map';

class LoadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitle = document.querySelector('header h1');
        headerTitle.textContent = address;

    }
}

const url = new URL(location.href)
const queryParams = url.searchParams;

const lat = queryParams.get('lat');
const lng = queryParams.get('lng');

const coords = {
    lat: +lat,
    lng: +lng
}

const address = queryParams.get('address');


new LoadedPlace(coords, address)


