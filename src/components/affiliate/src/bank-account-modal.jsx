import React from 'react';
import {Button, Form, Modal, Checkbox} from 'semantic-ui-react'
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import update from "immutability-helper";
import Helper from "../../../utils/helper";

export default class BankAccountModal extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("financialInstitutionName", 'financialInstitutionName', required),
        ruleRunner("branchName", 'branchName', required),
        ruleRunner("accountNumber", 'accountNumber', required),
        ruleRunner("holderName", 'holderName', required)
    ]

    constructor(props) {
        super(props);
        //this.modalApi = new ModalApi(this);
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            bankAccountForm: {
                financialInstitutionName: "",
                branchName: "",
                accountNumber: "",
                holderName: ""

            },
            addImage: 'kouzahenkou01.png',
            addedText: ''
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.bankAccountForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                bankAccountForm: update(this.state.bankAccountForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    changeBankInfo = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {bankAccountForm} = this.state;
        this.setState({loaded: true});
        /*const inquiryResponse = await this.modalApi.addInquiry(bankAccountForm);
        this.setState({loaded: false});
        if (inquiryResponse.data) {
            this.setState({
                addImage: 'kouzahenkou02.png'
            },)
        } else {
            this.props.props.props.notify(true, inquiryResponse.message? inquiryResponse.message: 'Error! please try again!')
        }*/
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
        let {loaded, bankAccountForm, addImage} = this.state;

        const financialInstitutionNameError = this.context.errorFor(this.state, 'financialInstitutionName', null, true);
        const branchNameError = this.context.errorFor(this.state, 'branchName', null, true);
        const accountNumberError = this.context.errorFor(this.state, 'accountNumber', null, true);
        const holderNameError = this.context.errorFor(this.state, 'holderName', null, true);
        return (
            <Modal
                className={'bank-account-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <p className={'header-text'}>
                        <img src="/images/affiliate-images/afi_rogo.png"/>
                        アフィリエイト：銀行口座変更フォーム</p>
                    <hr/>
                    新しい報酬入金先銀行口座を入力してください
                    <Form>
                        <Form.Field inline required error={!!financialInstitutionNameError}>
                            <label>報酬入金先銀行口座 銀行 / 金融機関名：</label>
                            <Input
                                value={bankAccountForm.financialInstitutionName ? bankAccountForm.financialInstitutionName : ''}
                                onChange={this.handleFieldChange('financialInstitutionName')}

                            />
                        </Form.Field>
                        <Form.Field inline required error={!!branchNameError}>
                            <label>支店 / 営業所名：</label>
                            <Input
                                value={bankAccountForm.branchName ? bankAccountForm.branchName : ''}
                                onChange={this.handleFieldChange('branchName')}

                            />
                        </Form.Field>
                        <Form.Field className={'account-number-field'}
                                    inline required error={!!accountNumberError}>
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
                                    value={bankAccountForm.accountNumber ? bankAccountForm.accountNumber : ''}
                                    onChange={this.handleFieldChange('accountNumber')}

                                />
                            </div>
                        </Form.Field>
                        <Form.Field inline required error={!!holderNameError}>
                            <label>口座名義人名（ カタカナ入力 ）：</label>
                            <Input
                                value={bankAccountForm.holderName ? bankAccountForm.holderName : ''}
                                onChange={this.handleFieldChange('holderName')}

                            />
                        </Form.Field>
                    </Form>
                    <div className={'actions-section'}>
                        <Button loading={loaded} className={`${loaded ? 'with-opacity' : ''}`}>
                            <img className={'add-image'}
                                 src={`/images/affiliate-images/${addImage}`}
                                 alt="ツイート"
                                 onClick={() => this.changeBankInfo()}
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