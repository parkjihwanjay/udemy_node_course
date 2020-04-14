const request = require('request');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const location = process.argv[2];

if(!location){
  console.log('please provide your location');
  return;
}

geocode(location, (error, {langitude, longitude, placeName}) => {

  if(error)
    return console.log(error)

  forecast(langitude, longitude, (error, forecastData) => {
    if(error){
      return console.log(error);
    }

    console.log(placeName);
    console.log(forecastData);
  })
})






