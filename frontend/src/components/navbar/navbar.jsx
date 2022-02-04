import React from "react";
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
    
    constructor(props){
        super(props)
        this.smoothJazz = new Audio('audio/smoothJazz.mp3')
        this.smoothJazz.loop = true
        this.smoothJazz.volume = .2
    }

    componentDidMount() {
        this.volume = document.getElementById("music-control");
        this.volume.addEventListener("change", ()=> {
            this.smoothJazz.volume = this.volume.value / 100;
        })
    }

    handleClick(e) {
        if (e.target === document.getElementById('settings-modal'))
        {
            e.target.style.display = 'none'
        }
    }

    showSettings(){
        document.getElementById('settings-modal').style.display = 'flex'
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
            this.smoothJazz.pause()
            this.smoothJazz.currentTime = 0
            return (
                <div id='navBar'>
                    <div id='settings-modal' onClick={e => this.handleClick(e)}>
                        <div id='settings-content'>
                            <div className="settings-option">
                                <h3>Sound Effects</h3>
                                <input type="range" id="sound-control"/>
                            </div>
                            <div className="settings-option">
                                <h3>Music</h3>
                                <input type="range" id="music-control"/>
                            </div>
                        </div>
                    </div>
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
                    <div id='settings-modal' onClick={e => this.handleClick(e)}>
                        <div id='settings-content'>
                            <div className="settings-option">
                                <h3>Sound Effects</h3>
                                <input type="range" id="sound-control"/>
                            </div>
                            <div className="settings-option">
                                <h3>Music</h3>
                                <input type="range" id="music-control"/>
                            </div>
                        </div>
                    </div>
                    <div id='logoTitle'>
                        <div id='Logo'>
                            {/* <img id='logoPic' src="/images/transparent_phone.png" /> */}
                            <img id='logoPic' src="/images/vintage_phone.png" />
                        </div>
                    </div>
                        <Link to={'/'} className="main-title">Pictophone</Link>
                    <div id='navButtons'>
                        {/* <button className="navButton">Profile</button> */}
                        <button onClick={this.showSettings} className="navButton">Settings</button>
                        <button className="navButton" onClick={this.handleLogout}>logout</button>
                    </div>
                </div>
            )
        }
    }
} 

export default NavBar