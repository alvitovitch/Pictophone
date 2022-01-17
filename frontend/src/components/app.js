import React from "react";
import NavBarContainer from "./navbar/navbar_container";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Splash from "./splash/splash";
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';



const App = () => (
    <div id='appMain'>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <AuthRoute exact path='/' component={Splash} />

            <ProtectedRoute path='/lobby' component={LobbyContainer}/>
            <ProtectedRoute patch='/room/:roomId' component={RoomContainer}/> 
        </Switch>
    </div>
);

export default App;