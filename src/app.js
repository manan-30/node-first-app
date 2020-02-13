const path = require('path')
const express = require('express')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.set('views', viewPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Manan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Manan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You Must Provide An Address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })

    // res.send({
    //     forecast: 'It Is Snowing',
    //     location: 'India',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must Provide The search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('My 404 Page')
})

app.listen(port, (req, res) => {
    console.log('Server Is Up On port ' + port)
})