const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //setup handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

//Setup dynamic directory to serve
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(publicDirectoryPath))
}
// console.log(process.env.NODE_ENV)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vannida Lim'
    })
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About Me',
        name: 'Vannida Lim',
        aboutText: 'Software Engineer based in Philly ✨'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        helpText: 'FAQs',
        title: 'Help',
        name: 'Vannida Lim',
        qa1: 'What APIs were used? Weatherstack and Mapbox',
        qa2: 'What tech stack was used? Node.js, Express, and npm hbs' 
        
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    let address = req.query.address
    geocode(address, (error, { lng, lat, location } = {})=> {
        if (error) {
            return res.send({ error })
        }
        forecast(lng, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vannida Lim',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vannida Lim',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})