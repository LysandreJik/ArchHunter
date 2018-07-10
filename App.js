import React from 'react';
import Splash from './components/splash/Splash'
import Login from "./components/Login";

export default class App extends React.Component{
    state = {
        splashDone: false
    };

    render(){
        return this.state.splashDone ? <Login/> : <Splash callback={() => this.setState({splashDone: true})}/>;
    }
}
