import axios from "axios";

class PackageService {

    getAllPackages(){
        return axios.get("http://localhost:8080/packages");
    }

    getPackageById(id){
        return axios.get("http://localhost:8080/packages/" + id);
    }

    createPackage(data, token){
        return axios.post("http://localhost:8080/auth/packages", data, {headers: {Authorization: `Bearer ${token}`}});
    }

    updatePackage(id, data, token){
        return axios.put("http://localhost:8080/auth/packages/" + id, data, {headers: {Authorization: `Bearer ${token}`}});
    }

    deletePackage(id, token) {
        return axios.delete("http://localhost:8080/auth/packages/" + id, {headers: {Authorization: `Bearer ${token}`}});
    }

}

export default new PackageService();