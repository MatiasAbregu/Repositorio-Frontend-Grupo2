import axios from "axios";

/**
 * Clase que proporciona métodos para conectarse a la API de servicios. (Acceso todos los roles, a excepción de los métodos POST, PUT y DELETE)
 */
class ServiceConnection {

    /**
     * Obtiene todos los servicios de hoteles.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllHotelsServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Hoteles"} } );
    }

    /**
     * Obtiene todos los servicios de autos.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllCarServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Autos"} } );
    }

    /**
     * Obtiene todos los servicios de aviones.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllPlanesServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Aviones"} } );
    }

    /**
     * Obtiene todos los servicios de colectivos.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllBusServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Colectivos"} } );
    }

    /**
     * Obtiene todos los servicios de eventos.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllEventsServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Eventos"} } );
    }

    /**
     * Obtiene todos los servicios de trenes.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllTrainServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Trenes"} } );
    }

    /**
     * Obtiene todos los servicios de excursiones.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllExcursionServices(){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services", { params: { type: "Excursiones"} } );
    }

    /**
     * Obtiene un servicio por su ID.
     * @param {number} serviceId El ID del servicio.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getServiceById(serviceId){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/services/" + serviceId);
    }

    /**
     * Obtiene todos los servicios detallados.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllServicesDetailed(token){
        return axios.get("http://vps-3991849-x.dattaweb.com:8080/auth/services-detailed", { headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Crea un nuevo servicio.
     * @param {Object} data Los datos del nuevo servicio.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createService(data, token) {
        return axios.post("http://vps-3991849-x.dattaweb.com:8080/auth/services", data, { headers: {Authorization: `Bearer ${token}`} } );
    }

    /**
     * Actualiza un servicio existente.
     * @param {number} id El ID del servicio a actualizar.
     * @param {Object} data Los datos actualizados del servicio.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    updateService(data, id, token) {
        return axios.put("http://vps-3991849-x.dattaweb.com:8080/auth/services/" + id, data, { headers: {Authorization: `Bearer ${token}`} } );
    }

    /**
     * Elimina un servicio.
     * @param {number} id El ID del servicio a eliminar.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    deleteService(id, token){
        return axios.delete("http://vps-3991849-x.dattaweb.com:8080/auth/services/" + id, {headers: {Authorization: `Bearer ${token}`}})
    }
}

export default new ServiceConnection();