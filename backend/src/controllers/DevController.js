const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {

    async index(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body;
        
        let dev = await Dev.findOne({github_username})

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const {name = login, avatar_url, bio} = apiResponse.data
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username, 
                name,
                avatar_url,
                bio,
                techs: techsArray, 
                location
            })

            //Filtrar as conexões que estão ha no maximo 10 km de distâncias e novo dev tenha ao menos uma tec filtrada  
            const sendSocketMessegeTo = findConnections(
                { latitude, longitude }, 
                 techsArray
            )

            sendMessage(sendSocketMessegeTo, 'new-dev', dev)
        }

        return response.json(dev)
    },
    
    //Fazer depois 
    /*
    async update(){}
    async destroy(){} 
    */
    
}
