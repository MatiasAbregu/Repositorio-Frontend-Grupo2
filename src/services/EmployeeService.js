import axios from "axios";

/**
 * Clase que proporciona métodos para interactuar con la API de empleados. (Solo acceso rol: admin, a excepción del primer método que tienen acceso todos)
 */
class EmployeeService {

    /**
     * Obtiene todos los empleados de la API con su información muy reducida.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllEmployees(token){
        return axios.get("http://localhost:8080/auth/get-employees", {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Obtiene todos los empleados de la API con toda su información.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getAllEmployeesWithAllInfo(token){
        return axios.get("http://localhost:8080/auth/employees", {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Obtiene un empleado por su ID de la API.
     * @param {number} id El ID del empleado.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    getEmployeeById(id, token){
        return axios.get("http://localhost:8080/auth/employees/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

    /**
     * Crea un nuevo empleado.
     * @param {Object} data Los datos del nuevo empleado.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createEmployee(data, token){
        return axios.post("http://localhost:8080/auth/employees", data, {headers: {Authorization: `Bearer ${token}`}})
    }

    /**
     * Crea un nuevo empleado y lo vincula con una persona ya existente.
     * @param {Object} data Los datos del nuevo empleado.
     * @param {number} dni El DNI de la persona con la que se va a vincular.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    createEmployeeAndLinkWitExistPerson(data, dni, token){
        return axios.post("http://localhost:8080/auth/employees/" + dni, data, {headers: {Authorization: `Bearer ${token}`}})
    }

    /**
     * Actualiza un empleado existente.
     * @param {Object} data Los datos actualizados del empleado.
     * @param {number} id El ID del empleado a actualizar.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    updateEmployee(data, id, token){
        return axios.put("http://localhost:8080/auth/employees/" + id, data, {headers: {Authorization: `Bearer ${token}`}})
    }

    /**
     * Elimina un empleado.
     * @param {number} id El ID del empleado a eliminar.
     * @param {string} operation La operación a realizar durante la eliminación.
     * @param {string} token El token de autenticación.
     * @returns {Promise<AxiosResponse<any>>} Una promesa que resuelve con la respuesta de la solicitud HTTP.
     */
    deleteEmployee(id, operation, token){
        return axios.delete("http://localhost:8080/auth/employees/" + id, {headers: {Authorization: `Bearer ${token}`}, params: {operation: operation}})
    }
}

export default new EmployeeService();