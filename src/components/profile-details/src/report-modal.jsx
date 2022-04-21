import React from 'react';
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import update from "immutability-helper";
import Helper from "../../../utils/helper";
import ProfileApi from "../api/profile-api"

export default class ReportModal extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("report", 'report', required),
        ruleRunner("violator_id", 'violator_id', required)
    ]

    constructor(props) {
        super(props);
        this.profileApi = new ProfileApi(this);
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            reportForm: {
                report: "",
                violator_id: '',
            },
            addImage: 'bt_tsuhou01.png',
            addedText: ''
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.reportForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                reportForm: update(this.state.reportForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    addReport = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {reportForm} = this.state;
        this.setState({loaded: true});
        const reportResponse = await this.profileApi.addReport(reportForm);
        this.setState({loaded: false});
        if (reportResponse.data) {
            this.setState({
                addImage: 'bt_tsuhou02.png',
                addedText: '運営事務局に通報しました'
            },)
        } else {
            this.props.props.props.notify(true, reportResponse.message ? reportResponse.message : 'Error!!please try again!')
        }
    };

    show = () => {
        let reportForm = this.state.reportForm;
        reportForm.violator_id = this.props ? this.props.props ? this.props.props.userId : "" : "";
        this.setState({
            open: true,
            reportForm: reportForm
        })
    };

    hide = () => {
        this.setState({
            open: false
        })
    };

    render() {
        let {loaded, reportForm, addImage, addedText} = this.state;
        const reportError = this.context.errorFor(this.state, 'report', null, true);
        const violatorIdError = this.context.errorFor(this.state, 'violator_id', null, true);
        return (
            <Modal
                className={'report-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <p className={'header-text'}>通報する内容を入力してください</p>
                    <Form>
                        {/*<Form.Field inline required error={!!reportError}>
                            <label>違反者 アカウントID</label>
                            <Input
                                value={reportForm.violator_id? reportForm.violator_id: ''}
                                onChange={this.handleFieldChange('violator_id')}
                            />
                        </Form.Field>*/}
                        <Form.Field required error={!!violatorIdError}>
                            <label>違反内容をできるだけ詳しくお伝え下さい</label>
                            <TextArea maxLength="100"
                                      value={reportForm.report ? reportForm.report : ""}
                                      onChange={this.handleFieldChange('report')}
                            />
                        </Form.Field>

                        <div className={'description-section'}>
                            <p>ご通報頂いた内容の事実関係を調査の上、運営事務局の判断にて対応いたします（ 土日祝・弊社休日を除く ）</p>
                        </div>
                    </Form>
                    <div className={'actions-section'}>
                        <Button loading={loaded} className={`${loaded ? 'with-opacity' : ''}`}>
                            <img className={'add-image'}
                                 src={`/images/profile-page-images/${addImage}`}
                                 alt="ツイート"
                                 onClick={() => this.addReport()}
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