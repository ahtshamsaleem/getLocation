export class Map {
  constructor(coords) {
    this.render(coords);
  }

  render(coordinates) {
    const mapEl = document.getElementById("map");
    const map = new google.maps.Map(mapEl, { center: coordinates, zoom: 16 });
    console.log(map)

    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }
}
