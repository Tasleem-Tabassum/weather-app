const { response } = require('express')
const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGFzbGVlbXRtIiwiYSI6ImNsOXo5b21mNTBjcHAzb3A4ZW1pZHYzMmoifQ.hlxNUSmKrgJCYrZdev-Fbg&limit=1`
    request({ url, json : true }, (error, { body } = {}) => {
        if(error){
            callback('Unable to fetch coordinates!', undefined || '')
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try proper location name!', undefined || '')
        } 
        else{
            callback(undefined || '', {
                latitude : body.features[0].center[1], 
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
            //console.log(latitude, longitute)
        }
    })
}

module.exports = geoCode