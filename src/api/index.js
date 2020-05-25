
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080',
});

/**
 * Class to interact with rest api.
 */
export default class API {

    /**
     * POST - Sign Up - Detection Notifier RestAPI. 
     * 
     * @param {Object} payload
     * @returns {Promise}
     */
    static signUp(payload) {
        return http.post(`/user/`, payload);
    }

    /**
     * POST - Sign In - Detection Notifier RestAPI. 
     * 
     * @param {Object} payload
     * @returns {Promise}
     */
    static signIn(payload) {
        return http.post(`/user/login`, payload);
    }

};