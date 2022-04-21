import AxiosApi from '../../../api/axios-api';

export default class AllApi {

    constructor(props){
        this.body = props;
    }

    getTopUsers = async (body) => {
        return await AxiosApi.call(body, `home/top?is_male=${body.isMale}&page=${body.page}`, 'get');
    }

    getRecentUsers = async (body) => {
        return await AxiosApi.call(body, `home/recent?is_male=${body.isMale}&page=${body.page}`, 'get');
    }

    getTweets = async (body) => {
        return await AxiosApi.call(body, `home/tweets?is_male=${body.isMale}&page=${body.page}`, 'get');
    }
}