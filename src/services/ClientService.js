import axios from "axios";

class ClientService {

    getAllClients(token){
        return axios.get("http://localhost:8080/auth/clients", {headers: {Authorization: `Bearer ${token}`}});
    }

    getClientById(id, token){
        return axios.get("http://localhost:8080/auth/clients/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }
}

export default new ClientService();