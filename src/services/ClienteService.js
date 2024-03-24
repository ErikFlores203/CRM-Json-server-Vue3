import api from "../lib/axios";

export default {
    obtenerClientes(){
        return api.get('/clientes')
    },
    agregarCliente(data){
        return api.post('/clientes', data)
    },
    obtenerCliente(_id){
        return api.get('/clientes/' + _id)
    },
    actualizarCliente(_id, data){
        return api.patch('/clientes/'+ _id, data)
    },
    actualizarEstado(_id, data){
        return api.patch('/clientes/'+ _id, data)
    },
    eliminarCliente(_id){
        return api.delete('/clientes/' + _id)
    }

}