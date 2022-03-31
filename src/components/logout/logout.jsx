import React, {Component} from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('token')
        localStorage.removeItem('accountId')
        localStorage.removeItem('name')
        this.props.history.push('/');
        window.location.reload(true)
    }


    componentDidMount(){

    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Logout;