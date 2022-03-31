import React from 'react';
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import {ruleRunner, run} from "../../../utils/ruleRunner";
import {required, email} from "../../../utils/rules";
import AppContext from "../../../context/app-context";
import update from "immutability-helper";
import Helper from "../../../utils/helper";
import TweetApi from "../api/tweet-api"

export default class AddTweet extends React.Component {
    static contextType = AppContext;
    fieldsValidations = [
        ruleRunner("text", 'text', required),
        ruleRunner("place", 'place', required),
        ruleRunner("day", 'day', required),
        ruleRunner("month", 'month', required),
        ruleRunner("start_hour", 'start_hour', required),
        ruleRunner("end_hour", 'end_hour', required),
    ]

    constructor(props) {
        super(props);
        this.tweetApi = new TweetApi(this);
        this.state = {
            open: false,
            validationErrors: {},
            showErrors: false,
            loaded: false,
            tweetForm: {
                text: "",
                place: "",
                day: null,
                month: null,
                start_hour: null,
                end_hour: null
            },
            addImage: 'bt_twiit_01.png',
            addedText: ''
        }
    }

    validateState = () => {
        this.setState({
            validationErrors: run(this.state.tweetForm, this.fieldsValidations)
        });

    };

    componentDidMount() {
        this.validateState()
    }

    handleFieldChange = (field) => {
        return (e, data) => {
            this.setState({
                tweetForm: update(this.state.tweetForm, {
                    [field]: {
                        $set: data.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    onChange = (field) => {
        let selectElement = document.getElementById(field);
        if (selectElement) {
            this.setState({
                tweetForm: update(this.state.tweetForm, {
                    [field]: {
                        $set: selectElement.value
                    }
                }),
            }, () => {
                this.validateState();
            });
        }
    };

    addTweet = async () => {
        this.setState({showErrors: true});
        if (!Helper.isEmpty(this.state.validationErrors)) return null;
        let {tweetForm} = this.state;
        this.setState({loaded: true});
        const tweetResponse = await this.tweetApi.addTweet(tweetForm);
        this.setState({loaded: false});
        if (tweetResponse.data) {
            this.setState({
                addImage: 'bt_twiit_02.png',
                addedText: 'あなたからのお誘いがツイートされました'
            },)
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
        let {loaded, tweetForm, addImage, addedText} = this.state;
        const textError = this.context.errorFor(this.state, 'text', null, true);
        const placeError = this.context.errorFor(this.state, 'place', null, true);
        const dayError = this.context.errorFor(this.state, 'day', null, true);
        const monthError = this.context.errorFor(this.state, 'month', null, true);
        const startError = this.context.errorFor(this.state, 'start_hour', null, true);
        const endError = this.context.errorFor(this.state, 'end_hour', null, true);
        return (
            <Modal
                className={'tweet-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <p className={'header-text'}>ギャラ飲み・デートのお誘いツイートの内容を入力してください</p>
                    <p className={'header-text-red'}>最新ツイートの１番目に表示され、あなたへのアクセスが大幅にアップします</p>
                    <div className={'update-account'}>
                        <p>デート希望額などの設定を変更する場合、事前にアカウント登録情報から変更してください</p>
                        <img src="/images/tweets-images/bt_henkou.png"
                             onClick={() => window.location = `/update/${localStorage.getItem('accountId')}`}
                             alt="登録内容変更"/>
                    </div>
                    <Form>
                        <Form.Field inline required error={!!placeError}>
                            <label>
                                ● より具体的な地域
                            </label>
                            <Input placeholder={'例：六本木など'}
                                   value={tweetForm.place? tweetForm.place: ''}
                                   onChange={this.handleFieldChange('place')}

                            />
                        </Form.Field>
                        <Form.Field inline required error={!!monthError || !!dayError || !!startError || !!endError}>
                            <label>● 待ち合わせ希望日時</label>
                            <select
                                id={`month`}
                                value={tweetForm.month ? tweetForm.month : ''}
                                onChange={() => this.onChange('month')}
                            >
                                <option label="" disabled="disabled" selected=""></option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <label>月</label>
                            <select
                                id={`day`}
                                value={tweetForm.day ? tweetForm.day : ''}
                                onChange={() => this.onChange('day')}
                            >
                                <option label="" disabled="disabled" selected=""></option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
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
                                <option value="31">31</option>
                            </select>
                            <label>日</label>
                            <select
                                id={`start_hour`}
                                value={tweetForm.start_hour ? tweetForm.start_hour : ''}
                                onChange={() => this.onChange('start_hour')}
                            >
                                <option label="" disabled="disabled" selected=""></option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="00">00</option>
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
                            </select>
                            <label>時 ～ 終了予定時刻</label>
                            <select
                                id={`end_hour`}
                                value={tweetForm.end_hour ? tweetForm.end_hour : ''}
                                onChange={() => this.onChange('end_hour')}
                            >
                                <option label="" disabled="disabled" selected=""></option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="00">00</option>
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
                            </select>
                            <label>時まで</label>
                        </Form.Field>
                        <Form.Field required error={!!textError}>
                            <p>ツイート内容入力（ 100文字以内 ）
                                <p>わいせつ表現及び、売春を示唆する内容・連続投稿は厳禁</p></p>
                            <TextArea maxLength="100" placeholder={`例：デート内容・人数・飲食内容・お店の名前 などをツイートしてください。`}
                                      value={tweetForm.text ? tweetForm.text : ""}
                                      onChange={this.handleFieldChange('text')}
                            />
                        </Form.Field>
                    </Form>
                    <div className={'actions-section'}>
                        <Button loading={loaded} className={`${loaded ? 'with-opacity' : ''}`}>
                            <img className={'add-image'}
                                 src={`/images/tweets-images/${addImage}`}
                                 alt="ツイート"
                                 onClick={() => this.addTweet()}
                            />
                            <p>{addedText}</p>
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