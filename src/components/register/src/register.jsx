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
        this.pathName = props.location? props.location.pathname: '';
        this.gender = window.name? window.name: 'male';
        this.userId = this.props ? this.props.match.params.id : '';
        this.affiliateId = this.pathName? this.pathName.includes('register')?  props.match.params.id?
            props.match.params.id: '': '': ''
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
        let returnedGender = window.name? window.name: 'male';
        let user = this.state.user
        let userResponse = null;
        if (this.userId && !this.affiliateId) {
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
                text: '???????????????????????????',
                color: 'red'
            },
            {
                name: 'top_image',
                src: `/images/register-images/${returnedGender}1_b.jpg`,
                text: '???????????????????????? ???',
                color: 'red'
            },
            {
                name: 'image1',
                src: `/images/register-images/${returnedGender}2_b.jpg`,
                text: '?????????????????? ???',
                color: ''
            },
            {
                name: 'image2',
                src: `/images/register-images/${returnedGender}3_b.jpg`,
                text: '?????????????????? ???',
                color: ''
            },
            {
                name: 'image3',
                src: `/images/register-images/${returnedGender}4_b.jpg`,
                text: '?????????????????? ???',
                color: ''
            },
            {
                name: 'id_image',
                src: `/images/register-images/mibun_b.png`,
                text: '????????????????????????',
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

            if(this.affiliateId){
                body.affiliation_id = this.affiliateId
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
                    localStorage.setItem('email', registerResponse.data.data.user.email)
                    if (registerResponse.data.data.user.is_male) {
                        this.props.history.push('/top_m00')
                    } else {
                        this.props.history.push('/top_g00')
                    }
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

    changeGender = () => {
        if(window.name === 'male'){
            window.name = 'female'
        } else {
            window.name = 'male'
        }
        window.location.reload(true)
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

        let gender= window.name? window.name: 'male';
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
                                alt="????????????"/>
                            <img
                                src={`/images/register-images/${this.gender === 'female' ? 'touroku_04a.png' : 'touroku_03a.png'}`}
                                alt="????????????"/>
                            <p className="image-text" style={{marginTop: '-0.5vh'}}>
                                {
                                    this.gender === 'female' ?
                                        '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                                        :
                                        '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                                }
                            </p>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column computer={6}>
                            <Form className={'info-form'}>
                                <Form.Field inline required error={!!nameError}>
                                    <label>???????????????????????????</label>
                                    <Input placeholder={`${this.gender === 'female' ?
                                        '???????????? ??????' : '???????????? ??????'}`}
                                           value={user.name ? user.name : ''}
                                           onChange={this.handleFieldChange('name')}
                                    />
                                </Form.Field>
                                <Form.Field inline required error={!!dayError || !!monthError || !!yearError}>
                                    <label>?????????????????????</label>
                                    <div className={'birth-fields'}>
                                        <Input
                                            type={'number'}
                                            value={user.day ? user.day : ''}
                                            onChange={this.handleFieldChange('day')}
                                        />
                                        ???
                                        <Input
                                            type={'number'}
                                            value={user.month ? user.month : ''}
                                            onChange={this.handleFieldChange('month')}
                                        />
                                        ???
                                        <Input
                                            type={'number'}
                                            value={user.year ? user.year : ''}
                                            onChange={this.handleFieldChange('year')}
                                        />
                                        ???
                                    </div>
                                </Form.Field>
                                <Form.Field inline required error={!!nicknameError}>
                                    <label>?????????????????? ???</label>
                                    <Input
                                        value={user.nickname ? user.nickname : ''}
                                        onChange={this.handleFieldChange('nickname')}
                                    />
                                </Form.Field>
                                <Form.Field inline error={!!ageError}>
                                    <label>????????????????????????????????????</label>
                                    <div className={'age-fields'}>
                                        <Input
                                            type={'number'}
                                            value={user.age ? user.age : ''}
                                            onChange={this.handleFieldChange('age')}
                                        />
                                        ???
                                    </div>
                                </Form.Field>
                                <Form.Field inline required error={!!prefectureError}>
                                    <label>???????????? ?????????</label>
                                    <select
                                        id={`${user.is_male ? 'male_prefecture' : 'female_prefecture'}`}
                                        value={user.prefecture ? user.prefecture : ''}
                                        onChange={() => this.onChange(`${user.is_male ? 'male_prefecture' : 'female_prefecture'}`)}>
                                        <option value="0" selected>?????????</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// ???????????????????????????'}</option>
                                        <option value="1">?????????</option>
                                        <option value="2">?????????</option>
                                        <option value="3">?????????</option>
                                        <option value="4">?????????</option>
                                        <option value="5">?????????</option>
                                        <option value="6">?????????</option>
                                        <option value="7">?????????</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// ???????????????'}</option>
                                        <option value="8">?????????</option>
                                        <option value="9">?????????</option>
                                        <option value="10">?????????</option>
                                        <option value="11">?????????</option>
                                        <option value="12">?????????</option>
                                        <option value="13">?????????</option>
                                        <option value="14">????????????</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// ???????????????'}</option>
                                        <option value="15">?????????</option>
                                        <option value="16">?????????</option>
                                        <option value="17">?????????</option>
                                        <option value="18">?????????</option>
                                        <option value="19">?????????</option>
                                        <option value="20">?????????</option>
                                        <option value="21">?????????</option>
                                        <option value="22">?????????</option>
                                        <option value="23">?????????</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// ???????????????'}</option>
                                        <option value="24">?????????</option>
                                        <option value="25">?????????</option>
                                        <option value="26">?????????</option>
                                        <option value="27">?????????</option>
                                        <option value="28">?????????</option>
                                        <option value="29">?????????</option>
                                        <option value="30">????????????</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// ????????????????????????'}</option>
                                        <option value="31">?????????</option>
                                        <option value="32">?????????</option>
                                        <option value="33">?????????</option>
                                        <option value="34">?????????</option>
                                        <option value="35">?????????</option>
                                        <option value="36">?????????</option>
                                        <option value="37">?????????</option>
                                        <option value="38">?????????</option>
                                        <option value="39">?????????</option>
                                        <option label="" disabled="disabled"/>
                                        <option label="" disabled="disabled"/>
                                        <option value="" disabled="disabled">{'///// ????????????????????????'}</option>
                                        <option value="40">?????????</option>
                                        <option value="41">?????????</option>
                                        <option value="42">?????????</option>
                                        <option value="43">?????????</option>
                                        <option value="44">?????????</option>
                                        <option value="45">?????????</option>
                                        <option value="46">????????????</option>
                                        <option value="47">?????????</option>
                                    </select>
                                </Form.Field>
                                {
                                    this.gender === 'female' ?
                                        <>
                                            <div>
                                                <Form.Field inline>
                                                    <label>??????????????????</label>
                                                    <p>???????????????????????????????????????</p>
                                                </Form.Field>
                                                <Form.Field inline required error={!!occupationError}>
                                                    <label>????????????????????? ?????????</label>
                                                    <Input placeholder={'????????????/?????????/????????? ???'}
                                                           value={user.occupation ? user.occupation : ''}
                                                           onChange={this.handleFieldChange('occupation')}
                                                    />
                                                </Form.Field>
                                                <Form.Field inline required error={!!heightError || !!weightError}>
                                                    <label>?????? / ?????????</label>
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
                                                    <label>???????????? ????????? / ????????????</label>
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
                                                        ?????????
                                                    </div>
                                                </Form.Field>
                                                <Form.Field inline required error={!!waistError}>
                                                    <label>???????????????</label>
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
                                                    <label>????????????</label>
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
                                                    <label>????????????????????????????????????</label>
                                                    <div className={'units-fields'}>
                                                        <Input
                                                            type={'number'}
                                                            value={user.desired_amount ? user.desired_amount : ''}
                                                            onChange={this.handleFieldChange('desired_amount')}
                                                        />
                                                        ???????????? / 1???????????????
                                                    </div>
                                                </Form.Field>
                                            </div>
                                            <hr/>
                                            <Form.Field inline required error={!!emailError}>
                                                <label>??????????????????????????????</label>
                                                <Input
                                                    value={user.email ? user.email : ''}
                                                    onChange={this.handleFieldChange('email')}
                                                />
                                            </Form.Field>
                                            <Form.Field inline required error={!!passwordError}>
                                                <label>????????????????????????????????????</label>
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
                                                <label>????????????????????? ?????????</label>
                                                <Input placeholder={'???????????????/?????????/?????? ???'}
                                                       value={user.occupation ? user.occupation : ''}
                                                       onChange={this.handleFieldChange('occupation')}
                                                />
                                            </Form.Field>
                                            <Form.Field inline required error={!!annualIncomeError}>
                                                <label>??????????????????</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.annual_income ? user.annual_income : ''}
                                                        onChange={this.handleFieldChange('annual_income')}
                                                    />
                                                    ????????????
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!thanksAmountError}>
                                                <label>????????????????????????????????????</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.thank_you_amount ? user.thank_you_amount : ''}
                                                        onChange={this.handleFieldChange('thank_you_amount')}
                                                    />
                                                    ?????? /??????????????????
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!taxiFeeError}>
                                                <label>????????????????????????????????????</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.taxi_fee ? user.taxi_fee : ''}
                                                        onChange={this.handleFieldChange('taxi_fee')}
                                                    />
                                                    ????????????
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!tipError}>
                                                <label>??????????????????????????????</label>
                                                <div className={'units-fields'}>
                                                    <Input
                                                        type={'number'}
                                                        value={user.tip ? user.tip : ''}
                                                        onChange={this.handleFieldChange('tip')}
                                                    />
                                                    ????????????
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required error={!!emailError}>
                                                <label>??????????????????????????????</label>
                                                <Input
                                                    value={user.email ? user.email : ''}
                                                    onChange={this.handleFieldChange('email')}
                                                />
                                            </Form.Field>
                                            <Form.Field inline required error={!!passwordError}>
                                                <label>????????????????????????????????????</label>
                                                <Input
                                                    type={'password'}
                                                    value={user.password ? user.password : ''}
                                                    onChange={this.handleFieldChange('password')}
                                                />
                                            </Form.Field>
                                            <hr/>
                                            <div className={'payment-section'}>
                                                <img src="/images/register-images/card04.png"
                                                     alt="?????????????????????????????????"/>
                                                ????????????????????????????????????????????????
                                                <p>??????????????????1?????? / 30?????????????????????????????????????????????</p>
                                            </div>
                                            <Form.Field inline required>
                                                <label>????????????????????????????????????</label>
                                                <Input/>
                                            </Form.Field>
                                            <Form.Field inline required>
                                                <label>??????????????????</label>
                                                <Input/>
                                            </Form.Field>
                                            <Form.Field inline required>
                                                <label>????????????????????????</label>
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
                                                    ??? /
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
                                                    ???
                                                </div>
                                            </Form.Field>
                                            <Form.Field inline required>
                                                <label>????????????????????????????????????</label>
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
                                        ??? ???????????? ???
                                        <p>
                                            {
                                                this.gender === 'female' ?
                                                    '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                                                    : '?????????????????????????????????????????????????????????????????????'
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
                                                        '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                                                        : '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                                                }
                                            </p>
                                        </div>
                                        <div className={'final-section'}>
                                            <Form.Field required error={!!promotionTextError}>
                                                <div className={'text-area-section'}>
                                                    <div>
                                                        ???????????????PR????????? 100?????? ???
                                                        <p>
                                                            ?????????????????????????????????????????????????????????????????????
                                                        </p>
                                                    </div>

                                                    <TextArea maxLength="100" placeholder={`${this.gender === 'female' ?
                                                        '?????????????????????????????????????????????????????????' : '?????????????????????????????????????????????????????????'}`}
                                                              value={user.promotion_text ? user.promotion_text : ''}
                                                              onChange={this.handleFieldChange('promotion_text')}
                                                    />
                                                </div>
                                            </Form.Field>
                                            <div className={'actions-section'}>
                                                ??????????????????????????????????????????
                                                <a href={process.env.PUBLIC_URL + '/kiyaku.pdf'} target="_blank">
                                                    <img src="/images/register-images/kiyaku.png" alt="????????????"/>
                                                </a>
                                                <p>??? 18????????????????????????</p>
                                                <img onClick={() => this.registerFunction()} className={'login-image'}
                                                     src={`/images/register-images/${this.userId ? 'bt_henkousuru.png' : 'nyukai01.png'}`}
                                                     alt="?????????????????????????????????"/>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {
                    this.affiliateId?
                        <div className={'register-button'} onClick={() => this.changeGender()}>
                            <img src={`${gender === 'male'? '/images/touroku_02.png': '/images/touroku_01.png'}`}/>
                        </div>
                        : null
                }

            </>
        )
    }
}
