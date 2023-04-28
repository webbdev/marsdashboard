require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000
const API_KEY = process.env.API_KEY

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
app.get('/rovers/:rover', async (req, res) => {
    try {
        const rover = req.params.rover;
        let photos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`)
        .then(res => res.json())
        res.send({ photos })
    } catch (err) {
        console.log('error:', err);
    }
})

app.get('/rover-data/:rover', async (req, res) => {
    try {
        const rover = req.params.rover;
        let data = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/?api_key=${API_KEY}`)
        .then(res => res.json())
        res.send({ data })
    } catch (err) {
        console.log('error:', err);
    }
})


// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))