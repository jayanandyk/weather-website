const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('../utils/geoCodeGenerator');
const weather = require('../utils/weatherDataGenerator');


const app = express();
const portNumber = process.env.PORT || 3000;
const staticHtmlFilesDirectory = path.join(__dirname, '../public');

app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.use(express.static(staticHtmlFilesDirectory));

app.get('', (req,res) => {
    res.render('index', {
        message: "Jayanand",
        title: "Weather"
    });
})

app.get('/weather', (req, res) =>{
    const {address} = req.query;
    if (!address) {
        return res.send({
          error: 'Please provide an address'  
        })
    }

    geoCode(address, (error, {latitude, longitude, location} = {})=> {
    if (error) {
        return res.send({error})
    } 
    if (latitude && longitude && location) {
        weather(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({error})
            }
            if (forecast) {
                return res.send({
                        forecast,
                        location,
                        address: address
                    });
            }
        })
    }
});
})

app.get('/help', (req,res) => {
    res.render('help', {
        message:"Jayanand",
        title: "Help"
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        message:"Jayanand",
        title: "About"
    });
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        info:"Help article not found",
        message:"Jayanand",
        title: "404"
    });
})

app.get('*', (req,res) => {
    res.render('error', {
        info:"Page not found",
        message:"Jayanand",
        title: "404"
    });
})


app.listen(portNumber, ()=> {
    console.log(`Server running at ${portNumber}`)
});