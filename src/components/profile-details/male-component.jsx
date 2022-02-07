import React from 'react';
import {Grid} from 'semantic-ui-react'
import Menu from '../main-layout/menu'
import SideMenu from '../main-layout/side-menu'

export default class MaleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.profileData = {
            images: [
                'images/column-images/01.jpg',
                'images/profile-page-images/male2.jpg',
                'images/profile-page-images/male3.jpg',
                'images/profile-page-images/male4.jpg'
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
                annualIncome: "8000万円以上",
                drinkingAmount: "5万円 / １時間あたり",
                taxiFee: "2万円 まで",
                femaleTip: "2万円 まで"
            }
        }
    }


    render() {
        let profileData = this.profileData
        return (
            <div className={'main-menu-section'}>
                <Menu/>
                <Grid className={'profile-details-grid'}>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={4}>
                            <img className={'main-image'} src={'images/column-images/01.jpg'}/>
                            <div className={'images-section'}>
                                {
                                    profileData.images.map((img) => {
                                        return <img src={img} alt={'profile-image'}/>
                                    })
                                }
                            </div>
                            <div className={'pr-section'}>
                                <p>自己PR コメント</p>
                                <p>会社経営してます。<br/>接待の飲みが大変多いので、可愛い女の子達と一緒に過ごせたらうれしいです。<br/>宜しくお願いします。
                                </p>
                                {/*<Divider vertical></Divider>*/}
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={9} tablet={9} mobile={9}>
                            <div className={'second-column'}>
                                <div className={'profile-header-section'}>
                                    <div className={'first-header'}>
                                        <p className={'user-name'}>{this.profileData.name}</p>
                                        <img src={'images/profile-page-images/mibunkakunin.png'}/>
                                        <p className={'colored-label'}>週間人気　全国 65位：愛知県 12位</p>
                                        <div className={'under-image-text'}>週間合計POINT = プロフィールページアクセス数 + ツイート投稿回数 + ツイート閲覧者数 + いいね数
                                        </div>
                                    </div>
                                    <div className={'second-header'}>
                                        <img className={'like-image'} src={"images/profile-page-images/iine.png"}/>
                                        <span>0</span>
                                        <img className={'report-image'} src={"images/profile-page-images/ihan.png"}/>
                                        <p className={'number-text'}>男性登録 ID = m10001</p>
                                        <div className={'point'}>先週 合計獲得POINT ＝ 364 pt</div>
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
                                        <span>年収</span>
                                        <span>{`: ${profileData.info.annualIncome}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>ギャラ飲みデートお礼金額</span>
                                        <span>{`: ${profileData.info.drinkingAmount}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>別途　女性へのタクシー代負担</span>
                                        <span>{`: ${profileData.info.taxiFee}`}</span>
                                    </div>
                                    <div className={'one-value'}>
                                        <span>別途　女性へのチップ負担</span>
                                        <span>{`: ${profileData.info.femaleTip}`}</span>
                                    </div>
                                </div>
                                <div className={'details-section'}>
                                    <div className={'image-details'}>
                                        <img src={'images/profile-page-images/tw.png'}/>
                                    </div>
                                    <div className={'bottom-section'}>
                                        <div className={'text-section-details'}>
                                            投稿日時：2021年10月02日　15:34<br/>
                                            待ち合わせ希望日時：10月02日　19:00 ～ 21:00　終了予定<br/>
                                            場所：名駅周辺<br/><br/>
                                            今夜、19時ごろから男性社長仲間３人で飲みます！！<br/>
                                            友達も誘えるカワイイ女の子いますか？？？<br/>
                                            ２時間希望<br/>
                                            お礼はいつもより多く２時間で15万円出すし、往復タク代と、楽しかったらチップも渡します！！<br/>
                                            期待してくださいね！！<br/>
                                            期待してますね！！
                                        </div>
                                        <div className={'chat-section'}>
                                            <img src={"images/profile-page-images/okuru.png"}/>
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