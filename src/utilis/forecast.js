const request = require('request')

require('dotenv').config()
const key = process.env.WSKEY

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lng},${lat}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast