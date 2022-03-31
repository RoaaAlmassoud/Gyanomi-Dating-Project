import React, {Component} from 'react';
import {Form, Input, Button} from 'semantic-ui-react'
import {ruleRunner, run} from "../../utils/ruleRunner";
import {required, email} from "../../utils/rules";
import AppContext from "../../context/app-context";
import update from "immutability-helper";
import Helper from "../../utils/helper";
import AuthApi from "../register/api/auth-api"

export default class SideMenu extends Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("email", 'email', required, email),
        ruleRunner("password", 'password', required)]

    constructor(props) {
        super(props);
        this.authApi = new AuthApi(this);
        this.restaurantsList = [
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
        ]
        this.state = {
            validationErrors: {},
            showErrors: false,
            loaded: false,
            loginForm: {
                email: "",
                password: ""
            }
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.loginForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                loginForm: update(this.state.loginForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    login = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {loginForm} = this.state;
        this.setState({loaded: true});
        const loginResponse = await this.authApi.login(loginForm);
        this.setState({loaded: false});
        if (loginResponse.data) {
            localStorage.setItem('token', loginResponse.data.data.token)
            localStorage.setItem('accountId', loginResponse.data.data.user.uuid)
            localStorage.setItem('name', loginResponse.data.data.user.name)
            localStorage.setItem('gender', loginResponse.data.data.user.is_male? 'male': 'female')
            window.location.reload(true)
        }

    };

    render() {
        let {loginForm, loaded} = this.state;
        const emailError = this.context.errorFor(this.state, 'email', null, true);
        const passwordError = this.context.errorFor(this.state, 'password', null, true);
        return (
            <div className={'main-menu-column'}>
                {
                    localStorage.getItem('token') ?
                        <div className={'empty-div'}></div>
                        :
                        <>
                            <Form className={'login-form'}>
                                <Form.Field required error={!!emailError}>
                                    <label>登録メールアドレス</label>
                                    <Input type={'text'}
                                           value={loginForm.email ? loginForm.email : ''}
                                           onChange={this.handleFieldChange('email')}
                                    />
                                </Form.Field>
                                <Form.Field required error={!!passwordError}>
                                    <label>パスワード</label>
                                    <Input type={'password'}
                                           value={loginForm.password ? loginForm.password : ''}
                                           onChange={this.handleFieldChange('password')}
                                    />
                                    {/*<p>お忘れの場合 ganomi と入力</p>*/}
                                </Form.Field>
                            </Form>
                            <div className={'actions-section'}>
                                <Button loading={loaded} className={`${loaded? 'with-opacity': ''}`}>
                                    <img src={"images/login.png"}
                                         alt={'img'}
                                         onClick={() => this.login()}
                                    />
                                </Button>
                            </div>
                        </>
                }


                <div className={'restaurant-section'}>
                    <p className={'title'}>GANOMI 特典付き飲食店</p>
                    <div className={'restaurant-elements'}>
                        <div style={{height: '50vh', overflow: 'hidden'}}>
                            <div className="slide-section" data-style="slide-section">
                                {
                                    this.restaurantsList.map((restaurant, index) => {
                                        return <div key={index} className="restaurant-element">
                                            <p className={'name'}>{restaurant.name}</p>
                                            <p>{restaurant.serving}</p>
                                            <div className={'restaurant-location'}>
                                                <img className={'map-img'} src={"images/map.png"} alt={'img'}/>
                                                <p>{restaurant.location}</p>
                                                <p>{restaurant.building}</p>
                                            </div>
                                            <div className={'restaurant-images'}>
                                                {restaurant.images.map((image, index) => {
                                                    return <img className={'restaurant-img'} src={image}
                                                                key={index} alt={'img'}/>
                                                })}
                                            </div>
                                            <div className={'left-img'}>
                                                <img src={"images/bt_syousai01.png"} key={index} alt={'img'}/>
                                            </div>
                                            <div className={'working-hours'}>
                                                <p>{restaurant.workingHours}</p>
                                                <p>{restaurant.timeOff}</p>
                                            </div>
                                            <hr/>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <p className={'footer'}>
                        飲食店 広告掲載案内
                    </p>
                </div>
            </div>
        )
    }
}