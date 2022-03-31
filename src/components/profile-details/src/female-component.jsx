import React from 'react';
import {Grid} from 'semantic-ui-react'
import Menu from '../../main-layout/menu'
import SideMenu from '../../main-layout/side-menu'

export default class FemaleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.profileData = {
            images: [
                'images/column-images/1.jpg',
                'images/profile-page-images/female2.jpg',
                'images/profile-page-images/female3.jpg',
                'images/profile-page-images/female4.jpg'
            ],
            PRComment: "誰とでもすぐに仲良く話せるのが長所です♪ " +
                " 紳士的で余裕が有って素敵なおじ様と出会えたら嬉しい！! " +
                "基本週末の夕方以降はヒマしてるので、積極的にお誘い下さい。待ってますね★",
            name: "秋元 春奈 さん",
            labeledText: "",
            totalPoint: "",
            totalPointEx: "",
            info: {
                age: "28 歳",
                prefecture: "広島県",
                specificOccupation: "保育士",
                height: "165 cm",
                weight: "47 kg",
                bust: "92cm",
                waist: "58 cm",
                hip: "84 cm",
                guaranteeAmount: "2万円 / １時間あたり",
            }
        }
    }


    render() {
        let profileData = this.profileData;
        return (
            <div className={'main-menu-section'}>
                <Menu props={this.props}/>
                <Grid className={'profile-details-grid'}>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={4}>
                            <img className={'main-image'} src={'images/column-images/1.jpg'} alt={'main-image'}/>
                            <div className={'images-section'}>
                                {
                                    profileData.images.map((img) => {
                                        return <img src={img} alt={'profile-image'}/>
                                    })
                                }
                            </div>
                            <div className={'pr-section'}>
                                <p>自己PR コメント</p>
                                <p>誰とでもすぐに仲良く話せるのが長所です♪<br/>紳士的で余裕が有って素敵なおじ様と出会えたら嬉し<br/>い！！<br/>基本週末の夕方以降はヒマしてるので、積極的にお誘い下さい。待ってますね★
                                </p>
                                {/*<Divider vertical></Divider>*/}
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={9} tablet={9} mobile={9}>
                            <div className={'second-column'}>
                                <div className={'profile-header-section'}>
                                    <div className={'first-header'}>
                                        <p className={'user-name'}>{this.profileData.name}</p>
                                        <img src={'images/profile-page-images/mibunkakunin.png'} alt={'text-image'}/>
                                        <p className={'colored-label'}>週間人気 全国 35位：広島県 9位</p>
                                        <div className={'under-image-text'}>週間合計POINT = プロフィールページアクセス数 + ツイート投稿回数 +
                                            ツイート閲覧者数
                                            +
                                            いいね数
                                        </div>
                                    </div>
                                    <div className={'second-header'}>
                                        <img className={'like-image'} src={"images/profile-page-images/iine.png"} alt={'like-image'}/>
                                        <span>0</span>
                                        <img className={'report-image'} src={"images/profile-page-images/ihan.png"} alt={'report-image'}/>
                                        <p className={'number-text'}>女性登録 ID = g10001</p>
                                        <div className={'point'}>先週 合計獲得POINT ＝ 214 pt</div>
                                    </div>
                                </div>
                                <div className={'info-section-keys'}>
                                    <div className={'one-value'}>
                                        <span>年齢</span>
                                        <span>{`: ${profileData.info.age}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>都道府県</span>
                                        <span>{`: ${profileData.info.prefecture}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>具体的な職業</span>
                                        <span>{`: ${profileData.info.specificOccupation}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>身長 / 体重</span>
                                        <span>{`: ${profileData.info.height} / ${profileData.info.weight}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>３サイズ バスト / カップ</span>
                                        <span>{`: ${profileData.info.bust} / G カップ`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>ウェスト / ヒップ</span>
                                        <span>{`: ${profileData.info.waist} / ${profileData.info.hip}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>ギャラ飲みデート希望額</span>
                                        <span>{`: ${profileData.info.guaranteeAmount}`}</span>
                                    </div>
                                </div>
                                <div className={'details-section'}>
                                    <div className={'image-details'}>
                                        <img src={'images/profile-page-images/tw.png'} alt={'tweet-image'}/>
                                    </div>
                                    <div className={'bottom-section'}>
                                        <div className={'text-section-details'}>
                                            投稿日時：2021年10月14日 18:34<br/>
                                            待ち合わせ希望日時：10月16日 19:00 ～ 21:00 終了予定<br/>
                                            場所：広島駅周辺<br/><br/>
                                            今週土曜日の夜ですが、19時ごろから時間空いてるから誰か一緒に遊んでくれませんか。<br/>
                                            ２人きりでゆっくり時間過ごしたいです★<br/>
                                            ２時間～朝まで希望<br/>
                                            ご奉仕好きだから、盛り上げますよ！！<br/>
                                            期待してくださいね！！
                                        </div>
                                        <div className={'chat-section'}>
                                            <img src={"images/profile-page-images/okuru.png"} alt={'chat-image'}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={3} tablet={3} mobile={3}>
                            <SideMenu/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }


}