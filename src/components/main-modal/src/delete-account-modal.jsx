import React from 'react';
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import update from "immutability-helper";
import Helper from "../../../utils/helper";
import ModalApi from "../api/modal-api"
import {ToastContainer} from "react-toastify";

export default class DeleteAccountModal extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("password", 'password', required),
    ]

    constructor(props) {
        super(props);
        this.modalApi = new ModalApi(this);
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            userForm: {
                email: localStorage.getItem('email') ? localStorage.getItem('email') : "",
                password: "",
            },
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.userForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                userForm: update(this.state.userForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, this.validateState);
        }
    };

    deleteAccount = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {userForm} = this.state;
        let body = {password: userForm.password};
        this.setState({loaded: true});
        const deleteResponse = await this.modalApi.deleteAccount(body);
        this.setState({loaded: false});
        if (deleteResponse.data) {
            window.location.pathname = '/logout'
        } else {
            this.props.props.props.notify(true, deleteResponse.message? deleteResponse.message: 'Error! please try again!')
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
        let {loaded, userForm} = this.state;
        const passwordError = this.context.errorFor(this.state, 'password', null, true);
        return (
            <Modal
                className={'delete-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <p className={'header-text'}>※ 最終確認：本当に退会しますか？</p>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field inline>
                                <label>登録メールアドレス</label>
                                <Input maxLength="100"
                                       value={userForm.email ? userForm.email : ""}
                                       disabled
                                />
                            </Form.Field>
                            <Form.Field inline required error={!!passwordError}>
                                <label>パスワード</label>
                                <Input
                                    type={'password'}
                                    value={userForm.password ? userForm.password : ''}
                                    onChange={this.handleFieldChange('password')}

                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                    <div className={'actions-section'}>
                        <Button loading={loaded} className={`${loaded ? 'with-opacity' : ''}`}>
                            <img className={'add-image'}
                                 src={`/images/modal-images/bt_taikaishinsei.png`}
                                 alt="ツイート"
                                 onClick={() => this.deleteAccount()}
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