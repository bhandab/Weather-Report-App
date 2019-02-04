const yargs = require('yargs');
const axios = require('axios');

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

//console.log(argv);

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBkI07BtTgffJuJOPox2gkNu-ZmgPVs3vE`;

axios.get(geocodeURL).then((response)=>{
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng; 
    const weatherURL = `https://api.darksky.net/forecast/1b13f2bd8927df5a75eb1c93e0ce9e6f/${latitude}, ${longitude}`; 
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
})
.then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
})
.catch((e)=>{
    if (e.code === 'ENOTFOUND'){
        console.log("Unable to connect to API servers");
    }
    else{
        console.log(e.message);
    }
});









