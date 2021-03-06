import React from 'react';
import {Grid} from 'semantic-ui-react'
import Box from "./box"

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.headerImage = props.type === "first" ? 'tab_01.png' : props.type === "second" ?
            props.gender === "male" ? 'tab_02a.png' : 'tab_02b.png' : 'tab_03.png';
        this.boxImage = props.type === "first" ? 'kuwashiku_01.png' : props.type === "second" ?
            props.gender === "male" ? 'kuwashiku_02a.png' : 'kuwashiku_02b.png' : 'kuwashiku_03.png';
        this.footerImage = props.type === "first" ? 'miru_01.png' : props.type === "second" ?
            props.gender === "male" ? 'miru_02a.png' : 'miru_02b.png' : 'miru_03.png';
        this.rightImage = props.type === 's'
    }

    /*getDetails = (element) => {
        this.props.props.history.push(`/${element.id}`)
    };*/

    goToAll = (type) => {
        let pathName = "";
        switch (type) {
            case 'first':
                pathName = "top_users";
                break;
            case 'second':
                pathName = "recent_users";
                break;
            case 'third':
                pathName = "tweets";
                break;
            default:
                pathName = "top_users_g00";
                break;

        }
        let genderPath = 'g00';
        if(this.props){
            genderPath = this.props.props.location? this.props.props.location.pathname.split('_')[1]: 'g00'
        }
        pathName = `${pathName}_${genderPath}`;
        this.props.props.history.push(`/${pathName}`)
    }

    render() {
        return (
            <Grid.Column computer={4} tablet={4} mobile={4} className={'popularity-column'}>
                <div className={'popularity-header'}>
                    <img src={`images/column-images/${this.headerImage}`} alt={'img'}/>
                </div>
                <div className={'popularity-elements'}>
                    {
                        this.props.data.map((element, index) => {
                            element.type = this.props.type;
                            element.gender = this.props.gender;
                            element.boxImage = this.boxImage;
                            return <Box element={element} index={index} props={this.props.props}/>
                            {/*<div className={'box'} key={index} onClick={() => {
                                this.getDetails(element)
                            }}>
                                <img className={'profile-image'} src={element.profileImage} alt={'img'}/>
                                <div className={'box-text'}>
                                    <p>{element.header}</p>
                                    <img className={'number-img'} alt={'img'}
                                         src={`images/${this.props.type === 'first' ? `number-images/${index + 1}` :
                                             this.props.type === 'second' ? this.props.gender === 'male' ? 'column-images/new_01a' : 'column-images/new_01b' : 'column-images/twiit'}.png`}/>
                                </div>
                                <p>{element.info}</p>
                                <p>{element.age}</p>
                                <div className={'image-section'}>
                                    <img src={`images/column-images/${this.boxImage}`} alt={'img'}/>
                                </div>
                            </div>*/}
                        })
                    }
                </div>
                <div className={'popularity-footer'}>
                    <img
                        src={`images/column-images/${this.footerImage}`}
                        onClick={() => this.goToAll(this.props.type)}
                        alt={'img'}
                    />
                </div>
            </Grid.Column>
        )
    }
}
