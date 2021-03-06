import { React } from "react";
import { withRouter } from 'react-router-dom'
import { socket } from '../../util/socket_util'

const LobbyIndexItem = (props) => {
    
    const { room, users, currentUser } = props;
    const joinRoom = (e) => {
        e.preventDefault();
        props.requestAllRooms()
            .then(
                () => {
                    if(room.size > room.players.length) {
                        props.updateRoom({ 'roomId': room._id, 'playerId': currentUser.id})
                        .then( () => {
                            socket.emit('update-count')
                            props.history.push(`/rooms/${room._id}`)
                        })
                    } else {
                        props.roomFullError(props.room._id);
                    }
                }
            )
    }

    const deleteRoom = e => {
        e.preventDefault();
        props.deleteRoom(room._id)
            .then(() => {
                socket.emit("update-count");
            })
    }

    const joinClass = room.players.length === room.size ? 'disabled' : '';

    return(
        <div className="index-room">
            <div className='star'>
                <img src="../../../images/star.png" />
            </div>
            <div className='room-details'>
                <div className="top-row">
                    <h2>room: {room.name}</h2>
                    <h2>{room.players.length}/{room.size}</h2>
                </div>
                <div className="bottom-row">
                    <h2>host: {users[room.host].username}</h2>
                    <div className="button-box">
                        {room.name.includes("Demo Room") ?
                        "" : < button className={`join ${joinClass}`} onClick={e => joinRoom(e)}>join</button>}
                        {currentUser.id === room.host ?
                            (
                                <button className="delete" onClick={e => deleteRoom(e)}>delete</button>
                            ) : ("")}
                    </div>
                </div>
                <p className="room-item-error">{props.errors.full && props.errors.full.id === room._id ? "This room is full" : ""}</p>
            </div>
            
            
        </div>
    )
}

export default withRouter(LobbyIndexItem);