import React from "react";
import { Link } from 'react-router-dom'
import logo from "../../images/vintage-candlestick-telephone-vector-21717680.jpg"

class NavBar extends React.Component {

    render() {
        if (!this.props.loggedIn) {
            return (
                <div id='navBar'>
                    <div id='logoTitle'>
                        <div id='Logo'>
                            {/* <img id='logoPic' src={logo} />     */}
                        </div>
                        <h1>PICTOPHONE</h1>
                    </div>
                    <div id='navButtons'>
                        <button className="navButton">
                            <Link to={'/login'}>LOGIN</Link>
                        </button>
                        <button className="navButton">
                            <Link to={'/signup'}>SIGN UP</Link>
                        </button>
                    </div>

                </div>
            )
        } else {
            return(
                <div id='navBar'>
                    <div id='logoTitle'>
                        <div id='Logo'>
                            <img id='logoPic' src={logo} />    
                        </div>
                        <h1>Pictophone</h1>
                    </div>
                    <div id='navButtons'>
                        <button className="navButton">Profile</button>
                        <button className="navButton">Settings</button>
                        <button className="navButton" onClick={this.props.logout}>Logout</button>
                    </div>
                </div>
            )
        }
    }
} 

export default NavBar