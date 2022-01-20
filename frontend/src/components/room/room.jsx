import React from "react";
import { io } from 'socket.io-client';
import { socket } from '../../util/socket_util';
import MessageBoxContainer from "../messages/messageBoxContainer";
// import DrawingBoard from '../board/drawing_board';
import Board from '../board/board';
import Game_container from "../game/game_container";
import Modal from "../modal/modal";


class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = socket;
        this.socket.emit('join-room', this.props.roomId);
        this.socket.on('start-game', () => {

        this.props.openModal('game') })
        
        this.leaveRoom = this.leaveRoom.bind(this);
        this.startGame = this.startGame.bind(this);
        this.prompts = [];


    }

    // if player is the room leader maintain a count of images/prompts submitted
    // when the count each turn === roomsize then go to next round
    // 

    startGame() {
        this.socket.emit('start-game', this.props.roomId)
        this.props.openModal('game')

    }

    componentDidMount(){

        this.props.requestAllUsers()
        .then(() => this.props.requestRoom(this.props.roomId))
            .then(()=>{
                if(!this.props.room.players.includes(this.props.currentUser.id)){
                    let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
                    this.props.updateRoom(object);
                }
            })
            .then(() => {
                this.props.requestAllPrompts().then(
                    () => {
                        this.fillPrompts()
                    }
            )})
    }

    fillPrompts() {
        while (this.prompts.length < this.props.room.size) {
            const randomPrompt = Object.values(this.props.prompts)[Math.floor(Math.random() * Object.values(this.props.prompts).length)]
            if (!this.prompts.includes(randomPrompt)) {
                this.prompts.push(randomPrompt)
            }
        }

    }
    

    componentWillUnmount() {
        let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
        this.props.updateRoom(object);
        this.props.closeModal();
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
        if (!this.props.users) {
            return null
        } else {
            const { users } = this.props;
            const players = this.props.room.players;
            
            const currentPlayers = players.map(id =>
                (Object.values(users)).filter(user => user._id === id)
            )
            
            const playersList = currentPlayers.map((sub, idx) => (
                <div key={idx} className='player-list-item'>
                    <img src={`/images/avatars/avatar${idx + 1}.png`} alt="" />
                    <p>{sub[0].username}</p>
                </div>
                  ))
          return (
                <div className='room-main'>
                    <div className='left-container'>
                        <div className='players-container'>
                            {playersList}
                        </div>
                        
                        <button className='start-button' onClick={this.startGame}>Start</button>
                        {this.props.modal === "game" ? <Game_container room={this.props.room} /> : ""}
                        
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
}

export default Room;