const { response } = require('express')
const express = require('express')
const app = express()


app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const geoArray = []

app.post("/api", (request, response) => {
    // console.log(request)
    const data = request.body
    const timestamp = Date.now()
    const new_data = {...data, ... {timestamp: timestamp}}
    geoArray.push(new_data)
    response.json(geoArray)
    console.log(geoArray)
})
