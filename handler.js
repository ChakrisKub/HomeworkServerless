"use strict";
const axios = require("axios");

const APIKey = "1d8c7544536c64f11d830bdcfaa39850";

module.exports.weatherApp = async event => {
  try {
    const country = event.queryStringParameters?.country;
    if (!country)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Country name is required",
        }),
      };
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}`
    );

    const celsius = (Math.round((data.main.temp - 273.15) * 100) / 100).toFixed(
      2
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        country: data.name,
        coords: data.coords,
        temperatureKelvin: `${data.main.temp} Kelvin`,
        temperatureCelsius: `${celsius} Celsius`,
        weatherDescription: data.weather[0].description,
      }),
    };
  } catch (error) {
    return {
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
