const request = require('request');

const geocode = (address, callback) => {
  const access_token = 'pk.eyJ1IjoiY2M2NjU2IiwiYSI6ImNrMWtqM2FwczJjZnIzY212MHMxcGUxdDkifQ.LQvt2IRlVj13EwIAoxU5mw'
  
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token}&limit=1`;

  request({url, json : true}, (error, {body}) => {
    if(error){
      callback('no internet', undefined);
    } else if(!body.features.length){
      callback('wrong input!', undefined);
    } else{
      callback(undefined, {
        langitude : body.features[0].center[1],
        longitude : body.features[0].center[0],
        placeName : body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode;