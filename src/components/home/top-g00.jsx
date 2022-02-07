import React from 'react';
import {Grid} from 'semantic-ui-react'
import Menu from '../main-layout/menu'
import Column from '../main-layout/column'
import SideMenu from '../main-layout/side-menu'

export default class TopG00 extends React.Component {

    constructor(props) {
        super(props);
        this.columnsData = {
            firstColumn:
                [
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '先週合計 9924 pt 獲得',
                        city: '東京都',
                        info: '岸本 友香 23歳',
                    }
                ],
            secondColumn:
                [
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    },
                    {
                        profileImage: 'images/column-images/1.jpg',
                        header: '2021.10.22　新規登録',
                        city: '大阪府',
                        info: 'こずえ　26歳',
                    }
                ],
            thirdColumn: [
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                },
                {
                    profileImage: 'images/column-images/1.jpg',
                    header: '2021.10.30 / 21:34 投稿',
                    city: '愛知県',
                    info: '吉本 春奈　23歳',
                }
            ]
        }
    }


    render() {
        return (
            <div className={'main-menu-section'}>
                <Menu/>
                <Grid>
                    <Grid.Row>
                        <Column data={this.columnsData.firstColumn} type={'first'} props={this.props}/>
                        <Column data={this.columnsData.secondColumn} type={'second'} props={this.props}/>
                        <Column data={this.columnsData.thirdColumn} type={'third'} props={this.props}/>
                        <Grid.Column computer={4} tablet={4} mobile={4}>
                         <SideMenu/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }


}