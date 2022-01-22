import React from 'react';

function change_image() {
    let url = document.getElementById('Change_Image').src;
    let fUllFirstImageUrl = `${window.location.origin}/images/m_01.png`;
    if (url === fUllFirstImageUrl) {
        document.getElementById('Change_Image').src = 'images/m_02.png';
    } else {
        document.getElementById('Change_Image').src = 'images/m_01.png';
    }
}

function Menu() {
    setInterval(change_image, 500);

    let pathname = window.location.pathname;
    let maleImage = pathname === '/top_m00'? 'images/bt_menutop04.png': 'images/bt_menutop03.png';
    return (
        <div className={'menu-section'}>
            <div className={'left-menu'}>
                <img src={"images/rogo.png"} alt={"img"}/>
                <img src={"images/area.png"} alt={"img"}/>
                <select>
                    <option value="alea00" selected>全国版</option>
                    <option label="" disabled="disabled"/>
                    <option label="" disabled="disabled"/>
                    <option value="" disabled="disabled">{'///// 東北・北海道エリア'}</option>
                    <option value="alea01">北海道</option>
                    <option value="alea02">青森県</option>
                    <option value="alea03">岩手県</option>
                    <option value="alea04">宮城県</option>
                    <option value="alea05">秋田県</option>
                    <option value="alea06">山形県</option>
                    <option value="alea07">福島県</option>
                    <option label="" disabled="disabled"/>
                    <option label="" disabled="disabled"/>
                    <option value="" disabled="disabled">{'///// 関東エリア'}</option>
                    <option value="alea08">茨城県</option>
                    <option value="alea09">栃木県</option>
                    <option value="alea10">群馬県</option>
                    <option value="alea11">埼玉県</option>
                    <option value="alea12">千葉県</option>
                    <option value="alea13">東京都</option>
                    <option value="alea14">神奈川県</option>
                    <option label="" disabled="disabled"/>
                    <option label="" disabled="disabled"/>
                    <option value="" disabled="disabled">{'///// 中部エリア'}</option>
                    <option value="alea15">新潟県</option>
                    <option value="alea16">富山県</option>
                    <option value="alea17">石川県</option>
                    <option value="alea18">福井県</option>
                    <option value="alea19">山梨県</option>
                    <option value="alea20">長野県</option>
                    <option value="alea21">岐阜県</option>
                    <option value="alea22">静岡県</option>
                    <option value="alea23">愛知県</option>
                    <option label="" disabled="disabled"/>
                    <option label="" disabled="disabled"/>
                    <option value="" disabled="disabled">{'///// 近畿エリア'}</option>
                    <option value="alea24">三重県</option>
                    <option value="alea25">滋賀県</option>
                    <option value="alea26">京都府</option>
                    <option value="alea27">大阪府</option>
                    <option value="alea28">兵庫県</option>
                    <option value="alea29">奈良県</option>
                    <option value="alea30">和歌山県</option>
                    <option label="" disabled="disabled"/>
                    <option label="" disabled="disabled"/>
                    <option value="" disabled="disabled">{'///// 中国・四国エリア'}</option>
                    <option value="alea31">鳥取県</option>
                    <option value="alea32">島根県</option>
                    <option value="alea33">岡山県</option>
                    <option value="alea34">広島県</option>
                    <option value="alea35">山口県</option>
                    <option value="alea36">徳島県</option>
                    <option value="alea37">香川県</option>
                    <option value="alea38">愛媛県</option>
                    <option value="alea39">高知県</option>
                    <option label="" disabled="disabled"/>
                    <option label="" disabled="disabled"/>
                    <option value="" disabled="disabled">{'///// 九州・沖縄エリア'}</option>
                    <option value="alea40">福岡県</option>
                    <option value="alea41">佐賀県</option>
                    <option value="alea42">長崎県</option>
                    <option value="alea43">熊本県</option>
                    <option value="alea44">大分県</option>
                    <option value="alea45">宮崎県</option>
                    <option value="alea46">鹿児島県</option>
                    <option value="alea47">沖縄県</option>
                </select>

            </div>
            <div className={'right-menu'}>
                ようこそ　田中 信二 さん　アカウントID = m10001　マイページ
                <img className={'first-menu'} src={"images/bt_menutop02.png"} alt={'img'}/>
                <img className={'second-menu'} src={maleImage} alt={'img'}/>
                <img id="Change_Image" src={"images/m_01.png"}  alt={'img'}/>
            </div>
        </div>
    );
}

export default Menu