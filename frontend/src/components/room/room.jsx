import React from "react";
import { io } from 'socket.io-client'
import MessageBoxContainer from "../messages/messageBoxContainer";
class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = io('http://localhost:6000')
        this.socket.emit('join-room', this.props.roomId)

        this.leaveRoom = this.leaveRoom.bind(this)
    }

    leaveRoom() {
        debugger
        this.props.updateRoom(this.props.roomId)
        this.props.history.push('../lobby')

    }

    render() {
        return (
            <div id='Room'>
                <div id='freeDrawSpace'>
                    Free Draw
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