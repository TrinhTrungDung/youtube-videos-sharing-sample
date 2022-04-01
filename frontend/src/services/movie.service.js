import axios from 'axios';
import { BASE_API_URL } from '../common/constants';

const axiosJWT = axios.create();
const user = JSON.parse(localStorage.getItem('user'));
if (user && user.accessToken) {
    axiosJWT.defaults.headers.common["x-access-token"] = user.accessToken;
}

class MovieService {
    getMovies() {
        return axios.get(`${BASE_API_URL}/movies`);
    }

    getMovie(id) {
        return axios.get(`${BASE_API_URL}/movies/${id}`);
    }

    createMovie(url) {
        return axiosJWT.post(`${BASE_API_URL}/movies`, {
            url
        });
    }
}

export default new MovieService();