import { React } from "react";
import { withRouter } from 'react-router-dom'

const LobbyIndexItem = (props) => {
    
    const { room, users, currentUser } = props;

    const join = (e) => {
        e.preventDefault();
        if(room.size > room.players.length) {
            props.updateRoom({ 'roomId': room._id, 'playerId': currentUser.id})
                .then( () => props.history.push(`/rooms/${room._id}`))
        } else {
            console.log("Room is full")
        }
    }

    return(
        <div className="index-room">
            <div className="left-side">
                <h2>{room.name}</h2>
                {/* Need to replace with users[room.host] */}
                <h2>{users[room.host].username}</h2>
            </div>
            <div className="right-side">
                <h2>{room.players.length}/{room.size}</h2>
                <button onClick={e => join(e)}>Join</button>
                {currentUser.id === room.host ? 
                    (
                        <button onClick={e=>props.deleteRoom(room._id)}>Delete</button>
                    ) : ("")}
            </div>
        </div>
    )
}

export default withRouter(LobbyIndexItem);