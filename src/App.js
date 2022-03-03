import React, {Component} from "react"
import MainLayout from './components/main-layout/main-layout'
import Index from './components/index/index'
import TopG00 from './components/home/src/top-g00'
import TopM00 from './components/home/src/top-m00'
import ProfileComponent from './components/profile-details/src/profile-component'
import Register from './components/register/register'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default class App extends Component {
    constructor(props) {

        super(props);
        this.pathName = window.location.pathname;
        this.state = {}
    }


    render() {

        return (
            <BrowserRouter>
                <MainLayout props={this}>
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
                               render={(props) => <Register {...props}/>}/>
                        <Route exact path="/:id"
                               render={(props) => <ProfileComponent {...props}/>}/>

                    </Switch>
                </MainLayout>

            </BrowserRouter>
        )
    }

}

