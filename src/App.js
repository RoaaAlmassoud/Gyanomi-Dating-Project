import React, {Component} from "react"
import MainLayout from './components/main-layout/main-layout'
import TopG00 from './components/home/top-g00'
import TopM00 from './components/home/top-m00'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

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
                    <Routes>
                        <Route exact path="/top_g00" element={<TopG00/>}/>
                        <Route exact path="/top_m00" element={<TopM00/>}/>
                    </Routes>

                </MainLayout>

            </BrowserRouter>
        )
    }

}

