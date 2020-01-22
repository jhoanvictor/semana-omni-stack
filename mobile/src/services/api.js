import axios from 'axios'

const api = axios.create({
    baseURL: 'http://10.14.2.156:3333' 
})

export default api
