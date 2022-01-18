import React from "react";
import { io } from 'socket.io-client'
import MessageBoxContainer from "../messages/messageBoxContainer";
// import DrawingBoard from '../board/drawing_board';
import Board from '../board/board';

class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = io.connect()
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
            <div id='Room'>
                <div id='freeDrawSpace'>
                    <Board roomId={this.props.roomId}></Board>
                </div>
                <div id='roomChat'>
                    <button onClick={this.leaveRoom}
                    id='leaveRoom'>
                        Leave Room
                    </button>
                    <MessageBoxContainer socket={this.socket} roomId={this.props.roomId} />
                </div>
            </div>
        )
    }
}

export default Room