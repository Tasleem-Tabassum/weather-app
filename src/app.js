const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')

//to create a new instance of an application
const app = express()

const port = process.env.port || 3000
//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers engine and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//settup static dir to serve in express
app.use(express.static(publicDirPath))

//root url
app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'wandererearth',
        age : 21
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        link : '',
        title : 'Help page',
        name : 'wandererearth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Weather App',
        tag : 'Baby',
        name : 'wandererearth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 
    // })
    // console.log(req.query.address)
        // res.send({
        //     forecast : 'It is snowing',
        //     location : 'Seoul',
        //     address: req.query.address
        // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'Provide search name'
        })
    }
    else{
        console.log(req.query.search)
        res.send({
            products : []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'wandererearth',
        errorMessage : 'Help not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'wandererearth',
        errorMessage : 'Unavailable'
    })
})

app.listen(port, () => {
    console.log('App Started Successfully \nListening on port ' + port)
})