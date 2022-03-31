import AxiosApi from '../../../api/axios-api';

export default class ProfileApi {

    constructor(props){
        this.body = props;
    }

    getProfileDetail = async (body) => {
        return await AxiosApi.call(body, `user/${body.id}`, 'get');
    }
}