import React from "react";
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

    handleLogout = (e) => {
        e.preventDefault();
        const location = this.props.location.pathname;
        // console.log(location.slice(0,6))
        // console.log(location.slice(7))
        if (location.slice(0,6) === "/rooms") {
            let object = { 'roomId': location.slice(7), 'playerId': this.props.currentUser.id };
            this.props.updateRoom(object)
                .then(() => this.props.logout())
        } else {
            const currentUser = this.props.currentUser
            this.props.logout()
            if (currentUser.username.slice(0, 8) === "DemoUser"){
                this.props.deleteUser(currentUser)
            }
        }
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <div id='navBar'>
                    <div id='logoTitle'>
                        <div id='Logo'>
                            <img id='logoPic' src="/images/transparent_phone.png" />    
                        </div>
                        <Link to={'/'}><h1>PICTOPHONE</h1></Link>
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
                            <img id='logoPic' src="/images/transparent_phone.png" />    
                        </div>
                        <Link to={'/'}><h1>PICTOPHONE</h1></Link>
                    </div>
                    <div id='navButtons'>
                        {/* <button className="navButton">Profile</button> */}
                        {/* <button className="navButton">Settings</button> */}
                        <button className="navButton" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            )
        }
    }
} 

export default NavBar