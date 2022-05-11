import React from 'react';

export default class Box extends React.Component {

    constructor(props) {
        super(props);
    }

    getDetails = (element) => {
        this.props.props.history.push(`/${element.id}`)
    };

    render() {
        let element = this.props.element;
        let index = this.props.index;
        let forAll = this.props.all;
        let headerImage = this.props.headerImage;
        return (
            <>
                {
                    index === 0 && forAll?
                        <div className={'box-header'}>
                            <img src={`/images/column-images/${headerImage}`} alt={'img'}/>
                        </div>
                        : null

                }
                <div className={`box ${forAll ? 'all' : ''}`}
                     key={index}
                    onClick={() => {
                   this.getDetails(element)
               }}
                >
                    <img className={'profile-image'} src={element.profileImage} alt={'img'}/>
                    <img className={'number-img'} alt={'img'}
                         src={`images/${element.type === 'first' || element.type === 'top' ? `number-images/${index + 1}` :
                             element.type === 'second' || element.type === 'recent' ? element.gender === 'male' ? 'column-images/new_01a' : 'column-images/new_01b' : 'column-images/twiit'}.png`}/>
                    <div className={'box-text'}>
                        <p>{element.header}</p>

                    </div>

                    <p>{element.info}</p>
                    <p>{element.age}</p>
                    <div className={'image-section'}>
                        <img src={`images/column-images/${element.boxImage}`} alt={'img'}/>
                    </div>
                </div>
            </>
        );
    }
}
