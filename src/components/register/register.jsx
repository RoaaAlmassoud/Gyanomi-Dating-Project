import React from 'react';
import {Grid, Form, Input, TextArea} from 'semantic-ui-react'

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.gender = window.name;
        this.images = [
            {
                src: `images/register-images/talk_icon_${this.gender}.jpg`,
                text: '必須：アイコン画像',
                color: 'red'
            },
            {
                src: `images/register-images/${this.gender}1_b.jpg`,
                text: '必須：トップ画像 ①',
                color: 'red'
            },
            {
                src: `images/register-images/${this.gender}2_b.jpg`,
                text: 'その他の画像 ②',
                color: ''
            },
            {
                src: `images/register-images/${this.gender}3_b.jpg`,
                text: 'その他の画像 ③',
                color: ''
            },
            {
                src: `images/register-images/${this.gender}4_b.jpg`,
                text: 'その他の画像 ④',
                color: ''
            },
            {
                src: `images/register-images/mibun_b.png`,
                text: '必須：身分証画像',
                color: 'red'
            }
        ]
    }

    render() {
        return (
            <Grid className={'register-container'}>
                <Grid.Row columns={1}>
                    <Grid.Column className={'images-section'} computer={16}>
                        <img
                            src={`images/register-images/${this.gender === 'female' ? 'touroku_02a.png' : 'touroku_01a.png'}`}
                            alt="利用料金"/>
                        <img
                            src={`images/register-images/${this.gender === 'female' ? 'touroku_04a.png' : 'touroku_03a.png'}`}
                            alt="利用料金"/>
                        <p className="image-text" style={{marginTop: '-0.5vh'}}>
                            {
                                this.gender === 'female' ?
                                    'いつでも解約可能：ご登録になると、お誘いツイート・お相手男性との個別トーク機能が追加されます。'
                                    :
                                    'いつでも解約可能：ご登録になると、お誘いツイート・お相手女性との個別トーク機能が追加されます。'
                            }
                        </p>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column computer={6}>
                        <Form className={'info-form'}>
                            <Form.Field inline>
                                <label>ご本名フルネーム：</label>
                                <Input placeholder={`${this.gender === 'female' ?
                                    '例：田中 花子' : '例：山田 太郎'}`}/>
                            </Form.Field>
                            <Form.Field inline>
                                <label>西暦生年月日：</label>
                                <div className={'birth-fields'}>
                                    <Input/>
                                    年
                                    <Input/>
                                    月
                                    <Input/>
                                    日
                                </div>
                            </Form.Field>
                            <Form.Field inline>
                                <label>ニックネーム ：</label>
                                <Input/>
                            </Form.Field>
                            <Form.Field inline>
                                <label>当サイト内での表記年齢：</label>
                                <div className={'age-fields'}>
                                    <Input/>
                                    歳
                                </div>
                            </Form.Field>
                            <Form.Field inline>
                                <label>都道府県 登録：</label>
                                <select>
                                    <option value="alea00" selected>全国版</option>
                                    <option label="" disabled="disabled"/>
                                    <option label="" disabled="disabled"/>
                                    <option value="" disabled="disabled">{'///// 東北・北海道エリア'}</option>
                                    <option value="alea01">北海道</option>
                                    <option value="alea02">青森県</option>
                                    <option value="alea03">岩手県</option>
                                    <option value="alea04">宮城県</option>
                                    <option value="alea05">秋田県</option>
                                    <option value="alea06">山形県</option>
                                    <option value="alea07">福島県</option>
                                    <option label="" disabled="disabled"/>
                                    <option label="" disabled="disabled"/>
                                    <option value="" disabled="disabled">{'///// 関東エリア'}</option>
                                    <option value="alea08">茨城県</option>
                                    <option value="alea09">栃木県</option>
                                    <option value="alea10">群馬県</option>
                                    <option value="alea11">埼玉県</option>
                                    <option value="alea12">千葉県</option>
                                    <option value="alea13">東京都</option>
                                    <option value="alea14">神奈川県</option>
                                    <option label="" disabled="disabled"/>
                                    <option label="" disabled="disabled"/>
                                    <option value="" disabled="disabled">{'///// 中部エリア'}</option>
                                    <option value="alea15">新潟県</option>
                                    <option value="alea16">富山県</option>
                                    <option value="alea17">石川県</option>
                                    <option value="alea18">福井県</option>
                                    <option value="alea19">山梨県</option>
                                    <option value="alea20">長野県</option>
                                    <option value="alea21">岐阜県</option>
                                    <option value="alea22">静岡県</option>
                                    <option value="alea23">愛知県</option>
                                    <option label="" disabled="disabled"/>
                                    <option label="" disabled="disabled"/>
                                    <option value="" disabled="disabled">{'///// 近畿エリア'}</option>
                                    <option value="alea24">三重県</option>
                                    <option value="alea25">滋賀県</option>
                                    <option value="alea26">京都府</option>
                                    <option value="alea27">大阪府</option>
                                    <option value="alea28">兵庫県</option>
                                    <option value="alea29">奈良県</option>
                                    <option value="alea30">和歌山県</option>
                                    <option label="" disabled="disabled"/>
                                    <option label="" disabled="disabled"/>
                                    <option value="" disabled="disabled">{'///// 中国・四国エリア'}</option>
                                    <option value="alea31">鳥取県</option>
                                    <option value="alea32">島根県</option>
                                    <option value="alea33">岡山県</option>
                                    <option value="alea34">広島県</option>
                                    <option value="alea35">山口県</option>
                                    <option value="alea36">徳島県</option>
                                    <option value="alea37">香川県</option>
                                    <option value="alea38">愛媛県</option>
                                    <option value="alea39">高知県</option>
                                    <option label="" disabled="disabled"/>
                                    <option label="" disabled="disabled"/>
                                    <option value="" disabled="disabled">{'///// 九州・沖縄エリア'}</option>
                                    <option value="alea40">福岡県</option>
                                    <option value="alea41">佐賀県</option>
                                    <option value="alea42">長崎県</option>
                                    <option value="alea43">熊本県</option>
                                    <option value="alea44">大分県</option>
                                    <option value="alea45">宮崎県</option>
                                    <option value="alea46">鹿児島県</option>
                                    <option value="alea47">沖縄県</option>
                                </select>
                            </Form.Field>
                            {
                                this.gender === 'female' ?
                                    <>
                                        <div>
                                            <Form.Field inline>
                                                <label>ここから先は</label>
                                                <p>秘密の場合、未入力でもＯＫ</p>
                                            </Form.Field>
                                            <Form.Field inline>
                                                <label>具体的なご職業 登録：</label>
                                                <Input placeholder={'例：学生/会社員/モデル 等'}/>
                                            </Form.Field>
                                            <Form.Field inline>
                                                <label>身長 / 体重：</label>
                                                <div className={'units-fields'}>
                                                    <Input/>
                                                    cm /
                                                    <Input/>
                                                    kg
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline>
                                                <label>３サイズ バスト / カップ：</label>
                                                <div className={'units-fields'}>
                                                    <Input/>
                                                    cm /
                                                    <Input/>
                                                    カップ
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline>
                                                <label>ウェスト：</label>
                                                <div className={'units-fields'}>
                                                    <Input/>
                                                    cm
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline>
                                                <label>ヒップ：</label>
                                                <div className={'units-fields'}>
                                                    <Input/>
                                                    cm
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline>
                                                <label>ギャラ飲みデート希望額：</label>
                                                <div className={'units-fields'}>
                                                    <Input/>
                                                    万円以上 / 1時間あたり
                                                </div>
                                            </Form.Field>
                                        </div>
                                        <hr/>
                                        <Form.Field inline>
                                            <label>登録メールアドレス：</label>
                                            <Input/>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>パスワード（半角英数）：</label>
                                            <Input/>
                                        </Form.Field>
                                    </>
                                    :
                                    <>
                                        <Form.Field inline>
                                            <label>具体的なご職業 登録：</label>
                                            <Input placeholder={'例：会社員/経営者/医師 等'}/>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>ご年収金額：</label>
                                            <div className={'units-fields'}>
                                                <Input/>
                                                万円以上
                                            </div>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>ギャラ飲みデート負担額：</label>
                                            <div className={'units-fields'}>
                                                <Input/>
                                                万円 /１時間あたり
                                            </div>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>女性へのタクシー代負担：</label>
                                            <div className={'units-fields'}>
                                                <Input/>
                                                万円まで
                                            </div>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>女性へのチップ負担：</label>
                                            <div className={'units-fields'}>
                                                <Input/>
                                                万円まで
                                            </div>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>登録メールアドレス：</label>
                                            <Input/>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>パスワード（半角英数）：</label>
                                            <Input/>
                                        </Form.Field>
                                        <hr/>
                                        <div className={'payment-section'}>
                                            <img src="images/register-images/card04.png"
                                                 alt="クレジットカード支払い"/>
                                            お支払いクレジットカード情報入力
                                            <p>登録完了後、1万円 / 30日毎の利用料金が自動引き落とし</p>
                                        </div>
                                        <Form.Field inline>
                                            <label>カード名義（半角英数）：</label>
                                            <Input/>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>カード番号：</label>
                                            <Input/>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>カード有効期限：</label>
                                            <div className={'card-expiration-section'}>
                                                <select>
                                                    <option label="" disabled="disabled" selected="">{''}</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                                月 /
                                                <select>
                                                    <option label="" disabled="disabled" selected="">{''}</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                </select>
                                                年
                                            </div>
                                        </Form.Field>
                                        <Form.Field inline>
                                            <label>セキュリティコード番号：</label>
                                            <div className={'units-fields'}>
                                                <Input/>
                                            </div>
                                        </Form.Field>
                                    </>
                            }
                            <Form.Group>

                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column computer={10}>
                        <div className={'extra-info'}>
                            <div className={'profile-photo-section'}>
                                <div className={'header-text'}>
                                    【 画像登録 】
                                    <p>
                                        {
                                            this.gender === 'female' ?
                                                '水着や下着などセクシーな画像まではＯＫ・裸の画像など、わいせつ性の有る画像は投稿厳禁'
                                                : '下半身露出など、わいせつ性の有る画像は投稿厳禁'
                                        }
                                    </p>
                                </div>
                                <div className={'all-images-section'}>
                                    {
                                        this.images.map((oneImage, index) => {
                                            return <div className={`one-image ${index === 0 ? 'round' : ''}
                                            ${oneImage.color === 'red' ? 'red' : ''}`}>
                                                <div className={`${index === 0 ? 'height' : ''}`}>
                                                    <img className={'main-image'} src={oneImage.src} alt={'main-image'}/>
                                                </div>
                                                <p>{oneImage.text}</p>
                                                <img src="images/register-images/sentaku01.png" alt={'first-image'}
                                                     style={{width: '55%', marginRight: '10%', cursor: 'pointer'}}/>
                                                <img src="images/register-images/sentaku02.png" alt={'second-image'}
                                                     style={{width: '10%', cursor: 'pointer'}}/>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className={'warning-text'}>
                                    <p>
                                        {
                                            this.gender === 'female' ?
                                                '出来るだけ顔出し画像にすると、男性会員からのアクセスが大幅に増加し週間ランキングの上位表示となり注目されます。'
                                                : '出来るだけ顔出し画像にすると、女性会員からのアクセスが大幅に増加し週間ランキングの上位表示となり注目されます。'
                                        }
                                    </p>
                                </div>
                                <div className={'final-section'}>
                                    <div className={'text-area-section'}>
                                        <div>
                                            必須：自己PR文章（ 100文字 ）
                                            <p>
                                                わいせつな表現及び、売春を示唆する内容は厳禁）
                                            </p>
                                        </div>

                                        <TextArea maxlength="100" placeholder={`${this.gender === 'female' ?
                                            '例：趣味・好きな飲食店・男性の好みなど' : '例：趣味・好きな飲食店・女性の好みなど'}`}/>
                                    </div>
                                    <div className={'actions-section'}>
                                        ご登録前に、必ずお読み下さい
                                        <a href="kiyaku.pdf" target="_blank">
                                            <img src="images/register-images/kiyaku.png" alt="利用規約"/>
                                        </a>
                                        <p>※ 18歳未満の登録不可</p>
                                        <img className={'login-image'} src="images/register-images/nyukai01.png"
                                             alt="新規男性アカウント登録"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
