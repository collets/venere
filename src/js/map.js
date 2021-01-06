let map;

function initMap() {

  const windowWidth = window.innerWidth;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.388449, lng: 12.023803 },
    zoom: windowWidth > 900 ? 11 : 9,
    mapId: '243918c4ec14179c',
    gestureHandling: 'cooperative'
  });

  const ceremonyContent = `
    <span class="marker-title">Villa Giustinian Morosini</span><br>
    <span class="marker-address">via Luigi Mariutto 1, Mirano (VE)</span><br>
    <a class="marker-maps" href="https://goo.gl/maps/bawM8UeNonJRifUW9" target="_blank">Apri Google Maps</a>
  `;

  const ceremonyLocation = { lat: 45.49568417451411, lng: 12.111491741059437 };

  const ceremonyWindow = new google.maps.InfoWindow({
    content: ceremonyContent,
  });

  const ceremonyIcon = {
    // url: '../images/rings-wedding-solid.svg',
    url: '../images/rings-wedding-light.svg',
    scaledSize: new google.maps.Size(45, 45)
  }

  const ceremonyMarker = new google.maps.Marker({
    position: ceremonyLocation,
    map,
    title: "Villa Giustinian Morosini",
    icon: ceremonyIcon
  });

  ceremonyMarker.addListener("click", () => {
    ceremonyWindow.open(map, ceremonyMarker);
  });

  const partyContent = `
    <span class="marker-title">Castello di San Pelagio</span><br>
    <span class="marker-address">via S. Pelagio 50, Due Carrare (PD)</span><br>
    <a class="marker-maps" href="https://goo.gl/maps/x5p2w4j2zYU846rg7" target="_blank">Apri Google Maps</a>
  `;

  const partyLocation = { lat: 45.3143865519802, lng: 11.822028569892238 };

  const partyWindow = new google.maps.InfoWindow({
    content: partyContent,
  });

  const partyImage = {
    //   url: '../images/chess-rook-alt-solid.svg',
    url: '../images/chess-rook-light.svg',
    scaledSize: new google.maps.Size(45, 45)
  }

  const partyMarker = new google.maps.Marker({
    position: partyLocation,
    map,
    title: "Castello di San Pelagio",
    icon: partyImage
  });

  partyMarker.addListener("click", () => {
    partyWindow.open(map, partyMarker);
  });
}