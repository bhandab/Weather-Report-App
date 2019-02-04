const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
.options({
a:{
    demand:true,
    alias:'address',
    describe:'Address to fetech weather for',
    string: true
}
})
.help()
.alias('help','h')
.argv;

console.log(argv);


geocode.geocodeAddress(argv.address,(error,results)=>{
    if (error){
        console.log(error);
    }
    else{
       console.log(results.address);
       weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
            if (errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
       });
    }
});





