const request = require('request');

const getWeather = (latitude, longitude,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/1b13f2bd8927df5a75eb1c93e0ce9e6f/${latitude}, ${longitude}`,
        json:true
    },(error,response,body)=>{
        
        if (!error & response.statusCode === 200){
            callback(undefined,{
                temperature:body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }); 
        }
        else{
            callback("unable to fetch weather");
        }
    });
};

module.exports = {
    getWeather:getWeather
}
