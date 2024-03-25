import axios from "axios";

/**
 * Clase que proporciona métodos para interactuar con la API de usuarios.
 */
class UserService {

    /**
     * Crea un nuevo usuario.
     * @param {Object} data Los datos del nuevo usuario.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createUser(data){
        return axios.post("http://vps-3991849-x.dattaweb.com:8080/user", data);
    }

    /**
     * Inicia sesión de usuario.
     * @param {Object} data Los datos de inicio de sesión del usuario.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    logIn(data){
        return axios.post("http://vps-3991849-x.dattaweb.com:8080/user/login", data);
    }
}

export default new UserService();