import React from 'react';
import {Header, List, Modal} from 'semantic-ui-react'

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
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

    renderModal = () => {
        return (
            <Modal
                className={'national-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Header>
                    <p>特定商取引法に基づく表記</p>
                </Modal.Header>
                <Modal.Content>
                    <img src="images/index-images/tokutei.png" alt={'text'}/>
                    <img onClick={this.hide} src="images/tojiru.png" alt={'text'}/>
                </Modal.Content>
            </Modal>
        );
    };

    render() {
        return (
            <div className={'index-page'}>
                <img className={'cover-image'} src="images/index-images/bg_01.jpg"
                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                <div className={'logo-section'}>
                    <img src="images/index-images/rogo.png" alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】のロゴ"/>
                    <Header as={'h2'}>地域別：ハイクラスな大人のギャラ飲み出会い系マッチングサイト【 ギャノミー.com 】</Header>
                </div>
                <div className={'buttons-section'}>
                    <Header as={'h5'}>※ ご注意：成人向けの出会い系サイトです。法律により、18歳以下の未成年者の閲覧を固くお断りします。</Header>
                    <img onClick={() => {
                        this.imageClicked('top_g00')
                    }}
                         src="images/index-images/bt_enter01.png"
                         alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の成人男性入口"/>
                    <img onClick={() => {
                        this.imageClicked('top_m00')
                    }}
                         src="images/index-images/bt_enter02.png"
                         alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の成人女性入口"/>
                </div>
                <div className={'index-footer'}>
                    <List horizontal>
                        <List.Item>
                            <p onClick={() => this.show()}>特定商取引法に基づく表記</p>
                        </List.Item>
                        <List.Item>
                            <p>Copyright (c) 2020 GAYNOMI.com All rights reserved.</p>
                        </List.Item>
                        <List.Item>
                            <img src="images/index-images/afi.png"
                                 alt={'afi-image'}
                                 onClick={() => {
                                     this.imageClicked('affiliate')
                                 }}
                            />
                        </List.Item>
                    </List>
                </div>
                {this.renderModal()}
            </div>
        );
    }


}