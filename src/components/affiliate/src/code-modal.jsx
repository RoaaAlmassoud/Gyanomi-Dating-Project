import React from 'react';
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'
import BankAccountModal from "./bank-account-modal"

export default class CodeModal extends React.Component {

    constructor(props) {
        super(props);
        this.bankAccountModal = React.createRef();
        this.state = {
            open: false
        }
    }


    show = () => {
        this.setState({
            open: true,
        })
    };

    hide = () => {
        this.setState({
            open: false
        })
    };

    copyText = (id) => {
        let input = document.getElementById(id);
        if (input) {
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value);
        }

    };

    openBankModal = () => {
        this.bankAccountModal.current.show();
    };

    render() {
        let registerPath = window.location.origin? `${window.location.origin}/register/`: 'http://gyanomi.com/register/'
        return (
            <Modal
                className={'code-modal'}
                dimmer={'inverted'}
                open={this.state.open}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <div className={'code-header-section'}>
                        <p>{`ようこそ ${localStorage.getItem('name')}`}</p>
                       {/* <p className={'header-text'}><span className={'first-span'}>ようこそ　波多野 恵　さん</span> 前月実績 81名 （ 報酬率
                            60% ）報酬合計金額 ＝ 486,000円 / 今月現時点実績 28名 （ 報酬率 20% ）報酬合計金額 ＝ 56,000円</p>
                        <p>以下の <span className={'red-span'}>あなた専用のURL</span> を貼り付け拡散するとあなたのフォロワー（ 訪問者
                            ）さんからのアクセスデータが反映されます。</p>*/}
                        <img
                            src="/images/affiliate-images/afi_kouza.png"
                            alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                        onClick={() => this.openBankModal()}
                        />
                    </div>
                    <hr/>
                    <div className={'content-section'}>
                        <div className={'first'}>
                            <img className={'first-image'}
                                 src="/images/affiliate-images/aficode_01.png"
                                 alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                            <p>あなた独自の本文や動画概要欄・コメントなどに含めて、このあなた専用のURL をコピーして貼り付け拡散して下さい。</p>
                            <input className="copyTarget" type="text" value={`${registerPath}${localStorage.getItem('accountId')}/`}
                                   readOnly="" id={'id-1'}/>
                            <img className={'copy-image'}
                                 src="/images/affiliate-images/copy01.png"
                                 alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                 onClick={() => this.copyText('id-1')}/>
                        </div>
                        <hr/>
                        <div className={'second'}>
                            <img className={'first-image'}
                                 src="/images/affiliate-images/aficode_02.png"
                                 alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                            <div className={'first copy-section'}>
                                <p><span className={'red-span'}>方法１：</span>あなた独自の GYANOMI.com のサイト説明文などに含めて、このあなた専用のURL
                                    をコピーしてリンク先に指定して下さい。</p>
                                <input className="copyTarget" type="text" value={`${registerPath}${localStorage.getItem('accountId')}/`}
                                       readOnly="" id={'id-2'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-2')}
                                />
                            </div>
                            <div className={'copy-section'}>
                                <p><span className={'red-span'}>方法２：</span>あなた独自の GYANOMI.com
                                    のサイト説明文などに含めて、このあなた専用のhtmlソース をコピーして貼り付けて下さい。（ ソース内部の文言はご自由に改変しても貼り付け可能 ）</p>
                                <input className="copyTarget" type="text"
                                       value={`<a href='${registerPath}${localStorage.getItem('accountId')}/' rel='sponsored'>都道府県別：ギャラ飲み出会いマッチングサイト【 GANOMI.com 】</a>`}
                                       readOnly="" id={'id-3'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-3')}
                                />
                            </div>

                            <div className={'copy-section banner'}>
                                <p className={'with-padding'}><span className={'red-span'}>方法３：</span>バナー画像付きの htmlソース
                                    を使用する場合は、各サイズを準備しておりますので、ご利用ください。（ ソース内部の alt="文言"・表示サイズ数値指定 はご自由に改変しても貼り付け可能 ）</p>
                                <img className={'banner1'}
                                     src="/images/affiliate-images/gyanomi728_90.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                                横 728px X 縦 90px（ 横長の場合 ）<a
                                href={`${process.env.PUBLIC_URL}/images/affiliate-images/gyanomi728_90.png`}
                                target="_blank">このバナー画像をダウンロードして使用する場合はコチラから</a>

                                <input type="text"
                                       value={`<a href='${registerPath}${localStorage.getItem('accountId')}/' rel='sponsored'><img src='https://gyanomi.com/banner/gyanomi728_90.png' style='width: 728px;height: 90px;' alt='都道府県別：ギャラ飲み出会いマッチングサイト【 GANOMI.com 】'></a>`}
                                       readOnly="" id={'id-4'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-4')}
                                />


                                <img className={'banner2'}
                                     src="/images/affiliate-images/gyanomi468_60.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                                横 468px X 縦 60px（ 横長の場合 ）<a
                                href={`${process.env.PUBLIC_URL}/images/affiliate-images/gyanomi468_60.png`}
                                target="_blank">このバナー画像をダウンロードして使用する場合はコチラから</a>

                                <input type="text"
                                       value={`<a href='${registerPath}${localStorage.getItem('accountId')}/' rel='sponsored'><img src='https://gyanomi.com/banner/gyanomi468_60.png' style='width: 468px;height: 60px;' alt='都道府県別：ギャラ飲み出会いマッチングサイト【 GANOMI.com 】'></a>`}
                                       readOnly="" id={'id-5'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-5')}
                                />


                                <img className={'banner3'}
                                     src="/images/affiliate-images/gyanomi320_100.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                                横 320px X 縦 100px（ 横長の場合 ）<a
                                href={`${process.env.PUBLIC_URL}/images/affiliate-images/gyanomi320_100.png`}
                                target="_blank">このバナー画像をダウンロードして使用する場合はコチラから</a>

                                <input type="text"
                                       value={`<a href='${registerPath}${localStorage.getItem('accountId')}/' rel='sponsored'><img src='https://gyanomi.com/banner/gyanomi320_100.png' style='width: 320px;height: 100px;'  alt='都道府県別：ギャラ飲み出会いマッチングサイト【 GANOMI.com 】'></a>`}
                                       readOnly="" id={'id-6'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-6')}
                                />


                                <img className={'banner4'}
                                     src="/images/affiliate-images/gyanomi300_300.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                                横 300px X 縦 300px（ スクエアの場合 ）<a
                                href={`${process.env.PUBLIC_URL}/images/affiliate-images/gyanomi300_300.png`}
                                target="_blank">このバナー画像をダウンロードして使用する場合はコチラから</a>

                                <input type="text"
                                       value={`<a href='${registerPath}${localStorage.getItem('accountId')}/' rel='sponsored'><img src='https://gyanomi.com/banner/gyanomi300_300.png' style='width: 300px;height: 300px;' alt='都道府県別：ギャラ飲み出会いマッチングサイト【 GANOMI.com 】'></a>`}
                                       readOnly="" id={'id-7'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-7')}
                                />
                            </div>
                            <div className={'copy-section last'}>
                                <p className={'with-padding'}><span className={'red-span'}>方法４：</span>ご自身の都合の良いサイズに合わせてバナー画像をデザインされる場合は、
                                    <span className={'red-span'}>GANOMI.com</span> のロゴデータをダウンロードしてご自由に加工してください。
                                </p>
                                <img className={'banner5'}
                                     src="/images/affiliate-images/gyanomirogo560_160.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"/>
                                横 560px X 縦 160px（ ２次加工可 ）<a
                                href={`${process.env.PUBLIC_URL}/images/affiliate-images/gyanomirogo560_160.png`}
                                target="_blank">このロゴ画像をダウンロードして使用する場合はコチラから</a>

                                <input type="text"
                                       value={`<a href='${registerPath}${localStorage.getItem('accountId')}/' rel='sponsored'><img src='●●●●●' style='width: ●●●;height: ●●●;' alt='都道府県別：ギャラ飲み出会いマッチングサイト【 GANOMI.com 】'></a>`}
                                       readOnly="" id={'id-8'}/>
                                <img className={'copy-image'}
                                     src="/images/affiliate-images/copy01.png"
                                     alt="ギャラ飲み出会い系サイト【 ギャノミー.com 】の背景画像"
                                     onClick={() => this.copyText('id-8')}
                                />

                                <p>htmlソースの ●●●●●部分 は、ご自身のサーバー画像パスと適切な縦横サイズを記入した上で貼り付けてください。</p>
                            </div>
                        </div>

                    </div>
                    <hr/>
                    <div className={'close-section'}>
                        <img onClick={() => this.hide()} src="/images/tojiru.png"/>
                    </div>
                    <BankAccountModal ref={this.bankAccountModal} props={this}/>
                </Modal.Content>
            </Modal>
        );
    }


}