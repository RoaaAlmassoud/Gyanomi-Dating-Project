import React from 'react';
import {Grid, Loader} from 'semantic-ui-react'
import Menu from '../../main-layout/menu'
import SideMenu from '../../main-layout/side-menu'
import AllApi from "../api/all-api"
import {prefecturesList} from '../../../utils/static-data'
import Box from '../../main-layout/box'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class All extends React.Component {

    constructor(props) {
        super(props);
        this.allApi = new AllApi(this);
        let requestName = 'getTopUsers';
        let pathName = this.props.location.pathname;
        let type = pathName ? pathName.split("_")[0] ? pathName.split("_")[0].split('/')[1] : 'top' : 'top';
        let gender = pathName ? type === 'tweets' ? pathName.split("_")[1] : pathName.split("_")[2] : 'g00';
        let genderName = gender === 'g00' ? 'female' : 'male'
        this.headerImage = type === "top" ? 'tab_01.png' : type === "recent" ?
            genderName === "male" ? 'tab_02a.png' : 'tab_02b.png' : 'tab_03.png';

        this.boxImage = type === "top" ? 'kuwashiku_01.png' : type === "recent" ?
            genderName === "male" ? 'kuwashiku_02a.png' : 'kuwashiku_02b.png' : 'kuwashiku_03.png';
        this.footerText = type === 'top' ? '週間 合計POINT　=　プロフィールページアクセス数　+　ツイート投稿回数　+　ツイート閲覧者数　+　いいね数' :
            type === 'recent' ? '新規登録年月日　↓ ↓ ↓ ↓ ↓　新しい順　↓ ↓ ↓ ↓ ↓' : 'ギャラ飲みお誘いツイート　↓ ↓ ↓ ↓ ↓　最新投稿順　↓ ↓ ↓ ↓ ↓　100件表示中';
        this.footerBackground = type === 'top' ? '#b28850' : type === 'recent' ? genderName === 'male' ? '#8957a1' : '#eb6877' : '#1d9bf0'
        switch (pathName) {
            case '/top_users_m00':
            case '/top_users_g00':
                requestName = 'getTopUsers';
                break;
            case '/recent_users_g00':
            case '/recent_users_m00':
                requestName = 'getRecentUsers';
                break;
            case '/tweets_g00':
            case '/tweets_m00':
                requestName = 'getTweets';
                break;
            default:
                break
        }
        this.state = {
            requestName: requestName,
            isMale: gender === 'g00' ? 0 : 1,
            genderName: genderName,
            type: type,
            data: [],
            loading: true,
            hasMore: true
        };
    };

    /*getNotifications = async (clicked = false) => {
        let {pageNumber, notifications, notificationsCount} = this.state;
        if (notifications.length >= 500) {
            this.setState({hasMore: false});
            return;
        }
        let requestedPageNumber = clicked ? 1 : pageNumber;
        const response = await NotificationApi.getNotifications({pageNumber: requestedPageNumber});
        this.setState({loading: false});
        if (response.code === "SUCCESS000") {
            let newNotificationCount = notificationsCount > 10 && requestedPageNumber === 1 ? notificationsCount - 10 :
                notificationsCount < 10 ? 0 : notificationsCount;
            if (response.data.totalPages > 0) {
                let items = clicked ? response.data.list : notifications.concat(response.data.list);
                let hasMore = requestedPageNumber + 1 <= response.data.totalPages;
                this.setState({
                    notifications: items,
                    pageNumber: requestedPageNumber + 1,
                    hasMore: hasMore,
                    notificationsCount: newNotificationCount
                })
            }
            return null
        } else {
            return null
        }
    };*/

    getItems = async () => {
        let {requestName, isMale, genderName, type, data, pageNumber, hasMore} = this.state;
        let gender = isMale ? 'male' : 'female';
        const response = await this.allApi[requestName]({isMale: isMale, page: pageNumber});

        this.setState({
            loading: false,
        });
        if (response.data) {
            let list = response.data.data[type === 'recent' ? 'top' : type];

            list.data.map((item, index) => {
                let renderedObject = type === 'tweets' ? item.user : item;
                let headerText = type === 'top' ? `先週合計 ${data.length - index} pt 獲得` :
                    type === 'recent' ? `${renderedObject.created_at ? renderedObject.created_at.split('T')[0] : ''} 新規登録` :
                        `${item.created_at ? item.created_at.split('T')[0] : ''} /
                            ${item.created_at ? item.created_at.split('T')[1].substring(0, 5) : ''} 投稿`;
                let returnedItem = {
                    profileImage: `${renderedObject.icon_image ? !renderedObject.icon_image.includes('http://api.gyanomi.com/') ? 'http://api.gyanomi.com/' : '' : ''}${renderedObject.icon_image}`,
                    header: headerText,
                    info: `${renderedObject.name}, ${prefecturesList.find(a => a.value === renderedObject[genderName].prefecture) ?
                        prefecturesList.find(a => a.value === renderedObject[genderName].prefecture).text : ''}`,
                    age: `${renderedObject[genderName].age} years old`,
                    id: renderedObject.uuid
                }
                data.push(returnedItem)
            })
            hasMore = list.current_page < list.last_page
            this.setState({
                data: data,
                pageNumber: response.data.current_page +1,
                hasMore: hasMore
            })
        }
    }

    componentDidMount() {
       this.getItems()
    };

    refresh = () => {
    }

    render() {
        let {data, isMale, type, hasMore} = this.state;
        return (
            <div className={'main-menu-section'}>
                <Menu props={this.props}/>
                <Grid>
                    <Grid.Row>
                        {
                            this.state.loading ?
                                <Loader active={this.state.loading}/>
                                :
                                <>

                                    <Grid.Column computer={13} className={'cards-container'}>
                                        <InfiniteScroll
                                            dataLength={data ? data.length : 0}
                                            next={this.getItems}
                                            hasMore={this.state.hasMore}
                                            loader={<h4>Loading...</h4>}
                                            refreshFunction={this.refresh}
                                            endMessage={data.length === 0 ? <h4
                                                style={{
                                                    textAlign: 'center',
                                                    color: 'black',
                                                    marginTop: '0px',
                                                    padding: '15px 30px'
                                                }}>
                                                No items to show!</h4> : ''}
                                            pullDownToRefresh
                                            pullDownToRefreshThreshold={50}
                                        >
                                        {
                                            data.map((element, index) => {
                                                element.type = type;
                                                element.gender = isMale ? 'male' : 'female';
                                                element.boxImage = this.boxImage;
                                                element.headerImage = this.headerImage;
                                                return (

                                                        <Box all={true} element={element} index={index}
                                                             headerImage={this.headerImage} props={this.props.props}/>


                                                )
                                            })
                                        }
                                        </InfiniteScroll>
                                    </Grid.Column>

                                    <div className={'point-section'}
                                         style={{background: this.footerBackground}}
                                    >
                                        <p>{this.footerText}</p>
                                    </div>
                                </>
                        }
                        <Grid.Column computer={3} tablet={4} mobile={4}>
                            <SideMenu/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }


}