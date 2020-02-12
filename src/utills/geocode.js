const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGVtcDIyMzQiLCJhIjoiY2s1bTM0eHdlMHZhMDNmbnc3ajBpdWFobCJ9.58hbr7hga78CuwVIoZ7Ohw'

    request({ url: url, json: true }, (error, responce) => {
        if (error) {
            callback('Unable To Connect To Location Services!', undefined)
        } else if (responce.body.features.length === 0) {
            callback('Unable To Find location', undefined)
        } else {
            callback(undefined, {
                latitude: responce.body.features[0].center[1],
                longitude: responce.body.features[0].center[0],
                location: responce.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode