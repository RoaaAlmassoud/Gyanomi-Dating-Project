import axios from 'axios';
import Helper from '../utils/helper'

export default class AxiosApi {

    static ApiURL = "http://api.gyanomi.com/api/";

    static call = async (requestBody, path, method, formDataBody= false) => {
        let url = path ? `${this.ApiURL}${path}` : this.ApiURL;
        let accessToken = localStorage.getItem('token');
        let headers = {
            "Content-Type": formDataBody? "multipart/form-data" : "application/json"
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`
        }

        try {
            const response = await axios[method](url
                , method === 'get' || method === 'delete'? {
                    headers: headers,
                    timeout: 1200000
                } : requestBody, {
                    headers: headers,
                    timeout: 1200000
                }, {crossDomain: true});

            return Helper.getResponseData(response);
        } catch (e) {
            if (e.response) {
                return Helper.getResponseData(e.response);
            } else
                return e;
        }
    }
}