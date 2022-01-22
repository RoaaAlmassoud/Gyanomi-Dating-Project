import React from 'react';

function Footer() {

    let pathname = window.location.pathname;
    let registerImage = pathname === '/top_m00'? 'images/touroku_02.png': 'images/touroku_01.png';

    return (
        <div className={'footer-section'}>
            <div className={'left-footer'}>
                <img src={registerImage} alt={'img'}/>
                <img src={"images/touroku_03.png"} alt={'img'}/>
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