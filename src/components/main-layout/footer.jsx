import React from 'react';
import AddTweet from "../tweet/src/add-tweet"
import InquiryModal from "../main-modal/src/inquiry-modal"
import DeleteAccountModal from "../main-modal/src/delete-account-modal"
import {toast, ToastContainer} from "react-toastify";
import {Icon} from "semantic-ui-react";
import {css} from "glamor";

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.tweetModalRef = React.createRef();
        this.inquiryModalRef = React.createRef();
        this.deleteAccountModalRef = React.createRef();
        let pathname = window.location.pathname;
        this.registerImage = pathname === ('/top_m00' || '/pm10001') ? 'images/touroku_02.png' : 'images/touroku_01.png';
        this.secondRegisterImage = pathname === ('/top_m00' || '/pm10001') ? 'images/touroku_04.png' : 'images/touroku_03.png';
        if (pathname === '/top_m00') {
            window.name = 'female'
        } else {
            window.name = 'male'
        }
    }

    openTweetModal = () => {
        this.tweetModalRef.current.show();
    }

    openInquiryModal = () => {
        this.inquiryModalRef.current.show();
    }

    openDeleteAccountModal = () => {
        this.deleteAccountModalRef.current.show();
    }

    render() {
        return (
            <div className={'footer-section'} id={'footer-section'}>
                {
                    !localStorage.getItem('token') ?
                        <div className={'left-footer'}>
                            <img onClick={() => {
                                window.location = '/register'
                            }} src={this.registerImage} alt={'img'}/>
                            <img onClick={() => {
                                window.location = '/register'
                            }} src={this.secondRegisterImage} alt={'img'}/>
                        </div>
                        : null
                }

                <div className={'middle-footer'}>
                    {
                        localStorage.getItem('token') ?
                            <>
                                <p>← お誘いツイートを投稿するには新規アカウント登録が必要です</p>
                                <img onClick={() =>this.openTweetModal()}
                                     src={"/images/bt_kakikomi.png"} alt={'img'}/>
                            </>
                            : null
                    }

                </div>
                <div className={'right-footer'}>
                    {
                        localStorage.getItem('token') ?
                            <>
                                <img src={"/images/bt_toi.png"}
                                     alt={'img'}
                                     onClick={() => this.openInquiryModal()}
                                />
                                <img src={"/images/bt_taikai.png"}
                                     alt={'img'}
                                     onClick={() => this.openDeleteAccountModal()}
                                />
                            </>
                            : null
                    }
                </div>
                <AddTweet ref={this.tweetModalRef} props={this}/>
                <InquiryModal ref={this.inquiryModalRef} props={this}/>
                <DeleteAccountModal ref={this.deleteAccountModalRef} props={this}/>
            </div>
        );
    }
}
