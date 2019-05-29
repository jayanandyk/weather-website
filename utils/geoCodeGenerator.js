const request = require('request');

module.exports = (address, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamF5YW5hbmQxOTYxIiwiYSI6ImNqdzVveWZvbzB5bWY0OHFzejA3cTQ5aHcifQ.DlELRpDiJK1LQj0TzZ-7lw&limit=1`;
    request({url, json:true}, (error, { body }) => {
        if(error) callBack('Geo Services Unavailable', undefined);
        const {features} = body;
        if(features && features.length > 0) {
            const latitude = features[0].center[1];
            const longitude = features[0].center[0];
            callBack(undefined, {
                latitude,
                longitude,
                location : features[0].place_name
            })
        } else {
            callBack('No Match Found', undefined)
        }
        
    });
}

