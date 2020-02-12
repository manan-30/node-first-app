const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/eb0d8acc4ffea8e50e6062b7df2f33bf/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, responce) => {
        callback(undefined, 'It is currently ' + responce.body.currently.temperature + ' degrees out!,there is ' + responce.body.currently.precipProbability + '%.')
    })
}

module.exports = forecast