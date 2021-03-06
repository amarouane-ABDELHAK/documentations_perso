const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const api = require('./routes/api')

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello from server")
})
app.use('/api', api)
app.listen(PORT, () => {
    console.log(`Server ready on PORT ${PORT}`)
})