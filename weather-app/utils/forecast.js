const request = require('request');

const forecast = (latitude, longitude, callback) => {

  const secretKey = '340d8d479002d5cd1588ac98f0ba0d21'
  const url = `https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}`
  
  request({url, json : true}, (error, {body}) => {
    if(error){
      callback('no internet', undefined);
    }else if(body.error){
      callback('wrong input!', undefined);
    }else{
      const degree = body.currently.temperature;
      const precipProbability = body.currently.precipProbability
      const foreCastData = `It is currently ${degree} degrees out. There is a ${precipProbability}% chance of rain.`
      callback(undefined, 
        // degree : response.body.currently.temperature,
        // precipProbability : response.body.currently.precipProbability,
        foreCastData
      )
    }
  })
}

module.exports = forecast;

