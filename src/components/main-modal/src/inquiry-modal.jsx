import React from 'react';
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import update from "immutability-helper";
import Helper from "../../../utils/helper";
import ModalApi from "../api/modal-api"

export default class InquiryModal extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("text", 'text', required),
        ruleRunner("answer_email", 'answer_email', required, email)
    ]

    constructor(props) {
        super(props);
        this.modalApi = new ModalApi(this);
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            inquiryForm: {
                text: "",
                answer_email: "",
            },
            addImage: 'bt_toisoushin_01.png',
            addedText: ''
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.inquiryForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                inquiryForm: update(this.state.inquiryForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    addInquiry = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {inquiryForm} = this.state;
        this.setState({loaded: true});
        const inquiryResponse = await this.modalApi.addInquiry(inquiryForm);
        this.setState({loaded: false});
        if (inquiryResponse.data) {
            this.setState({
                addImage: 'bt_toisoushin_02.png',
                addedText: 'お問い合わせ内容が送信されました'
            },)
        } else {
            this.props.props.props.notify(true, inquiryResponse.message? inquiryResponse.message: 'Error! please try again!')
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
        let {loaded, inquiryForm, addImage, addedText} = this.state;
        const textError = this.context.errorFor(this.state, 'text', null, true);
        const emailError = this.context.errorFor(this.state, 'answer_email', null, true);
        return (
            <Modal
                className={'inquiry-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <p className={'header-text'}>お問い合わせ内容を入力してください</p>
                    <p className={'form-header'}>お電話によるサポートは対応致しかねます</p>
                    <Form>

                        <Form.Field required error={!!textError}>
                            <TextArea maxLength="100"
                                      value={inquiryForm.text ? inquiryForm.text : ""}
                                      onChange={this.handleFieldChange('text')}
                            />
                        </Form.Field>
                        <Form.Field inline required error={!!emailError}>
                            <label>回答返信先メールアドレス</label>
                            <Input
                                   value={inquiryForm.answer_email? inquiryForm.answer_email: ''}
                                   onChange={this.handleFieldChange('answer_email')}

                            />
                        </Form.Field>
                        <div className={'description-section'}>
                            <p>すでに会員済みの場合は登録メールアドレスを入力してください</p>
                            <p>メールアドレス宛てに数日営業日内に回答いたします（ 土日祝・弊社休日を除く ）</p>
                        </div>
                    </Form>
                    <div className={'actions-section'}>
                        <Button loading={loaded} className={`${loaded ? 'with-opacity' : ''}`}>
                            <img className={'add-image'}
                                 src={`/images/modal-images/${addImage}`}
                                 alt="ツイート"
                                 onClick={() => this.addInquiry()}
                            />
                        </Button>
                        <p>{addedText}</p>
                    </div>

                    <div className={'close-section'}>
                        <img onClick={() => this.hide()} src="/images/tojiru.png"/>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }


}