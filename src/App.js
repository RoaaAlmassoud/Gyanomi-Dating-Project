import React, {Component} from "react"
import MainLayout from './components/main-layout/main-layout'
import Index from './components/index/index'
import TopG00 from './components/home/src/top-g00'
import TopM00 from './components/home/src/top-m00'
import ProfileComponent from './components/profile-details/src/profile-component'
import Register from './components/register/src/register'
import Logout from './components/logout/logout'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContext from './context/app-context';
import {Label} from 'semantic-ui-react'
import Helper from '../src/utils/helper'
import {css} from 'glamor';
import {toast, ToastContainer} from 'react-toastify';
import {Icon} from 'semantic-ui-react'

export default class App extends Component {
    constructor(props) {

        super(props);
        this.pathName = window.location.pathname;
        this.state = {
            errorFor: this.errorFor,
            refreshKey: Helper.unique()
        }
    }


    notify = (error, message, duration = 5000) =>
        (message) ? toast(
            error ?
                <div><Icon size="large" name='warning'/> {message}</div>
                : <div><Icon link name='check'/> {message}</div>,
            {
                autoClose: duration,
                className: css({
                    padding: '10px',
                    color: error ? '#912d2b !important' : 'teal !important',
                }),
                progressClassName: css({
                    background: error ? '#912d2b !important' : 'teal !important',
                }),
                // This position to determine where should the toast appear . (default top right)
                position: toast.POSITION.TOP_RIGHT,
            }) : null;

    errorFor = (state, field, component, direction) => {
        let {isMobile, screenSize} = this.state;
        if (component === 'login' || component === 'register') {
            isMobile = screenSize <= 990;
        }

        let hide = state.validationErrors[field]? state.validationErrors[field].includes('required'): false;
        if (state.validationErrors[field] && state.showErrors) {
            return <div className={`error-section ${state.serverError && !hide ? '' : 'invisible'}`}>
                <Label
                    basic color='red' pointing={direction || isMobile ? `above` : 'right'}>
                    {state.validationErrors[field]}
                </Label>
            </div>
        }
        return null
    }


    render() {
        return (
            <BrowserRouter>
                <AppContext.Provider value={this.state}>
                    <MainLayout props={this} key={Helper.unique()}>
                        {/*<Routes>
                        <Route exact path="/top_g00"
                               render={(props) => {
                                   console.log('props in return: ', props)
                                   return <TopG00 {...props}/>}
                               }/>
                        <Route exact path="/top_m00" element={<TopM00/>}/>
                        <Route exact path="/top_g00" element={<TopG00 props={this.props}/>}/>
                        <Route exact path="/pg10001" element={<FemaleComponent/>}/>
                        <Route exact path="/pm10001" element={<TopM00/>}/>
                    </Routes>*/}

                        <Switch>
                            <Route exact path="/"
                                   render={(props) => <Index {...props}/>}/>
                            <Route exact path="/top_g00"
                                   render={(props) => <TopG00 {...props}/>}/>
                            <Route exact path="/top_m00"
                                   render={(props) => <TopM00 {...props}/>}/>
                            <Route exact path="/register"
                                   render={(props) => <Register notify={this.notify} {...props}/>}/>
                            <Route exact path="/logout"
                                   render={(props) => <Logout {...props}/>}/>
                            <Route exact path="/update/:id"
                                   render={(props) => <Register notify={this.notify} {...props}/>}/>
                            <Route exact path="/:id"
                                   render={(props) => <ProfileComponent {...props}/>}/>

                        </Switch>
                        <ToastContainer autoClose={5000}/>
                    </MainLayout>
                </AppContext.Provider>
            </BrowserRouter>
        )
    }

}

