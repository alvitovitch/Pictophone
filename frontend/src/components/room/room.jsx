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
        // this.socket.on('start-game', () => {
        //     debugger
        //     this.props.openModal('game') })
        this.leaveRoom = this.leaveRoom.bind(this)
        this.startGame = this.startGame.bind(this)
    }


    startGame() {
        this.socket.emit('start-game', this.props.roomId)
        this.props.openModal('game')

    }

    componentDidMount(){
        this.props.requestRoom(this.props.roomId)
            .then(()=>{
                if(!this.props.room.players.includes(this.props.currentUser.id)){
                    let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
                    this.props.updateRoom(object);
                }
            })
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
                <button onClick={this.startGame}>Start</button>
      
                {this.props.modal === "game" ? <Game_container room={this.props.room}/> : ""}
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