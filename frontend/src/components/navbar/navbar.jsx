import React from "react";
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    
    constructor(props){
        super(props)
        this.smoothJazz = new Audio('audio/smoothJazz.mp3')
        this.smoothJazz.volume = .2
    }

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
                            {/* <img id='logoPic' src="/images/transparent_phone.png" />   */}
                            <img id='logoPic' src="/images/vintage_phone.png" />  
                        </div>
                    </div>
                    <Link to={'/'} className="main-title">Pictophone</Link>
                    <div id='navButtons'>
                        <button className="navButton">
                            <Link to={'/login'}>login</Link>
                        </button>
                        <button className="navButton">
                            <Link to={'/signup'}>sign up</Link>
                        </button>
                    </div>

                </div>
            )
        } else {
            this.smoothJazz.play() 
            return(
                <div id='navBar'>
                    <div id='logoTitle'>
                        <div id='Logo'>
                            {/* <img id='logoPic' src="/images/transparent_phone.png" /> */}
                            <img id='logoPic' src="/images/vintage_phone.png" /> 
                        </div>
                    </div>
                        <Link to={'/'} className="main-title">Pictophone</Link>
                    <div id='navButtons'>
                        {/* <button className="navButton">Profile</button> */}
                        {/* <button className="navButton">Settings</button> */}
                        <button className="navButton" onClick={this.handleLogout}>logout</button>
                    </div>
                </div>
            )
        }
    }
} 

export default NavBar