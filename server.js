const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const authRoute = require('./routes/auth')

app.use(bodyParser.json())
app.use('/auth', authRoute)
app.use((e, req, res, next) => {
    const { statusCode, message, data } = e
    res.status(statusCode).json({
        message: message,
        data: data
    })
})
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})