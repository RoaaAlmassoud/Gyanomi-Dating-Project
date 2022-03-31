import AxiosApi from '../../../api/axios-api';

export default class TweetApi {

    constructor(props){
        this.body = props;
    }

    addTweet = async(body) => {
        return await AxiosApi.call(body, `tweet`, 'post');
    };

}