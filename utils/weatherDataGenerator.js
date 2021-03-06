const request = require('request');

module.exports = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/4253e5b351c9991a1ba2c46b42c79df5/${latitude},${longitude}`;
request({url, json: true}, (error, { body }) => {
    if (error) callback('Weather Services Unavilable', undefined);

    if(body.error) {
        callback(response.body.error, undefined);
    } else {
        const {humidity, windSpeed, windGust, uvIndex, visibility, temperature, precipProbability} = body.currently;
        callback(undefined,`${body.daily.data[0].summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain`, {humidity, windSpeed, windGust, uvIndex, visibility});
    }
    
});
}