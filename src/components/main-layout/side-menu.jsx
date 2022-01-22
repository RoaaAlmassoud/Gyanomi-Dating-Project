import React, {Component} from 'react';
import {Form} from 'semantic-ui-react'
export default class SideMenu extends Component {

    constructor(props) {

        super(props);
        this.restaurantsList = [
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
            {
                name: '001ランダム　GINZA UNA',
                serving: '韓国風高級炭火焼肉店',
                location: '東京都中央区銀座３丁目２－１５',
                building: 'ギンザ・グラッセビル11F',
                images: ['images/01.jpg', 'images/02.jpg', 'images/03.jpg'],
                workingHours: '営業時間：18:00～01:00',
                timeOff: '定休日：土日祝（ 不定休 ）'
            },
        ]
    }
    render() {
        return (
            <div className={'main-menu-column'}>
                <Form>
                    <Form.Field>
                        <label>登録メールアドレス</label>
                        <input type={'text'} value={'shinji-tanaka0630@gmail.com'} readOnly/>
                    </Form.Field>
                    <Form.Field>
                        <label>パスワード</label>
                        <input value="shin3024" readOnly/>
                        <p>お忘れの場合 ganomi と入力</p>
                    </Form.Field>
                </Form>
                <div className={'actions-section'}>
                    <img src={"images/logout.png"} alt={'img'}/>
                    <img src={"images/login.png"} alt={'img'}/>
                </div>
                <div className={'restaurant-section'}>
                    <p className={'title'}>GANOMI 特典付き飲食店</p>
                    <div className={'restaurant-elements'}>
                        <div style={{height: '50vh', overflow: 'hidden'}}>
                            <div className="slide-section" data-style="slide-section">
                                {
                                    this.restaurantsList.map((restaurant, index) => {
                                        return <div key={index} className="restaurant-element">
                                            <p className={'name'}>{restaurant.name}</p>
                                            <p>{restaurant.serving}</p>
                                            <div className={'restaurant-location'}>
                                                <img className={'map-img'} src={"images/map.png"} alt={'img'}/>
                                                <p>{restaurant.location}</p>
                                                <p>{restaurant.building}</p>
                                            </div>
                                            <div className={'restaurant-images'}>
                                                {restaurant.images.map((image, index) => {
                                                    return <img className={'restaurant-img'} src={image}
                                                                key={index} alt={'img'}/>
                                                })}
                                            </div>
                                            <div className={'left-img'}>
                                                <img src={"images/bt_syousai01.png"} key={index} alt={'img'}/>
                                            </div>
                                            <div className={'working-hours'}>
                                                <p>{restaurant.workingHours}</p>
                                                <p>{restaurant.timeOff}</p>
                                            </div>
                                            <hr/>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <p className={'footer'}>
                        飲食店 広告掲載案内
                    </p>
                </div>
            </div>
        )
    }
}