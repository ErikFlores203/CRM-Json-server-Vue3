import axios from 'axios';

const api = axios.create({
    baseURL:'https://api-rest-clientes.onrender.com/'
})

export default api