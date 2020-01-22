const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io
const connections = []

exports.setupWebScoket = (server) => {
    console.log(`\n\nServer: ${JSON.stringify(server)}\n\n`)
    io = socketio(server)

    io.on('connection', socket => {
        console.log(socket.id)
        console.log(socket.handshake.query)

        const {latitude, longitude, techs} = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                longitude: Number(longitude),
                latitude: Number(latitude),
            },
            techs: parseStringAsArray(techs)
        })
    })

}

exports.findConnections = (coordinates, techs) => {
    return connections.filter( connections => {
        return calculateDistance(coordinates, connections.connections) < 10 && connections.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })
}