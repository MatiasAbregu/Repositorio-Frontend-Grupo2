import axios from "axios";

/**
 * Clase que proporciona métodos para interactuar con la API de paquetes. (Solo acceso rol: admin y empleado, a excepción de los get que pueden todos)
 */
class PackageService {

    /**
     * Obtiene todos los paquetes de la API.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllPackages(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/packages");
    }

    /**
     * Obtiene un paquete por su ID de la API.
     * @param {number} id El ID del paquete.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getPackageById(id){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/packages/" + id);
    }

    /**
     * Crea un nuevo paquete.
     * @param {Object} data Los datos del nuevo paquete.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createPackage(data, token){
        return axios.post("http://vps-3991849-x.dattaweb.com:8080/auth/packages", data, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Actualiza un paquete existente.
     * @param {number} id El ID del paquete a actualizar.
     * @param {Object} data Los datos actualizados del paquete.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    updatePackage(id, data, token){
        return axios.put("http://vps-3991849-x.dattaweb.com:8080/auth/packages/" + id, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Elimina un paquete.
     * @param {number} id El ID del paquete a eliminar.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    deletePackage(id, token) {
        return axios.delete("http://vps-3991849-x.dattaweb.com:8080/auth/packages/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

}

export default new PackageService();