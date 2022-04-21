import AxiosApi from '../../../api/axios-api';

export default class AffiliateApi {

    constructor(props){
        this.body = props;
    }

    register = async (body) => {
        return await AxiosApi.call(body, `affiliation/register`, 'post');
    }

    login = async (body) => {
        return await AxiosApi.call(body, `affiliation/login`, 'post');
    }
}