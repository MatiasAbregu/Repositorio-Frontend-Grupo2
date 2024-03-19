import axios from "axios";

class ServiceConnection {

    getAllHotelsServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Hoteles"} } );
    }

    getAllCarServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Autos"} } );
    }

    getAllPlanesServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Aviones"} } );
    }

    getAllBusServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Colectivos"} } );
    }

    getAllEventsServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Eventos"} } );
    }

    getAllTrainServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Trenes"} } );
    }

    getAllExcursionServices(){
        return axios.get("http://localhost:8080/services", { params: { type: "Excursiones"} } );
    }

    getServiceById(serviceId){
        return axios.get("http://localhost:8080/services/" + serviceId);
    }

    getAllServicesDetailed(token){
        return axios.get("http://localhost:8080/auth/services-detailed", { headers: {Authorization: `Bearer ${token}`}});
    }

    createService(data, token) {
        return axios.post("http://localhost:8080/auth/services", data, { headers: {Authorization: `Bearer ${token}`} } );
    }

    updateService(data, id, token) {
        return axios.put("http://localhost:8080/auth/services/" + id, data, { headers: {Authorization: `Bearer ${token}`} } );
    }

    deleteService(id, token){
        return axios.delete("http://localhost:8080/auth/services/" + id, {headers: {Authorization: `Bearer ${token}`}})
    }
}

export default new ServiceConnection();