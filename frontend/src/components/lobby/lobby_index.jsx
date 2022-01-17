import React from "react";
import LobbyIndexItem from "./lobby_index_item";

class LobbyIndex extends React.Component {
    render(){
        const room = {id: 1, name: "room", size: 6, host: "Host name", players: [1,2,3,4]}
        const rooms = [room, room, room, room]
        return(
            <div className="lobby-page">
                <section className="rooms-container">
                    <div className="rooms-container-header">
                        <p>Current Games</p>
                        <button>Create a room</button>
                    </div>
                    <ul>
                        {rooms.map((room, i) => (
                            <LobbyIndexItem
                                key={i} 
                                room={room}/>
                        ))}
                    </ul>
                </section>
            </div>
        )
    }
}

export default LobbyIndex;