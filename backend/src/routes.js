const {Router} = require("express")
const DevController = require('../src/controllers/DevController')
const SearchController = require('../src/controllers/SearchController')

const routes = Router()

routes.get('/devs', DevController.index) //buscar todos devs
routes.post('/devs', DevController.store) //salvar devs

routes.get('/search', SearchController.index)


module.exports = routes;