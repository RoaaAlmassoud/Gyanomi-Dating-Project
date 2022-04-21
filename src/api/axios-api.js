import axios from 'axios';
import Helper from '../utils/helper'

export default class AxiosApi {

    static ApiURL = "http://api.gyanomi.com/api/";

    static call = async (requestBody, path, method, formDataBody = false) => {
        let url = path ? `${this.ApiURL}${path}` : this.ApiURL;
        let accessToken = localStorage.getItem('token');
        let headers = {
            "Content-Type": formDataBody ? "multipart/form-data" : "application/json"
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`
        }
        console.log('headers: ', headers, url, method)

        try {
            console.log('requestBody: ', requestBody)
            const response = await axios[method](url
                , method === 'get' ? {
                        headers: headers,
                        timeout: 1200000
                    }
                    : method === 'delete' ? {
                            headers: headers,
                            data: requestBody
                        }
                        : requestBody, {
                    headers: headers,
                    timeout: 1200000
                }, {crossDomain: true});

            console.log('response in axios: ', response)
            return Helper.getResponseData(response);
        } catch (e) {
            if (e.response) {
                return Helper.getResponseData(e.response);
            } else
                return e;
        }
    }
}