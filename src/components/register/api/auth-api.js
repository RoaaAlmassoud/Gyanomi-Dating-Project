import AxiosApi from '../../../api/axios-api';

export default class AuthApi {

    constructor(props){
        this.body = props;
    }

    uploadPhotos = async (body) => {
        let bodyFormData = new FormData();
        bodyFormData.append('top_image', body.top_image);
        bodyFormData.append('icon_image', body.icon_image);
        bodyFormData.append('id_image', body.id_image);
        if(body.image1){
            bodyFormData.append('image1', body.image1);
        }
        if(body.image2){
            bodyFormData.append('image2', body.image2);
        }
        if(body.image3){
            bodyFormData.append('image3', body.image3);
        }

        return await AxiosApi.call(bodyFormData, `upload`, 'post');
    };

    register = async(body) => {
        return await AxiosApi.call(body, `auth/register`, 'post');
    };

    updateAccount = async (body) => {
        return await AxiosApi.call(body, `user`, 'put');
    }

    login = async(body) => {
        return await AxiosApi.call(body, `auth/login`, 'post');
    };

    getUserById = async (body) => {
        return await AxiosApi.call(body, `user/${body.id}`, 'get');
    }
}