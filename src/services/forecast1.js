const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&units=metric&appid=40c1199a5102c16ba5be5a068ea5b951`
    
    request({url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect with weather service.', undefined)
        }else if(response.body.cod){
            callback('Location not found, try to search valid location!', undefined);
        }else{
            callback(undefined,response.body.current)
        }
    })
}
module.exports = forecast