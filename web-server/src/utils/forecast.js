const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7761bd20f48924ca5fe07ffe9781a549&query=" + latitude + "," + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, "It is currently " + body.current.temperature +" degrees out. There is " + body.current.precip + "% chance of rain.")
        }
    })
}

module.exports = forecast