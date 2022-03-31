import React, {Component} from 'react'
import Footer from './footer'
import Helper from '../../utils/helper'


class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.pathName = props ? props.props.pathName.substring(1) : 'home';
        let showFooter = (this.pathName !== 'register' && !Helper.emptyString(this.pathName));
        this.state = {
            activeItem: this.pathName !== 'home' ? this.pathName : 'home',
            showFooter: showFooter
        }
    }

    itemClicked = () => {
        window.location.href = '/';
    };

    render() {
        return (
            <div className={'main-container'}>
                <div className={'header-section'}>
                    <img src={"/icon.png"} alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】のアイコン"/>
                    <h1>
                        全国地域別検索：ハイクラスな大人の男女の出会い &nbsp; &nbsp;ギャラ飲み / デート 専用 マッチング掲示板サイト
                        <p style={{color: '#e5004f', display: 'inline'}}> GYANOMI.com</p>
                        【 ギャノミー.com 】
                    </h1>
                    <a onClick={() => {
                        this.itemClicked()
                    }}>https://gyanomi.com/</a>
                </div>
                <div>
                    {this.props.children}
                </div>
                {
                    this.state.showFooter ?
                        <Footer/>
                        : null
                }
            </div>
        );
    }
}

export default MainLayout;