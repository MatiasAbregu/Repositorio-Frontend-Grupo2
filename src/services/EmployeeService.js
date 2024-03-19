import axios from "axios";

class EmployeeService {

    getAllEmployees(token){
        return axios.get("http://localhost:8080/auth/employees", {headers: {Authorization: `Bearer ${token}`}});
    }

    getEmployeeById(id, token){
        return axios.get("http://localhost:8080/auth/employees/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

    createEmployee(data, token){
        return axios.post("http://localhost:8080/auth/employees", data, {headers: {Authorization: `Bearer ${token}`}})
    }

    createEmployeeAndUpdateUser(data, dni, token){
        return axios.post("http://localhost:8080/auth/employees/" + dni, data, {headers: {Authorization: `Bearer ${token}`}})
    }

    updateEmployee(data, id, token){
        return axios.put("http://localhost:8080/auth/employees/" + id, data, {headers: {Authorization: `Bearer ${token}`}})
    }

    deleteEmployee(id, operation, token){
        return axios.delete("http://localhost:8080/auth/employees/" + id, {headers: {Authorization: `Bearer ${token}`}, params: {operation: operation}})
    }
}

export default new EmployeeService();