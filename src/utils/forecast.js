const request = require('request')

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d4d3e21834dc0401dd05b822574cedae&query=${lat},${long}&units=f`
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else{
            const current_temp = body.current
            callback(undefined, current_temp.weather_descriptions + ". It is currently " + current_temp.temperature + " degrees out. It feels like " + current_temp.feelslike + " degrees out. Humidity is " + current_temp.humidity + "%.")
        }    
    })
}

module.exports = forecast