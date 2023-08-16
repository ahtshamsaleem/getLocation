import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.btnShare = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click', this.onLocateUser.bind(this));
        this.btnShare.addEventListener('click', this.onSharePlace);
        addressForm.addEventListener('submit', this.onFindAddress.bind(this));
    }

    onSharePlace() {
        const sharedLinkInputEl = document.getElementById('share-link');
        if (!navigator.clipboard) {
            sharedLinkInputEl.select();
            return;
        }
        navigator.clipboard.writeText(sharedLinkInputEl.value)
        .then(() => alert(`Copied into Clipboard!`))
        .catch((err) => {
            console.log(err);
            sharedLinkInputEl.select();
        })
    }

    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
        
        this.btnShare.disabled = false;
        const sharedLinkInputEl = document.getElementById('share-link');
        sharedLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
        
    }

    onLocateUser() {
        const modal = new Modal('loading-modal-content');
        modal.show();
        navigator.geolocation.getCurrentPosition(async (successResult) => {
            const coodinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude
            }
            const address = await getAddressFromCoords(coodinates);
            modal.hide();
            this.selectPlace(coodinates, address);
        }, error => {modal.hide(); alert(`Couldn't fetch the location. Kindly enter your address manually.`)})
    }


    async onFindAddress(event) {
        event.preventDefault();

        const address = event.target.querySelector('input').value;
        if (!address || address.trim() === '') {
            alert('Invalid address entered!');
            return;
        }
        const modal = new Modal('loading-modal-content');
        modal.show();

        try {
            const coordinates = await getCoordsFromAddress(address);
            this.selectPlace(coordinates, address)
        }
        catch (error) {
            alert(error);
        }
        modal.hide();
        


    }
}


const placeFinder = new PlaceFinder();