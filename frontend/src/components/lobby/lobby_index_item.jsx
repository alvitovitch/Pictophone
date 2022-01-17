import { React } from "react";
import { withRouter } from 'react-router-dom'

const LobbyIndexItem = (props) => {
    
    const { room } = props;

    const join = (e) => {
        e.preventDefault();
        if(room.size > room.players.length) {
            props.history.push(`/room/${room.id}`)
        } else {
            console.log("Room is full")
        }
    }

    return(
        <div className="index-room">
            <div className="left-side">
                <h2>{props.room.name}</h2>
                <h2>{props.room.host}</h2>
            </div>
            <div className="right-side">
                <h2>{props.room.players.length}/{props.room.size}</h2>
                <button onClick={e => join(e)}>Join</button>
            </div>
        </div>
    )
}

export default withRouter(LobbyIndexItem);