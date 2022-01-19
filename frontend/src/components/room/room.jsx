import React from "react";
import { io } from 'socket.io-client'
import MessageBoxContainer from "../messages/messageBoxContainer";
// import DrawingBoard from '../board/drawing_board';
import Board from '../board/board';
import avatar1 from '../../images/avatars/bicycle.png';
import avatar2 from '../../images/avatars/chair.png';
import avatar3 from '../../images/avatars/globe.png';
import avatar4 from '../../images/avatars/peacock.png';

class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = io.connect('https://pictophone.herokuapp.com:4040')
        this.socket.emit('join-room', this.props.roomId)

        this.leaveRoom = this.leaveRoom.bind(this)
    }

    leaveRoom(e) {
        e.preventDefault();
        let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id};
        this.props.updateRoom(object);
        this.props.history.push('/lobby');
    }

    render() {
        return (
        <div className='room-main'>
            <div className='players-container'>
                <img src={avatar1} alt="" />
                <p></p>
            </div>
            <div id='draw-container'>
                <div id='freeDrawSpace'>
                    <Board roomId={this.props.roomId}></Board>
                </div>
                <div id='chat-container'>
                    <button onClick={this.leaveRoom}
                        id='leaveRoom'>
                        Leave Room
                    </button>
                    <MessageBoxContainer socket={this.socket} roomId={this.props.roomId} />
                </div>
            </div>
        </div>
           
        )
    }
}

export default Room