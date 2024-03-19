import axios from "axios";

class UserService {

    createUser(data){
        return axios.post("http://localhost:8080/user", data);
    }

    logIn(data){
        return axios.post("http://localhost:8080/user/login", data);
    }
}

export default new UserService();