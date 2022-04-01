import axios from "axios";
import { BASE_API_URL } from '../common/constants';

class AuthService {
    register(email, password) {
        return axios.post(`${BASE_API_URL}/auth/register`, {
            email,
            password
        });
    }
    async login(email, password) {
        const res = await axios.post(`${BASE_API_URL}/auth/login`, {
            email,
            password
        });
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }
    logout() {
        localStorage.removeItem("user");
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();