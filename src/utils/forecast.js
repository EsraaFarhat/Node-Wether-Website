const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=90b4fd8cf4bb6109bd9ef45b073cf35d&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. It's currently ${response.body.current.temperature} degrees outside. It feels like ${response.body.current.feelslike} degrees outside.`
      );
    }
  });
};

module.exports = forecast;
