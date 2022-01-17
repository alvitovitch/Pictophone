import React from "react";
import { Link } from 'react-router-dom'
import logo from "../../images/vintage-candlestick-telephone-vector-21717680.jpg"


class NavBar extends React.Component {

    render() {
    
        return (
            <div id='navBar'>
                <div>
                    <div id='Logo'>
                        <img src={logo} />    
                    </div>
                Pictophone
                </div>
                <div>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Sign up</Link>
                </div>
            </div>
        )
    }
} 

export default NavBar