import axios from "axios";

class SalesService {

    getAllSales(token){
        return axios.get("http://localhost:8080/auth/sales", {headers: {Authorization: `Bearer ${token}`}});
    }

    getSaleById(id, token){
        return axios.get("http://localhost:8080/auth/sales/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

    createSale(data, token){
        return axios.post("http://localhost:8080/auth/sales", data, {headers: {Authorization: `Bearer ${token}`}});
    }

    updateSale(id, data, token){
        return axios.put("http://localhost:8080/auth/sales/" + id, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    deleteSale(id, token){
        return axios.delete("http://localhost:8080/auth/sales/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

    createSaleFromClient(data){
        return axios.post("http://localhost:8080/clients/sale", data);
    }
}

export default new SalesService();