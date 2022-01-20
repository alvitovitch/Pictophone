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
            props.roomFullError(props.room._id);
            console.log(e.currentTarget.className)
        }
    }


    return(
        <div className="index-room">
            <div className="top-row">
                <h2>Room: {room.name}</h2>
                <h2>{room.players.length}/{room.size}</h2>
            </div>
            <div className="bottom-row">
                <h2>{users[room.host].username}</h2>
                <div className="button-box">
                    <button onClick={e => join(e)}>Join</button>
                    {currentUser.id === room.host ? 
                        (
                            <button className="r" onClick={e=>props.deleteRoom(room._id)}>Delete</button>
                        ) : ("")}
                </div>
            </div>
            <p className="room-item-error">{props.errors.full && props.errors.full.id === room._id ? "This room is full" : ""}</p>
        </div>
    )
}

export default withRouter(LobbyIndexItem);