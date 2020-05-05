const request = require('request')

require('dotenv').config()
const token = process.env.MBTOKEN


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                lng: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode