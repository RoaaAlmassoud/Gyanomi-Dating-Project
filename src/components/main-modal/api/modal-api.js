import AxiosApi from '../../../api/axios-api';

export default class ModalApi {

    constructor(props){
        this.body = props;
    }

    addInquiry = async(body) => {
        return await AxiosApi.call(body, `inquiry`, 'post');
    };

    deleteAccount = async(body) => {
        return await AxiosApi.call(body, `user`, 'delete');
    };

}