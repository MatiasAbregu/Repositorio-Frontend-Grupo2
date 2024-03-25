import axios from "axios";

/**
 * Clase que proporciona métodos para interactuar con la API de clientes. (Solo acceso rol: Admin y Employee)
 */
class ClientService {

    /**
     * Obtiene todos los clientes de la API.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllClients(token){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/auth/clients", {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Obtiene un cliente por su ID de la API.
     * @param {number} id El ID del cliente.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getClientById(id, token){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/auth/clients/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }
}

export default new ClientService();