import React from 'react';
import {Header, List, Modal, Form, Input, Grid} from 'semantic-ui-react'
import CodeModal from "./code-modal";
import RegisterModal from "./register-modal";
import Helper from "../../../utils/helper";
import AffiliateApi from "../api/affiliate-api"
import {ruleRunner, run} from "../../../utils/ruleRunner";
import update from "immutability-helper";
import AppContext from "../../../context/app-context";
import {email, required} from "../../../utils/rules";


export default class Affiliate extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("email", 'email', required, email),
        ruleRunner("password", 'password', required),
    ]
    constructor(props) {
        super(props);
        this.affiliateApi = new AffiliateApi(this)
        this.codeModalRef = React.createRef();
        this.registerModalRef = React.createRef();
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            loginForm: {
                email: "",
                password: ""
            },
            showLoginForm: localStorage.getItem('accountType') ?
                localStorage.getItem('accountType') === 'affiliate' : true
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.loginForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        let footerSection = document.getElementById('footer-section')
        if (footerSection) {
            footerSection.style.display = 'none';
        }
        this.validateState()
    }

    componentWillUnmount() {
        let footerSection = document.getElementById('footer-section')
        if (footerSection) {
            footerSection.style.display = 'block';
        }
    }

    imageClicked = (path) => {
        window.location.href = `/${path}`;
    };

    show = () => {
        this.setState({
            open: true
        })
    };

    hide = () => {
        this.setState({
            open: false
        })
    };

    showLoginForm = () => {
        let {showLoginForm} = this.state;
        this.setState({
            showLoginForm: !showLoginForm
        })
    };

    renderModal = () => {
        return (
            <Modal
                className={'national-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Header>
                    <p>????????????????????????????????????</p>
                </Modal.Header>
                <Modal.Content>
                    <img src="images/index-images/tokutei.png" alt={'text'}/>
                    <img onClick={this.hide} src="images/tojiru.png" alt={'text'}/>
                </Modal.Content>
            </Modal>
        );
    };

    openCodeModal = () => {
        this.codeModalRef.current.show();
    };

    openRegisterModal = () => {
        this.registerModalRef.current.show();
    };

    logout = () => {
        this.setState({
            showLoginForm: true
        }, () => {
            this.props.history.push('/logout')
        });
    };

    login = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {loginForm} = this.state;
        this.setState({loaded: true});
        const loginResponse = await this.affiliateApi.login(loginForm);

        if (loginResponse.data && loginResponse.data.code === 0) {
            this.setState({loaded: false, showLoginForm: false});
            localStorage.setItem('token', loginResponse.data.data.token);
            localStorage.setItem('accountId', loginResponse.data.data.affiliator.uuid);
            localStorage.setItem('name', loginResponse.data.data.affiliator.name);
            localStorage.setItem('email', loginResponse.data.data.affiliator.email);
            localStorage.setItem('accountType', "affiliate");
            this.openCodeModal()

        } else {
            this.setState({loaded: false});
            this.props.notify(true, loginResponse.message? loginResponse.message: 'Error! please try again!')
        }
    };

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

    render() {
        let {loginForm, showLoginForm} = this.state;
        const emailError = this.context.errorFor(this.state, 'email', null, true);
        const passwordError = this.context.errorFor(this.state, 'password', null, true);
        return (
            <div className={'affiliate-page'}>
                <img className={'cover-image'} src="/images/index-images/bg_01.jpg"
                     alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                <div className={'affiliate-login'}>
                    <img src="/images/affiliate-images/afi_02.png"
                         alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                    <p>
                        ?????????????????????????????????????????? BLOG???SNS ????????????GANOMI.com ????????????????????????????????????????????????
                        <span>???</span>????????????GET?????????????????????
                    </p>

                    <Form className={`${!showLoginForm ? 'logout-form' : ''}`}>
                        <Form.Group>
                            {
                                showLoginForm ?
                                    <>
                                        <Form.Field inline required error={!!emailError}>
                                            <label>???????????????????????????????????????????????? ??????????????????????????? </label>
                                            <Input
                                                value={loginForm.email ? loginForm.email : ""}
                                                onChange={this.handleFieldChange('email')}
                                            />
                                        </Form.Field>
                                        < Form.Field
                                            className={'password-field'}
                                            inline required error={!!passwordError}
                                        >
                                            <label> ??????????????? </label>
                                            <Input
                                                type={'password'}
                                                value={loginForm.password ? loginForm.password : ''}
                                                onChange={this.handleFieldChange('password')}

                                            />
                                        </Form.Field>
                                        <img className={'login-image'}
                                             src="/images/login.png"
                                             alt="??????????????????????????????????????? ???????????????.com ??????????????????"
                                             onClick={() => this.login()}
                                        />
                                        <p> ?????????????????? ????????????URL ?????????</p>
                                    </>
                                    :
                                    <>
                                        <img src={"/images/logout.png"} alt={'img'} className={'logout-image'}
                                             onClick={() => this.logout()}
                                        />
                                        <p onClick={() => this.openCodeModal()}> ?????????????????? ????????????URL ?????????</p>
                                    </>
                            }
                        </Form.Group>

                    </Form>


                </div>
                <div className={'discount-section'}>
                    <img src="/images/affiliate-images/afi_03.png"
                         alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                    <p className={'follower-text'}>????????????????????????????????????????????????100????????????????????????????????????????????????
                        <img className={'follower-img'}
                             src="/images/affiliate-images/afi_follower.png"
                             alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                        ????????????????????????????????????????????????
                        <img className={'logo-img'}
                             src="/images/affiliate-images/afi_rogo.png"
                             alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                        ???????????????????????????????????????????????????????????????????????????
                    </p>
                    <p className={'reward-text'}>???????????????????????? ???????????????????????? ?????? SNS????????????????????? ???10,000???</p>
                    <span>????????????????????? ??? 10,000?????????????????????????????????1???2???????????????
                        <span> GANOMI.com </span>
                         ??????????????????????????????
                    </span>
                    <img className={'billing-image'}
                         src="/images/affiliate-images/afi_05.png"
                         alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                    {
                        showLoginForm ?
                            <img className={'account-image'}
                                 src="/images/affiliate-images/afi_04.png"
                                 onClick={() => this.openRegisterModal()}
                                 alt="??????????????????????????????????????? ???????????????.com ??????????????????"/>
                            : null
                    }

                </div>
                <div className={'copyright-text'}>
                    Copyright (c) 2020 GAYNOMI.com All rights reserved.
                </div>
                <CodeModal ref={this.codeModalRef} props={this}/>
                <RegisterModal ref={this.registerModalRef} props={this} showLoginForm={this.showLoginForm}/>
            </div>
        );
    }


}