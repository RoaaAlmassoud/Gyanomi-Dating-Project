import React from 'react';
import {Grid, Form, Input, TextArea, Dimmer, Loader} from 'semantic-ui-react'
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email, match} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import Helper from "../../../utils/helper"
import update from "immutability-helper";
import AuthApi from "../api/auth-api";


export default class Register extends React.Component {
    static contextType = AppContext;
    femaleRegisterValidations = [
        ruleRunner("name", 'name', required),
        ruleRunner("email", 'email', required, email),
        ruleRunner("password", 'password', required),
        ruleRunner("icon_image", 'icon_image', required),
        ruleRunner("top_image", 'top_image', required),
        ruleRunner("id_image", 'id_image', required),
        ruleRunner("day", 'day', required),
        ruleRunner("month", 'month', required),
        ruleRunner("year", 'year', required),
        ruleRunner("nickname", 'nickname', required),
        ruleRunner("promotion_text", 'promotion_text', required),
        ruleRunner("age", 'age', required),
        ruleRunner("prefecture", 'prefecture', required),
        ruleRunner("occupation", 'occupation', required),
        ruleRunner("height", 'height', required),
        ruleRunner("weight", 'weight', required),
        ruleRunner("bust", 'bust', required),
        ruleRunner("cup", 'cup', required),
        ruleRunner("waist", 'waist', required),
        ruleRunner("hip", 'hip', required),
        ruleRunner("desired_amount", 'desired_amount', required),

    ];
    maleRegisterValidations = [
        ruleRunner("name", 'Full name', required),
        ruleRunner("email", 'email', required, email),
        ruleRunner("password", 'password', required),
        ruleRunner("icon_image", 'icon_image', required),
        ruleRunner("top_image", 'top_image', required),
        ruleRunner("id_image", 'id_image', required),
        ruleRunner("day", 'day', required),
        ruleRunner("month", 'month', required),
        ruleRunner("year", 'year', required),
        ruleRunner("nickname", 'nickname', required),
        ruleRunner("promotion_text", 'promotion_text', required),
        ruleRunner("age", 'age', required),
        ruleRunner("prefecture", 'prefecture', required),
        ruleRunner("occupation", 'occupation', required),
        ruleRunner("annual_income", 'annual_income', required),
        ruleRunner("thank_you_amount", 'thank_you_amount', required),
        ruleRunner("taxi_fee", 'taxi_fee', required),
        ruleRunner("tip", 'tip', required),
    ];

    constructor(props) {
        super(props);
        this.authApi = new AuthApi(this);
        this.gender = window.name;
        this.userId = this.props ? this.props.match.params.id : '';
        this.state = {
            validationErrors: {},
            showErrors: false,
            loaded: !Helper.emptyString(this.userId),
            user: this.gender === "female" ? {
                    "name": "",
                    "email": "",
                    "password": "",
                    "is_male": false,
                    "icon_image": null,
                    "top_image": null,
                    "id_image": null,
                    "image1": "",
                    "image2": "",
                    "image3": "",
                    "day": '',
                    'month': '',
                    'year': '',
                    'nickname': '',
                    "promotion_text": "",
                    "age": "",
                    "prefecture": null,
                    "occupation": "",
                    "height": 0,
                    "weight": 0,
                    "bust": 0,
                    "cup": "",
                    "waist": 0,
                    "hip": 0,
                    "desired_amount": 0
                } :
                {
                    "name": "",
                    "email": "",
                    "password": "",
                    "is_male": true,
                    "icon_image": "",
                    "top_image": "",
                    "id_image": "",
                    "image1": "",
                    "image2": "",
                    "image3": "",
                    "day": '',
                    'month': '',
                    'year': '',
                    'nickname': '',
                    "promotion_text": "",
                    "age": "",
                    "prefecture": null,
                    "occupation": "",
                    "height": 0,
                    "annual_income": "",
                    "thank_you_amount": 0,
                    "taxi_fee": "",
                    "tip": 0
                },
            images: []

        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.user,
                this.gender === 'female' ? this.femaleRegisterValidations : this.maleRegisterValidations)
        });

    };

    async componentDidMount() {
        let footerSection = document.getElementById('footer-section')
        if (footerSection) {
            footerSection.style.display = 'none';
        }
        let returnedGender = window.name;
        let user = this.state.user
        let userResponse = null;
        if (this.userId) {
            userResponse = await this.authApi.getUserById({id: this.userId});

            if(userResponse.data){
                returnedGender = userResponse.data.data.user.is_male ? 'male' : 'female';
                let fullResponse = userResponse.data ? Object.assign({}, userResponse.data.data.user) : {}
                let genderObject = fullResponse[returnedGender];
                delete userResponse.data.data.user['male'];
                let ApiURL = "http://api.gyanomi.com/";
                user = {...userResponse.data.data.user, ...genderObject};
                user.top_image = user.top_image.includes("http://api.gyanomi.com/") ?
                    user.top_image : ApiURL + user.top_image;
                user.id_image = user.id_image.includes("http://api.gyanomi.com/") ?
                    user.id_image : ApiURL + user.id_image;
                user.icon_image = user.icon_image.includes("http://api.gyanomi.com/") ?
                    user.icon_image : ApiURL + user.icon_image;
                user.image1 = user.image1 ? ApiURL + user.image1 : null;
                user.image2 = user.image2 ? ApiURL + user.image2 : null;
                user.image3 = user.image3 ? ApiURL + user.image3 : null;
                this.gender = returnedGender;
            }

        } else {

        }
        let images = [
            {
                name: 'icon_image',
                src: `/images/register-images/talk_icon_${returnedGender}.jpg`,
                text: '必須：アイコン画像',
                color: 'red'
            },
            {
                name: 'top_image',
                src: `/images/register-images/${returnedGender}1_b.jpg`,
                text: '必須：トップ画像 ①',
                color: 'red'
            },
            {
                name: 'image1',
                src: `/images/register-images/${returnedGender}2_b.jpg`,
                text: 'その他の画像 ②',
                color: ''
            },
            {
                name: 'image2',
                src: `/images/register-images/${returnedGender}3_b.jpg`,
                text: 'その他の画像 ③',
                color: ''
            },
            {
                name: 'image3',
                src: `/images/register-images/${returnedGender}4_b.jpg`,
                text: 'その他の画像 ④',
                color: ''
            },
            {
                name: 'id_image',
                src: `/images/register-images/mibun_b.png`,
                text: '必須：身分証画像',
                color: 'red'
            }
        ]
        this.setState({
            loaded: false,
            images: images,
            user: user
        }, this.validateState);
    }

    componentWillUnmount() {
        let footerSection = document.getElementById('footer-section')
        if (footerSection) {
            footerSection.style.display = 'block';
        }
    }

    registerFunction = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {user} = this.state;
        let requestBody = {}
        if (typeof user.top_image.name === 'string') {
            requestBody.top_image = user.top_image
        }
        if (typeof user.icon_image.name === 'string') {
            requestBody.icon_image = user.icon_image
        }
        if (typeof user.id_image.name === 'string') {
            requestBody.id_image = user.id_image
        }

        if (user.image1) {
            if (typeof user.image1.name === 'string') {
                requestBody.image1 = user.image1
            }
        }
        if (user.image2) {
            if (typeof user.image2.name === 'string') {
                requestBody.image2 = user.image2
            }
        }
        if (user.image3) {
            if (typeof user.image3.name === 'string') {
                requestBody.image3 = user.image3
            }
        }
        this.setState({loaded: true});
        const response = await this.authApi.uploadPhotos(requestBody);
        if (response.data) {
            let body = {
                "name": user.name,
                "email": user.email,
                "password": user.password,
                "is_male": user.is_male,
                "icon_image": response.data.data.uploads.icon_image ? response.data.data.uploads.icon_image : user.icon_image,
                "top_image": response.data.data.uploads.top_image ? response.data.data.uploads.top_image : user.top_image,
                "id_image": response.data.data.uploads.id_image ? response.data.data.uploads.id_image : user.id_image,
                "promotion_text": user.promotion_text,
                "day": user.day,
                'month': user.month,
                'year': user.year,
                'nickname': user.nickname,
            };

            if (user.image1) {
                body.image1 = response.data.data.uploads.image1 ? response.data.data.uploads.image1 : user.image1
            }
            if (user.image2) {
                body.image2 = response.data.data.uploads.image2 ? response.data.data.uploads.image2 : user.image2
            }
            if (user.image3) {
                body.image3 = response.data.data.uploads.image3 ? response.data.data.uploads.image3 : user.image3
            }

            if (user.is_male) {
                body.male = {
                    "age": user.age,
                    "prefecture": parseInt(user.prefecture),
                    "occupation": user.occupation,
                    "height": parseInt(user.height),
                    "annual_income": user.annual_income,
                    "thank_you_amount": parseInt(user.thank_you_amount),
                    "taxi_fee": user.taxi_fee,
                    "tip": parseInt(user.tip)
                }
            } else {
                body.female = {
                    "age": user.age,
                    "prefecture": parseInt(user.prefecture),
                    "occupation": user.occupation,
                    "height": parseInt(user.height),
                    "weight": parseInt(user.weight),
                    "bust": parseInt(user.bust),
                    "cup": user.cup,
                    "waist": parseInt(user.waist),
                    "hip": parseInt(user.hip),
                    "desired_amount": parseInt(user.desired_amount)
                }
            }
            const registerResponse = this.userId ? await this.authApi.updateAccount(body) : await this.authApi.register(body);
            this.setState({loaded: false});
            if (registerResponse.data) {
                this.props.notify(false, 'Operation completed successfully')
                if (!this.userId) {
                    localStorage.setItem('token', registerResponse.data.data.token)
                    localStorage.setItem('accountId', registerResponse.data.data.user.uuid)
                    localStorage.setItem('name', user.name)
                    localStorage.setItem('gender', registerResponse.data.data.user.is_male ? 'male' : 'female')
                }
                if (registerResponse.data.data.user.is_male) {
                    this.props.history.push('/top_m00')
                } else {
                    this.props.history.push('/top_g00')
                }
            } else {
                this.props.notify(true, registerResponse.message ? registerResponse.message : 'Error! please try again')
            }
        }

    };

    handleImageChanged = (event, data, field) => {
        let file = event.target.files[0];
        this.setState({
            user: update(this.state.user, {
                [field]: {
                    $set: file
                }
            }),
        }, () => {
            let reader = new FileReader();
            // it's onload event and you forgot (parameters)
            reader.onload = function (e) {
                let image = document.getElementById(field);
                // the result image data
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
            this.validateState();
        });
    };

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                user: update(this.state.user, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    onChange = (value) => {
        let selectElement = document.getElementById(value);
        if (selectElement) {
            this.setState({
                user: update(this.state.user, {
                    prefecture: {
                        $set: selectElement.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    deleteImage = (imageObject) => {
        this.setState({
            user: update(this.state.user, {
                [imageObject.name]: {
                    $set: ''
                }
            }),
        }, () => {
            this.validateState();
        });
    }

    render() {
        let {user, loaded} = this.state;
        const nameError = this.context.errorFor(this.state, 'name', null, true);
        const emailError = this.context.errorFor(this.state, 'email', null, true);
        const passwordError = this.context.errorFor(this.state, 'password', null, true);
        const top_image = this.context.errorFor(this.state, 'top_image', null, true);
        const icon_image = this.context.errorFor(this.state, 'icon_image', null, true);
        const id_image = this.context.errorFor(this.state, 'id_image', null, true);
        const promotionTextError = this.context.errorFor(this.state, 'promotion_text', null, true);
        const dayError = this.context.errorFor(this.state, 'day', null, true);
        const monthError = this.context.errorFor(this.state, 'month', null, true);
        const yearError = this.context.errorFor(this.state, 'year', null, true);
        const nicknameError = this.context.errorFor(this.state, 'nickname', null, true);
        const ageError = this.context.errorFor(this.state, 'age', null, true);
        const prefectureError = this.context.errorFor(this.state, 'prefecture', null, true);
        const occupationError = this.context.errorFor(this.state, 'occupation', null, true);
        const heightError = this.context.errorFor(this.state, 'height', null, true);
        const annualIncomeError = this.context.errorFor(this.state, 'annual_income', null, true);
        const thanksAmountError = this.context.errorFor(this.state, 'thank_you_amount', null, true);
        const taxiFeeError = this.context.errorFor(this.state, 'taxi_fee', null, true);
        const tipError = this.context.errorFor(this.state, 'tip', null, true);
        const weightError = this.context.errorFor(this.state, 'weight', null, true);
        const bustError = this.context.errorFor(this.state, 'bust', null, true);
        const cupError = this.context.errorFor(this.state, 'cup', null, true);
        const waistError = this.context.errorFor(this.state, 'waist', null, true);
        const hipError = this.context.errorFor(this.state, 'hip', null, true);
        const desiredAmountError = this.context.errorFor(this.state, 'desired_amount', null, true);

        return (
            <>
                <Dimmer active={loaded}>
                    <Loader/>
                </Dimmer>
                <Grid className={'register-container'}>

                    <Grid.Row columns={1}>
                        <Grid.Column className={'images-section'} computer={16}>
                            <img
                                src={`/images/register-images/${this.gender === 'female' ? 'touroku_02a.png' : 'touroku_01a.png'}`}
                                alt="利用料金"/>
                            <img
                                src={`/images/register-images/${this.gender === 'female' ? 'touroku_04a.png' : 'touroku_03a.png'}`}
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
                                <Form.Field inline required error={!!nameError}>
                                    <label>ご本名フルネーム：</label>
                                    <Input placeholder={`${this.gender === 'female' ?
                                        '例：田中 花子' : '例：山田 太郎'}`}
                                           value={user.name ? user.name : ''}
                                           onChange={this.handleFieldChange('name')}
                                    />
                                </Form.Field>
                                <Form.Field inline required error={!!dayError || !!monthError || !!yearError}>
                                    <label>西暦生年月日：</label>
                                    <div className={'birth-fields'}>
                                        <Input
                                            type={'number'}
                                            value={user.day ? user.day : ''}
                                            onChange={this.handleFieldChange('day')}
                                        />
                                        年
                                        <Input
                                            type={'number'}
                                            value={user.month ? user.month : ''}
                                            onChange={this.handleFieldChange('month')}
                                        />
                                        月
                                        <Input
                                            type={'number'}
                                            value={user.year ? user.year : ''}
                                            onChange={this.handleFieldChange('year')}
                                        />
                                        日
                                    </div>
                                </Form.Field>
                                <Form.Field inline required error={!!nicknameError}>
                                    <label>ニックネーム ：</label>
                                    <Input
                                        value={user.nickname ? user.nickname : ''}
                                        onChange={this.handleFieldChange('nickname')}
                                    />
                                </Form.Field>
                                <Form.Field inline error={!!ageError}>
                                    <label>当サイト内での表記年齢：</label>
                                    <div className={'age-fields'}>
                                        <Input
                                            type={'number'}
                                            value={user.age ? user.age : ''}
                                            onChange={this.handleFieldChange('age')}
                                        />
                                        歳
                                    </div>
                                </Form.Field>
                                <Form.Field inline required error={!!prefectureError}>
                                    <label>都道府県 登録：</label>
                                    <select
                                        id={`${user.is_male ? 'male_prefecture' : 'female_prefecture'}`}
                                        value={user.prefecture ? user.prefecture : ''}
                                        onChange={() => this.onChange(`${user.is_male ? 'male_prefecture' : 'female_prefecture'}`)}>
                                        <option value="0" selected>全国版</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// 東北・北海道エリア'}</option>
                                        <option value="1">北海道</option>
                                        <option value="2">青森県</option>
                                        <option value="3">岩手県</option>
                                        <option value="4">宮城県</option>
                                        <option value="5">秋田県</option>
                                        <option value="6">山形県</option>
                                        <option value="7">福島県</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// 関東エリア'}</option>
                                        <option value="8">茨城県</option>
                                        <option value="9">栃木県</option>
                                        <option value="10">群馬県</option>
                                        <option value="11">埼玉県</option>
                                        <option value="12">千葉県</option>
                                        <option value="13">東京都</option>
                                        <option value="14">神奈川県</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// 中部エリア'}</option>
                                        <option value="15">新潟県</option>
                                        <option value="16">富山県</option>
                                        <option value="17">石川県</option>
                                        <option value="18">福井県</option>
                                        <option value="19">山梨県</option>
                                        <option value="20">長野県</option>
                                        <option value="21">岐阜県</option>
                                        <option value="22">静岡県</option>
                                        <option value="23">愛知県</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// 近畿エリア'}</option>
                                        <option value="24">三重県</option>
                                        <option value="25">滋賀県</option>
                                        <option value="26">京都府</option>
                                        <option value="27">大阪府</option>
                                        <option value="28">兵庫県</option>
                                        <option value="29">奈良県</option>
                                        <option value="30">和歌山県</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// 中国・四国エリア'}</option>
                                        <option value="31">鳥取県</option>
                                        <option value="32">島根県</option>
                                        <option value="33">岡山県</option>
                                        <option value="34">広島県</option>
                                        <option value="35">山口県</option>
                                        <option value="36">徳島県</option>
                                        <option value="37">香川県</option>
                                        <option value="38">愛媛県</option>
                                        <option value="39">高知県</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// 九州・沖縄エリア'}</option>
                                        <option value="40">福岡県</option>
                                        <option value="41">佐賀県</option>
                                        <option value="42">長崎県</option>
                                        <option value="43">熊本県</option>
                                        <option value="44">大分県</option>
                                        <option value="45">宮崎県</option>
                                        <option value="46">鹿児島県</option>
                                        <option value="47">沖縄県</option>
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
                                                <Form.Field inline required error={!!occupationError}>
                                                    <label>具体的なご職業 登録：</label>
                                                    <Input placeholder={'例：学生/会社員/モデル 等'}
                                                           value={user.occupation ? user.occupation : ''}
                                                           onChange={this.handleFieldChange('occupation')}
                                                    />
                                                </Form.Field>
                                                <Form.Field inline required error={!!heightError || !!weightError}>
                                                    <label>身長 / 体重：</label>
                                                    <div className={'units-fields'}>
                                                        <Input
                                                            type={'number'}
                                                            value={user.height ? user.height : ''}
                                                            onChange={this.handleFieldChange('height')}
                                                        />
                                                        cm /
                                                        <Input
                                                            type={'number'}
                                                            value={user.weight ? user.weight : ''}
                                                            onChange={this.handleFieldChange('weight')}
                                                        />
                                                        kg
                                                    </div>
                                                </Form.Field>
                                                <Form.Field inline required error={!!bustError || !!cupError}>
                                                    <label>３サイズ バスト / カップ：</label>
                                                    <div className={'units-fields'}>
                                                        <Input
                                                            type={'number'}
                                                            value={user.bust ? user.bust : ''}
                                                            onChange={this.handleFieldChange('bust')}
                                                        />
                                                        cm /
                                                        <Input
                                                            value={user.cup ? user.cup : ''}
                                                            onChange={this.handleFieldChange('cup')}
                                                        />
                                                        カップ
                                                    </div>
                                                </Form.Field>
                                                <Form.Field inline required error={!!waistError}>
                                                    <label>ウェスト：</label>
                                                    <div className={'units-fields'}>
                                                        <Input
                                                            type={'number'}
                                                            value={user.waist ? user.waist : ''}
                                                            onChange={this.handleFieldChange('waist')}
                                                        />
                                                        cm
                                                    </div>
                                                </Form.Field>
                                                <Form.Field inline required error={!!hipError}>
                                                    <label>ヒップ：</label>
                                                    <div className={'units-fields'}>
                                                        <Input
                                                            type={'number'}
                                                            value={user.hip ? user.hip : ''}
                                                            onChange={this.handleFieldChange('hip')}
                                                        />
                                                        cm
                                                    </div>
                                                </Form.Field>
                                                <Form.Field inline required error={!!desiredAmountError}>
                                                    <label>ギャラ飲みデート希望額：</label>
                                                    <div className={'units-fields'}>
                                                        <Input
                                                            type={'number'}
                                                            value={user.desired_amount ? user.desired_amount : ''}
                                                            onChange={this.handleFieldChange('desired_amount')}
                                                        />
                                                        万円以上 / 1時間あたり
                                                    </div>
                                                </Form.Field>
                                            </div>
                                            <hr/>
                                            <Form.Field inline required error={!!emailError}>
                                                <label>登録メールアドレス：</label>
                                                <Input
                                                    value={user.email ? user.email : ''}
                                                    onChange={this.handleFieldChange('email')}
                                                />
                                            </Form.Field>
                                            <Form.Field inline required error={!!passwordError}>
                                                <label>パスワード（半角英数）：</label>
                                                <Input
                                                    type={'password'}
                                                    value={user.password ? user.password : ''}
                                                    onChange={this.handleFieldChange('password')}
                                                />
                                            </Form.Field>
                                        </>
                                        :
                                        <>
                                            <Form.Field inline required error={!!occupationError}>
                                                <label>具体的なご職業 登録：</label>
                                                <Input placeholder={'例：会社員/経営者/医師 等'}
                                                       value={user.occupation ? user.occupation : ''}
                                                       onChange={this.handleFieldChange('occupation')}
                                                />
                                            </Form.Field>
                                            <Form.Field inline required error={!!annualIncomeError}>
                                                <label>ご年収金額：</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.annual_income ? user.annual_income : ''}
                                                        onChange={this.handleFieldChange('annual_income')}
                                                    />
                                                    万円以上
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!thanksAmountError}>
                                                <label>ギャラ飲みデート負担額：</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.thank_you_amount ? user.thank_you_amount : ''}
                                                        onChange={this.handleFieldChange('thank_you_amount')}
                                                    />
                                                    万円 /１時間あたり
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!taxiFeeError}>
                                                <label>女性へのタクシー代負担：</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.taxi_fee ? user.taxi_fee : ''}
                                                        onChange={this.handleFieldChange('taxi_fee')}
                                                    />
                                                    万円まで
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!tipError}>
                                                <label>女性へのチップ負担：</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.tip ? user.tip : ''}
                                                        onChange={this.handleFieldChange('tip')}
                                                    />
                                                    万円まで
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!emailError}>
                                                <label>登録メールアドレス：</label>
                                                <Input
                                                    value={user.email ? user.email : ''}
                                                    onChange={this.handleFieldChange('email')}
                                                />
                                            </Form.Field>
                                            <Form.Field inline required error={!!passwordError}>
                                                <label>パスワード（半角英数）：</label>
                                                <Input
                                                    type={'password'}
                                                    value={user.password ? user.password : ''}
                                                    onChange={this.handleFieldChange('password')}
                                                />
                                            </Form.Field>
                                            <hr/>
                                            <div className={'payment-section'}>
                                                <img src="/images/register-images/card04.png"
                                                     alt="クレジットカード支払い"/>
                                                お支払いクレジットカード情報入力
                                                <p>登録完了後、1万円 / 30日毎の利用料金が自動引き落とし</p>
                                            </div>
                                            <Form.Field inline required>
                                                <label>カード名義（半角英数）：</label>
                                                <Input/>
                                            </Form.Field>
                                            <Form.Field inline required>
                                                <label>カード番号：</label>
                                                <Input/>
                                            </Form.Field>
                                            <Form.Field inline required>
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
                                            <Form.Field inline required>
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
                                    <Form>
                                        <div className={'all-images-section'}>
                                            {
                                                this.state.images.map((oneImage, index) => {
                                                    let errorObject = oneImage.color === 'red' ?
                                                        oneImage.name === 'top_image' ? top_image : oneImage.name === 'icon_image' ?
                                                            icon_image : oneImage.name === 'id_image' ? id_image : null : null;
                                                    return (
                                                        <Form.Field required
                                                                    error={oneImage.color === 'red' && !![oneImage.name]}>
                                                            <div className={`one-image ${index === 0 ? 'round' : ''}
                                            ${oneImage.color === 'red' ? 'red' : ''}`}>
                                                                <div
                                                                    className={`${index === 0 ? 'height' : 'without-height'}
                                                            ${errorObject ? 'with-border' : ''}`}>
                                                                    <img id={oneImage.name} className={'main-image'}
                                                                         src={this.state.user ?
                                                                             !Helper.emptyString(this.state.user[oneImage.name]) ?
                                                                                 this.state.user[oneImage.name] : oneImage.src : oneImage.src}
                                                                         alt={'main-image'}/>
                                                                </div>
                                                                <p>{oneImage.text}</p>
                                                                <div className={'wrapper-section'}>
                                                                    <div className="wrapper">
                                                                        <img src="/images/register-images/sentaku01.png"
                                                                             className={'upload-photo'}
                                                                             alt={'first-image'}
                                                                        />
                                                                        <input type="file"
                                                                               accept="image/x-png,image/gif,image/jpeg"
                                                                               onChange={(event, data) => this.handleImageChanged(event, data, oneImage.name)}/>

                                                                    </div>
                                                                    <div className={'delete-section'}>
                                                                        <img src="/images/register-images/sentaku02.png"
                                                                             alt={'second-image'}
                                                                             onClick={() => this.deleteImage(oneImage)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Form.Field>
                                                    )
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
                                            <Form.Field required error={!!promotionTextError}>
                                                <div className={'text-area-section'}>
                                                    <div>
                                                        必須：自己PR文章（ 100文字 ）
                                                        <p>
                                                            わいせつな表現及び、売春を示唆する内容は厳禁）
                                                        </p>
                                                    </div>

                                                    <TextArea maxLength="100" placeholder={`${this.gender === 'female' ?
                                                        '例：趣味・好きな飲食店・男性の好みなど' : '例：趣味・好きな飲食店・女性の好みなど'}`}
                                                              value={user.promotion_text ? user.promotion_text : ''}
                                                              onChange={this.handleFieldChange('promotion_text')}
                                                    />
                                                </div>
                                            </Form.Field>
                                            <div className={'actions-section'}>
                                                ご登録前に、必ずお読み下さい
                                                <a href={process.env.PUBLIC_URL + '/kiyaku.pdf'} target="_blank">
                                                    <img src="/images/register-images/kiyaku.png" alt="利用規約"/>
                                                </a>
                                                <p>※ 18歳未満の登録不可</p>
                                                <img onClick={() => this.registerFunction()} className={'login-image'}
                                                     src={`/images/register-images/${this.userId ? 'bt_henkousuru.png' : 'nyukai01.png'}`}
                                                     alt="新規男性アカウント登録"/>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}
