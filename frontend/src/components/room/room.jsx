import React from "react";
import { io } from 'socket.io-client';
import { socket } from '../../util/socket_util';
import MessageBoxContainer from "../messages/messageBoxContainer";
// import DrawingBoard from '../board/drawing_board';
import Board from '../board/board';
import Game_container from "../game/game_container";
import avatar1 from '../../images/avatars/bicycle.png';
// import avatar2 from '../../images/avatars/chair.png';
// import avatar3 from '../../images/avatars/globe.png';
// import avatar4 from '../../images/avatars/peacock.png';
import Modal from "../modal/modal";

class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = socket;
        this.socket.emit('join-room', this.props.roomId);
        this.prompts = []
        this.leaveRoom = this.leaveRoom.bind(this)
        

    }

    componentDidMount(){
        this.props.requestRoom(this.props.roomId)
            .then(()=>{
                if(!this.props.room.players.includes(this.props.currentUser.id)){
                    let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
                    this.props.updateRoom(object);
                }
            })
            .then( () =>
        this.props.requestAllPrompts().then(
                () => 
                {
                    this.fillPrompts()
                }
                    ))
    }

    fillPrompts(){
        
        while(this.prompts.length < this.props.room.size) {
            const randomPrompt = Object.values(this.props.prompts)[Math.floor(Math.random() * Object.values(this.props.prompts).length)]
            if (!this.prompts.includes(randomPrompt)) {
                this.prompts.push(randomPrompt)
            }
        }
    }

    componentWillUnmount(){
        let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
        this.props.updateRoom(object);
    }

    leaveRoom(e) {
        e.preventDefault();
        // let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id};
        // this.props.updateRoom(object);
        this.socket.emit('leave-room', this.props.roomId);
        this.props.history.push('/lobby');
    }

    render() {
        if (!this.props.room) return null;
        return (
        <div className='room-main'>
            <div className='players-container'>
                <button onClick={e => this.props.openModal('game')}>Start</button>
                {this.props.modal === "game" ? <Game_container prompts={this.prompts} room={this.props.room} socket={this.socket} /> : ""}
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
                    <MessageBoxContainer roomId={this.props.roomId} />
                </div>
            </div>
            {/* <Game_container room={this.props.room}/> */}
        </div>
           
        )
    }
}

export default Room