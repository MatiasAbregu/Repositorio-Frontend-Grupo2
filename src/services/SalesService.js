import axios from "axios";

/**
 * Clase que proporciona métodos para interactuar con la API de ventas. (Solo tienen acceso rol: admin y empleado, a excepción de la creación desde cliente)
 */
class SalesService {

    /**
     * Obtiene todas las ventas de la API.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllSales(token){
        return axios.get("http://localhost:8080/auth/sales", {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Obtiene una venta por su ID de la API.
     * @param {number} id El ID de la venta.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getSaleById(id, token){
        return axios.get("http://localhost:8080/auth/sales/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Crea una nueva venta.
     * @param {Object} data Los datos de la nueva venta.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createSale(data, token){
        return axios.post("http://localhost:8080/auth/sales", data, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Actualiza una venta existente.
     * @param {number} id El ID de la venta a actualizar.
     * @param {Object} data Los datos actualizados de la venta.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    updateSale(id, data, token){
        return axios.put("http://localhost:8080/auth/sales/" + id, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Elimina una venta.
     * @param {number} id El ID de la venta a eliminar.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    deleteSale(id, token){
        return axios.delete("http://localhost:8080/auth/sales/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Crea una venta y un cliente (en caso de necesitar crearlo) a partir de la vista del cliente.
     * @param {Object} data Los datos de la venta a crear.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createSaleFromClient(data){
        return axios.post("http://localhost:8080/clients/sale", data);
    }
}

export default new SalesService();