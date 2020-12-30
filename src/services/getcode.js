const request = require('request')
const getcode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=pk.eyJ1IjoidGVjaG5pY2FscmVmZmVyIiwiYSI6ImNraXgyeHd3NzBqbjkyeHBhY28zMW5jbnMifQ.mWCcbo9y0X3jstDKCoGljQ&limit=1`;
    request({url, json: true},(error, response)=>{
        if(error){
            callback('Check your internet connection', undefined);
        }else if(response.body.features.length === 0){
            callback('Location not found, try to search valid location', undefined);
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = getcode