import React from 'react';
import {Grid, Loader} from 'semantic-ui-react'
import Menu from '../../main-layout/menu'
import SideMenu from '../../main-layout/side-menu'
import {prefecturesList} from "../../../utils/static-data";
import ProfileApi from "../api/profile-api"
import Helper from "../../../utils/helper";
import ReportModal from "./report-modal";

export default class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.reportModalRef = React.createRef();
        this.userId = this.props ? this.props.match.params.id : '';
        this.profileApi = new ProfileApi(this);
        this.state = {
            loading: true,
            mainImage: '',
            isMale: 0,
            profileData: {
                images: [],
                PRComment: "",
                name: "",
                labeledText: "",
                totalPoint: "",
                totalPointEx: "",
                info: {},
                lastTweet: {}
            }
        };

    }

    async componentDidMount() {
        const response = await this.profileApi.getProfileDetail({id: this.userId});
        this.setState({
            loading: false,
        });
        if (response.data) {
            let {profileData, isMale} = this.state;
            let user = response.data.data.user;
            let userInfo = user.is_male ? user.male : user.female;
            profileData.images.push(
                `${user.icon_image ? !user.icon_image.includes('http://api.gyanomi.com/') ? 'http://api.gyanomi.com/' : '' : ''}${user.icon_image}`,
                `${user.top_image ? !user.top_image.includes('http://api.gyanomi.com/') ? 'http://api.gyanomi.com/' : '' : ''}${user.top_image}`,
                `${user.image1 ? !user.image1.includes('http://api.gyanomi.com/') ? 'http://api.gyanomi.com/' : '' : ''}${user.image1}`,
                `${user.id_image ? !user.id_image.includes('http://api.gyanomi.com/') ? 'http://api.gyanomi.com/' : '' : ''}${user.id_image}`,
            );

            profileData.PRComment = user.promotion_text;
            profileData.name = user.name;
            isMale = user.is_male;
            profileData.info = {
                age: `${userInfo.age} ???`,
                prefecture: prefecturesList.find(a => a.value === userInfo.prefecture) ?
                    prefecturesList.find(a => a.value === userInfo.prefecture).text : "",
                specificOccupation: userInfo.occupation
            };
            if (user.lastTweet) {
                let lastTweet = user.lastTweet;
                profileData.lastTweet = {
                    created_at: lastTweet.created_at ? ` ${lastTweet.created_at.split('T')[0].replaceAll('-', ',')}  ${lastTweet.created_at.split('T')[1].substring(1, 5)}` : '',
                    tweetDate: lastTweet.month && lastTweet.day ?
                        `${lastTweet.month}???${lastTweet.day}??? ${lastTweet.start_hour}:00  ??? ${lastTweet.end_hour}:00  ????????????` : '',
                    day: lastTweet.day,
                    end_hour: lastTweet.end_hour,
                    month: (lastTweet.month),
                    place: lastTweet.place ? lastTweet.place : '',
                    start_hour: lastTweet.start_hour,
                    text: lastTweet.text,
                }
            }

            if (isMale) {
                profileData.info.annualIncome = `${userInfo.annual_income}????????????`;
                profileData.info.drinkingAmount = `${userInfo.thank_you_amount}?????? / ??????????????????`;
                profileData.info.taxiFee = `${userInfo.taxi_fee}?????? ??????`;
                profileData.info.femaleTip = `${userInfo.tip}?????? ??????`
            } else {
                profileData.info.height = `${userInfo.height} cm`;
                profileData.info.weight = `${userInfo.weight} kg`;
                profileData.info.bust = `${userInfo.bust} cm`;
                profileData.info.cup = `${userInfo.cup} ?????????`;
                profileData.info.waist = `${userInfo.waist} cm`;
                profileData.info.hip = `${userInfo.hip} cm`;
                profileData.info.guaranteeAmount = `${userInfo.desired_amount}?????? / ??????????????????`;
            }

            this.setState({
                profileData: profileData,
                mainImage: profileData.images[0],
                isMale: isMale
            })
        } else{
            this.props.notify(true,'Error!!please try again!')
            this.props.history.goBack()
        }
    }

    renderMainImage = (image) => {
        let currentImage = `${image}`;
        this.setState({
            mainImage: currentImage
        })
    };

    openReportModal = () => {
        this.reportModalRef.current.show();
    }


    render() {
        let {profileData, loading, mainImage, isMale} = this.state;
        return (
            <div className={'main-menu-section'}>
                <Menu props={this.props}/>
                <Grid className={'profile-details-grid'}>
                    {
                        loading ?
                            <Loader active={this.state.loading}/>
                            :
                            <Grid.Row>
                                <Grid.Column computer={4} tablet={4} mobile={4}>
                                    <div>
                                        <img className={'main-image'} src={mainImage} alt={'main-image'}/>
                                        <div className={'images-section'}>
                                            {
                                                profileData.images.map((img) => {
                                                    return <img onClick={() => this.renderMainImage(img)}
                                                                src={img} alt={'profile-image'}/>
                                                })
                                            }
                                        </div>
                                        <div className={'pr-section'}>
                                            <p>??????PR ????????????</p>
                                            <p>{profileData.PRComment}</p>
                                            {/*<p>???????????????????????????<br/>????????????????????????????????????????????????????????????????????????????????????????????????????????????<br/>??????????????????????????????
                                </p>*/}
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column computer={9} tablet={9} mobile={9}>
                                    <div className={'second-column'}>
                                        <div className={'profile-header-section'}>
                                            <div className={'first-header'}>
                                                <p className={'user-name'}>{profileData.name}</p>
                                                <img src={'images/profile-page-images/mibunkakunin.png'}
                                                     alt={'text-image'}/>
                                                <p className={'colored-label'}>???????????? ?????? 65??????????????? 12???</p>
                                                <div className={'under-image-text'}>????????????POINT = ?????????????????????????????????????????? +
                                                    ???????????????????????? + ???????????????????????? + ????????????
                                                </div>
                                            </div>
                                            <div className={'second-header'}>
                                                <img className={'like-image'} alt={'like-image'}
                                                     src={"images/profile-page-images/iine.png"}/>
                                                <span>0</span>
                                                <img className={'report-image'} alt={'report-image'}
                                                     src={"images/profile-page-images/ihan.png"}
                                                     onClick={() => this.openReportModal()}
                                                />
                                                <p className={'number-text'}>{`${isMale ? '????????????' : '????????????'} ID = ${this.userId}`}</p>
                                                <div className={'point'}>?????? ????????????POINT ??? 0 pt</div>
                                            </div>
                                        </div>
                                        <div className={'info-section-keys'}>
                                            <div className={'one-value'}>
                                                <span>??????</span>
                                                <span>{`: ${profileData.info.age}`}</span>
                                            </div>
                                            <div className={'one-value'}>
                                                <span>????????????</span>
                                                <span>{`: ${profileData.info.prefecture}`}</span>
                                            </div>
                                            <div className={'one-value'}>
                                                <span>??????????????????</span>
                                                <span>{`: ${profileData.info.specificOccupation}`}</span>
                                            </div>
                                            {
                                                isMale ?
                                                    <>
                                                        <div className={'one-value'}>
                                                            <span>??????</span>
                                                            <span>{`: ${profileData.info.annualIncome}`}</span>
                                                        </div>
                                                        <div className={'one-value'}>
                                                            <span>????????????????????????????????????</span>
                                                            <span>{`: ${profileData.info.drinkingAmount}`}</span>
                                                        </div>
                                                        <div className={'one-value'}>
                                                            <span>??????????????????????????????????????????</span>
                                                            <span>{`: ${profileData.info.taxiFee}`}</span>
                                                        </div>
                                                        <div className={'one-value'}>
                                                            <span>????????????????????????????????????</span>
                                                            <span>{`: ${profileData.info.femaleTip}`}</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className={'one-value'}>
                                                            <span>?????? / ??????</span>
                                                            <span>{`: ${profileData.info.height} / ${profileData.info.weight}`}</span>
                                                        </div>
                                                        <div className={'one-value'}>
                                                            <span>???????????? ????????? / ?????????</span>
                                                            <span>{`: ${profileData.info.bust} / ${profileData.info.cup}`}</span>
                                                        </div>
                                                        <div className={'one-value'}>
                                                            <span>???????????? / ?????????</span>
                                                            <span>{`: ${profileData.info.waist} / ${profileData.info.hip}`}</span>
                                                        </div>
                                                        <div className={'one-value'}>
                                                            <span>?????????????????????????????????</span>
                                                            <span>{`: ${profileData.info.guaranteeAmount}`}</span>
                                                        </div>
                                                    </>
                                            }

                                        </div>
                                        <div className={'details-section'}>
                                            <div className={'image-details'}>
                                                {
                                                    !Helper.isEmpty(profileData.lastTweet) ?
                                                        <img src={'images/profile-page-images/tw.png'}
                                                             alt={'tweet-image'}/>
                                                        : null
                                                }
                                            </div>
                                            <div className={'bottom-section'}>
                                                <div className={'text-section-details'}>
                                                    {
                                                        !Helper.isEmpty(profileData.lastTweet) ?
                                                            <>
                                                                <p>{`????????????${profileData.lastTweet.created_at}`}</p>
                                                                <p>{`?????????????????????????????? ${profileData.lastTweet.tweetDate}`}</p>
                                                                <p>{`?????????${profileData.lastTweet.place}`}</p>
                                                                <p>{`${profileData.lastTweet.text}`}</p>
                                                            </>
                                                            : null
                                                    }
                                                </div>
                                                <div className={'chat-section'}>
                                                    <img src={"images/profile-page-images/okuru.png"}
                                                         alt={'chat-image'}/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column computer={3} tablet={3} mobile={3}>
                                    <SideMenu props={this.props}/>
                                </Grid.Column>
                            </Grid.Row>
                    }

                    <ReportModal ref={this.reportModalRef} props={this}/>
                </Grid>
            </div>
        );
    }


}