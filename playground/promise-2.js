const request = require('request');
var geocodeAddress = (address)=>{
    return new Promise((resolve, reject)=>{
        const encodedAddress = encodeURIComponent(address);
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBkI07BtTgffJuJOPox2gkNu-ZmgPVs3vE`,
            json:true
        },(error, response, body)=>{
            if (error){
                reject("Connection to google servers failed!")
            }
            else if (body.status === 'ZERO_RESULTS'){
                reject("Unable to find the address");
            }
            else if (body.status === 'OK'){
                resolve({
                    address: `${body.results[0].formatted_address}`,
                    latitude: `${body.results[0].geometry.location.lat}`,
                    longitude: `${body.results[0].geometry.location.lng}`
                });
            }
        });
    });
};
geocodeAddress('71203').then((location)=>{
    console.log(JSON.stringify(location));
})
.catch((errorMessage)=>{
    console.log(errorMessage);
})