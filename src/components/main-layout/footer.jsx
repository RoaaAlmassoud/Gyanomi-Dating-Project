import React from 'react';

function Footer() {

    let pathname = window.location.pathname;
    let registerImage = pathname === ('/top_m00' || '/pm10001')? 'images/touroku_02.png': 'images/touroku_01.png';
    let secondRegisterImage = pathname === ('/top_m00' || '/pm10001')? 'images/touroku_04.png': 'images/touroku_03.png';
    if(pathname === '/top_m00' || pathname === '/pm10001'){
        window.name = 'female'
    } else {
        window.name ='male'
    }

    return (
        <div className={'footer-section'}>
            <div className={'left-footer'}>
                <img onClick={() => {window.location= '/register'}} src={registerImage} alt={'img'}/>
                <img  onClick={() => {window.location= '/register'}} src={secondRegisterImage} alt={'img'}/>
            </div>
            <div className={'middle-footer'}>
                <p>←　お誘いツイートを投稿するには新規アカウント登録が必要です</p>
                <img src={"images/bt_kakikomi.png"} alt={'img'}/>
            </div>
            <div className={'right-footer'}>
                <img src={"images/bt_toi.png"} alt={'img'}/>
                <img src={"images/bt_taikai.png"} alt={'img'}/>
            </div>
        </div>
    );
}


export default Footer