import React from 'react';
import {Button, Form, Modal, Checkbox} from 'semantic-ui-react'
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import update from "immutability-helper";
import Helper from "../../../utils/helper";
import AffiliateApi from "../api/affiliate-api"

export default class RegisterModal extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("name", 'name', required),
        ruleRunner("email", 'email', required, email),
        ruleRunner("password", 'password', required),
        /*ruleRunner("financialInstitutionName", 'financialInstitutionName', required),
        ruleRunner("branchName", 'branchName', required),
        ruleRunner("accountNumber", 'accountNumber', required),
        ruleRunner("holderName", 'holderName', required)*/
    ]

    constructor(props) {
        super(props);
        this.affiliateApi = new AffiliateApi(this);
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            affiliateForm: {
                name: "",
                email: "",
                password: "",
                financialInstitutionName: "",
                branchName: "",
                accountNumber: "",
                holderName: ""

            },
            addImage: 'afibt_touroku01.png'
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.affiliateForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                affiliateForm: update(this.state.affiliateForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    register = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {affiliateForm} = this.state;
        this.setState({loaded: true});
        const registerResponse = await this.affiliateApi.register(affiliateForm);
        this.setState({loaded: false});
        if (registerResponse.data) {
            this.setState({
                addImage: 'afibt_touroku02.png'
            }, () => {
                this.props.props.showLoginForm();
                localStorage.setItem('token', registerResponse.data.data.token);
                localStorage.setItem('accountId', registerResponse.data.data.affliator.uuid);
                localStorage.setItem('name', registerResponse.data.data.affliator.name);
                localStorage.setItem('email', registerResponse.data.data.affliator.email);
                localStorage.setItem('accountType', "affiliate");
            })
        } else {
            this.props.props.props.notify(true, registerResponse.message? registerResponse.message: 'Error! please try again!')
        }
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

    render() {
        let {loaded, affiliateForm, addImage} = this.state;

        const nameError = this.context.errorFor(this.state, 'name', null, true);
        const emailError = this.context.errorFor(this.state, 'email', null, true);
        const passwordError = this.context.errorFor(this.state, 'password', null, true);
       /* const financialInstitutionNameError = this.context.errorFor(this.state, 'financialInstitutionName', null, true);
        const branchNameError = this.context.errorFor(this.state, 'branchName', null, true);
        const accountNumberError = this.context.errorFor(this.state, 'accountNumber', null, true);
        const holderNameError = this.context.errorFor(this.state, 'holderName', null, true);*/
        return (
            <Modal
                className={'register-account-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <p className={'header-text'}>
                        <img src="/images/affiliate-images/afi_rogo.png"/>
                        アフィリエイト：<span className={'red-span'}>超</span>高収入宣伝パートナー 登録フォーム</p>
                    <hr/>

                    毎月10日にあなたの銀行口座に報酬合計金額が自動入金されます。
                    <Form>
                        <Form.Field inline required error={!!nameError}>
                            <label>お名前フルネーム：</label>
                            <Input
                                value={affiliateForm.name ? affiliateForm.name : ''}
                                onChange={this.handleFieldChange('name')}
                            />
                        </Form.Field>
                        <Form.Field inline required error={!!emailError}>
                            <label>登録メールアドレス：</label>
                            <Input
                                value={affiliateForm.email ? affiliateForm.email : ''}
                                onChange={this.handleFieldChange('email')}
                            />
                        </Form.Field>
                        <Form.Field inline required error={!!passwordError}>
                            <label>パスワード：</label>
                            <Input
                                type={'password'}
                                value={affiliateForm.password ? affiliateForm.password : ''}
                                onChange={this.handleFieldChange('password')}
                            />
                        </Form.Field>


                        <Form.Field
                            inline
                            /*required
                            error={!!financialInstitutionNameError}*/
                        >
                            <label>報酬入金先銀行口座 銀行 / 金融機関名：</label>
                            <Input
                                value={affiliateForm.financialInstitutionName ? affiliateForm.financialInstitutionName : ''}
                                onChange={this.handleFieldChange('financialInstitutionName')}

                            />
                        </Form.Field>
                        <Form.Field
                            inline
                            /*required
                            error={!!branchNameError}*/
                        >
                            <label>支店 / 営業所名：</label>
                            <Input
                                value={affiliateForm.branchName ? affiliateForm.branchName : ''}
                                onChange={this.handleFieldChange('branchName')}

                            />
                        </Form.Field>
                        <Form.Field className={'account-number-field'}
                                    inline
                                    /*required
                                    error={!!accountNumberError}*/
                        >
                            <label>口座番号：</label>
                            <div className={'account-number-section'}>
                                <Checkbox
                                    radio
                                    label='普通 '
                                    name='checkboxRadioGroup'
                                    value={1}
                                    //checked={trip.weightUnit === 1}
                                    onChange={this.handleFieldChange("accountNumber")}
                                />
                                <Checkbox
                                    radio
                                    label='当座'
                                    name='checkboxRadioGroup'
                                    value={2}
                                    //checked={trip.weightUnit === 2}
                                    onChange={this.handleFieldChange("accountNumber")}
                                />
                                <Input
                                    value={affiliateForm.accountNumber ? affiliateForm.accountNumber : ''}
                                    onChange={this.handleFieldChange('accountNumber')}

                                />
                            </div>
                        </Form.Field>
                        <Form.Field
                            inline
                            /*required
                            error={!!holderNameError}*/
                        >
                            <label>口座名義人名（ カタカナ入力 ）：</label>
                            <Input
                                value={affiliateForm.holderName ? affiliateForm.holderName : ''}
                                onChange={this.handleFieldChange('holderName')}

                            />
                        </Form.Field>
                    </Form>
                    <div className={'actions-section'}>
                        <Button loading={loaded} className={`${loaded ? 'with-opacity' : ''}`}>
                            <img className={'add-image'}
                                 src={`/images/affiliate-images/${addImage}`}
                                 alt="ツイート"
                                 onClick={() => this.register()}
                            />
                        </Button>
                    </div>

                    <div className={'close-section'}>
                        <img onClick={() => this.hide()} src="/images/tojiru.png"/>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }


}