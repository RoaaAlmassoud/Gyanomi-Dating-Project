import React from 'react';
import {Grid, Loader} from 'semantic-ui-react'
import Menu from '../../main-layout/menu'
import Column from '../../main-layout/column'
import SideMenu from '../../main-layout/side-menu'
import HomeApi from "../api/home-api"
import {prefecturesList} from '../../../utils/static-data'

export default class TopM00 extends React.Component {

    constructor(props) {
        super(props);
        this.homeApi = new HomeApi(this);
        this.state = {
            columnsData: {
                top: [],
                recent: [],
                tweets: []
            },
            loading: true
        };
    }

    async componentDidMount() {
        const response = await this.homeApi.getHome({isMale: 1});
        this.setState({
            loading: false,
        });
        if (response.data) {
            let columnsData = this.state.columnsData;
            let columnsNames = ['top', 'recent', 'tweets'];
            columnsNames.map((column) => {
                columnsData[column] = response.data ? response.data.data[column].map((item, index) => {
                    let renderedObject = column === 'tweets' ? item.user : item;
                    let headerText = column === 'top' ? `先週合計 ${response.data.data[column].length - index} pt 獲得` :
                        column === 'recent' ? `${renderedObject.created_at ? renderedObject.created_at.split('T')[0] : ''} 新規登録` :
                            `${renderedObject.created_at ? renderedObject.created_at.split('T')[0] : ''} / 
                            ${renderedObject.created_at ? renderedObject.created_at.split('T')[1].substring(0, 5) : ''} 投稿`;
                    return {
                        profileImage: `${renderedObject.icon_image? !renderedObject.icon_image.includes('http://api.gyanomi.com/')?'http://api.gyanomi.com/': '': ''}${renderedObject.icon_image}`,
                        header: headerText,
                        info: `${renderedObject.name}, ${prefecturesList.find(a => a.value === renderedObject.male.prefecture) ?
                            prefecturesList.find(a => a.value === renderedObject.male.prefecture).text : ''}`,
                        age: `${renderedObject.male.age} years old`,
                        id: renderedObject.uuid
                    }
                }) : []
            });

            this.setState({columnsData: columnsData})
        }

    }

    render() {
        return (
            <div className={'main-menu-section'}>
                <Menu props={this.props}/>
                <Grid>
                    <Grid.Row>
                        {
                            this.state.loading ?
                                <Loader active={this.state.loading}/>
                                :
                                <>
                                    <Column key={'first'}
                                            data={this.state.columnsData.top} type={'first'} gender={'male'}
                                            props={this.props}/>
                                    <Column key={'second'}
                                            data={this.state.columnsData.recent} type={'second'} gender={'male'}
                                            props={this.props}/>
                                    <Column key={'third'}
                                            data={this.state.columnsData.tweets} type={'third'} gender={'male'}
                                            props={this.props}/>
                                </>
                        }
                        <Grid.Column computer={4} tablet={4} mobile={4}>
                            <SideMenu/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }


}