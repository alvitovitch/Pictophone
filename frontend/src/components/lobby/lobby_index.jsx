import React from "react";
// import './lobby.css'

class LobbyIndex extends React.Component {
    render(){
        return(
            <div className="lobby-page">
                <aside>
                    <h2>Pic feed</h2>
                </aside>
                <section className="rooms-container">
                    <ul>
                        <div className="room">Room</div>
                        <div className="room">Room</div>
                        <div className="room">Room</div>
                    </ul>
                </section>
            </div>
        )
    }
}

export default LobbyIndex;