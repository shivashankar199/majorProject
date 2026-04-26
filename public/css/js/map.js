
    mapboxgl.accessToken =mapToken;
    
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: JSON.parse(coordinates), // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 10 // starting zoom
    });

    const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(JSON.parse(coordinates))
  .setPopup(
    new mapboxgl.Popup().setHTML("<h6>Exact Location will be provided after booking</h6>")
  )
  .addTo(map);



// mapboxgl.accessToken = mapToken;

// const coords = listing.geometry?.coordinates || [78.4867, 17.3850];

// const map = new mapboxgl.Map({
//   container: 'map',
//   center: coords,
//   zoom: 9
// });

// const popup = new mapboxgl.Popup()
//   .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`);

// new mapboxgl.Marker({ color: "red" })
//   .setLngLat(coords)
//   .setPopup(popup)
//   .addTo(map);
    