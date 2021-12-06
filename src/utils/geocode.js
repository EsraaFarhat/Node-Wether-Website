const request = require("request");

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZXNyYWFmYXJoYXQiLCJhIjoiY2t1MDFldm96MDZwZTJwbzFmNTc5YjA2bCJ9.vhTY1zRxf5EmuQ9B-ud_jQ&limit=1`;

  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const longitude = response.body.features[0].center[0];
      const latitude = response.body.features[0].center[1];
      const location = response.body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
