"use strict"

const HTTPClient = require('request');
const URL = 'https://api.apixu.com/v1/current.json?key=cacdf29dc2be47d484a105606152306&q={cityName}';
const TEN_SECONDS = 10 * 1000;

module.exports = (cityName, callback) => {
    HTTPClient(URL.replace('{cityName}', cityName), { json: true, method: 'GET', timeout: TEN_SECONDS }, function (err, res, body) {
        if (err) {
            console.error('Recieved following error during request', err);
            return callback(err, null);
        }
        const { statusCode } = res;
        if (statusCode === 200) {
            console.error(`Weather request for ${cityName} was successful`);

            const { current, location } = body;
            const weather = {
                condition: current.condition,
                realTemp: current.temp_c,
                feelTemp: current.feelslike_c,
                location: {
                    city: location.name,
                    country: location.country,
                },
            };
            return callback(null, weather);
        } else {
            console.error(`Weather request for ${cityName} failed`, body);
            return callback(new Error(`Could not obtain weather for ${cityName}`), null);
        }
    });
}