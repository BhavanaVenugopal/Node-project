const request = require("request")

const geocode = (address, callback) => {
    const data = {
        latitude: 0,
        longitude: 0
    }
    const url_geocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYmhhdmFuYXYiLCJhIjoiY2wyZGc3cXgyMDhzdzNjbzh0OW0yOXBnOCJ9.vVznAkq8qtXQ_wWcNN8_9Q&limit=1"

    request({url: url_geocoding, json: true}, (error, response) => {
        if (error) {
            console.log("There is an error: ", error)
        } else if (response.body.features.length === 0) {
            console.log("Search unsuccessfuly. Try another.")
        } else {
            data.latitude = response.body.features[0].center[1]
            data.longitude = response.body.features[0].center[0]
            callback(data);
        }
    })
}

geocode("Los Angeles", (data) => {
    console.log(data)
    const url = "http://api.weatherstack.com/current?access_key=7761bd20f48924ca5fe07ffe9781a549&query=" + data.latitude + "," + data.longitude
    request({url: url, json: true}, (error, response) => {
        if (error) {
            console.log("There is an error: ", error)
        } else {
            const data = response.body
            console.log("It is currently " + data.current.temperature +" degrees out. There is " + data.current.precip + "% chance of rain.")
        }
    })
})