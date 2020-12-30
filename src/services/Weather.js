import React from 'react';
const getcode = require('./getcode')
const forecast = require('./forecast')


export default function Weather(address) {
    const finalResult = getcode(address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return console.log('Error while getting your location.');
        }
        const forecastRes =  forecast(latitude, longitude, (error, forecastResponse)=>{
            if(error){
                return console.log('Error while getting Weather information.');
            }
            
            console.log(`
            Location : ${location}\n
            Temperature: ${forecastResponse.temp} 
            `);
            return forecastResponse
        })
        return forecastRes
    })
  return (
    <div>
        {finalResult}
        {address}
    </div>
  );
}
