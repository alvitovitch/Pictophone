import React from "react";
import LobbyIndexItem from "./lobby_index_item";
import CreateRoomContainer from "./create_room_container";
import Modal from "../modal/modal";

class LobbyIndex extends React.Component {

    componentDidMount(){
        this.props.requestAllUsers()
            .then(() => this.props.requestAllRooms())
    }

    render(){
        // const room = {id: 1, name: "room", size: 6, host: "Host name", players: [1,2,3,4]}
        const { rooms, users, currentUser } = this.props
        if (rooms.length === 0 ) return null;
        return(
            <div className="lobby-page">
                <Modal />
                <section className="rooms-container">
                    <div className="rooms-container-header">
                        <p>Current Games</p>
                        <button onClick={e=>this.props.openModal('createRoom')}>Create a room</button>
                    </div>
                    <ul>
                        {rooms.map((room, i) => (
                            <LobbyIndexItem
                                key={i}
                                currentUser={currentUser}
                                updateRoom={this.props.updateRoom} 
                                users={users}
                                room={room}/>
                        ))}
                    </ul>
                </section>
                <CreateRoomContainer />
            </div>
        )
    }
}

export default LobbyIndex;