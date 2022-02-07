import React, {Component} from "react"
import MainLayout from './components/main-layout/main-layout'
import TopG00 from './components/home/top-g00'
import TopM00 from './components/home/top-m00'
import FemaleComponent from './components/profile-details/female-component'
import MaleComponent from './components/profile-details/male-component'
//import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
                        <Route exact path="/top_g00"
                               render={(props) => <TopG00 {...props}/>}/>
                        <Route exact path="/top_m00"
                               render={(props) => <TopM00 {...props}/>}/>
                        <Route exact path="/pg10001"
                               render={(props) => <FemaleComponent {...props}/>}/>
                        <Route exact path="/pm10001"
                               render={(props) => <MaleComponent {...props}/>}/>
                    </Switch>
                </MainLayout>

            </BrowserRouter>
        )
    }

}

