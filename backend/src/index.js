const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") //permitir acesso externos à api
const http = require('http')
const routes = require("./routes")
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)

setupWebsocket(server)

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/omnistack", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Conectado ao mongo")
}).catch( (error) => {
    console.log("Erro ao se conectar. " + error)
})

app.use(cors())
// Express entendendo requisições Json
app.use(express.json())
app.use(routes)


server.listen(3333)