const express = require('express')
const path = require('path')

const app = express()

const env = path.join(__dirname, './src/configs/env', process.env.NODE_ENV || 'development')

require(env)(app)
require('./src')(app)

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Servidor host ${app.get('host')} porta ${app.get('port')}`)
})
