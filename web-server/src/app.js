const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, "../public")))

app.get("", (req, res) => {
    res.render("index", {
        "title": "Weather"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        "title": "Weather"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        "title": "Weather",
        "message": "Help page"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        "message": "Help article not found. You can visit the link below to go to home page"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        "message": "Page not found. You can visit the link below to go to home page"
    })
})

app.listen(port, () => {
    console.log("Server started on port " + port)
})