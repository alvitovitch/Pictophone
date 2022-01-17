import React from "react";
import NavBarContainer from "./navbar/navbar_container";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Splash from "./splash/splash";



const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path='/' component={Splash} />
        </Switch>
    </div>
);

export default App;