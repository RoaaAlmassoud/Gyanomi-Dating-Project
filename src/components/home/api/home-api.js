import AxiosApi from '../../../api/axios-api';

export default class HomeApi {

    constructor(props){
        this.body = props;
    }

    getHome = async (body) => {
        return await AxiosApi.call(body, `home?is_male=${body.isMale}`, 'get');
    }
}