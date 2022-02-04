import React from "react";
import { io } from 'socket.io-client';
import { socket } from '../../util/socket_util';
import MessageBoxContainer from "../messages/messageBoxContainer";
import Board from '../board/board';
import GameContainer from "../game/game_container";
import Modal from "../modal/modal";
import Demo from "../demo/demo";
import GameOver from "../gameover/gameover";


class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = socket;
        this.socket.emit('join-room', this.props.roomId);
        this.socket.emit('userId', this.props.currentUser.id)
        this.socket.on('start-game', () => {
        this.props.openModal('game') })
        this.socket.on('disc', (userId) => {
            const players = this.props.room.players;
            if (userId === players[0]){
                players.shift()
            }
            if (this.props.currentUser.id === players[0]){
                let object = { 'roomId': this.props.roomId, 'playerId': userId };
                this.props.updateRoom(object)
            }
            window.setTimeout((() => this.props.requestRoom(this.props.roomId)),1000)
        })
        this.leaveRoom = this.leaveRoom.bind(this);
        this.startGame = this.startGame.bind(this);
        this.prompts = [];
        this.state = {
            gameOver: false,
            gameStart: false
        }
        this.handleGameOver = this.handleGameOver.bind(this);
        this.handleDemoGameOver = this.handleDemoGameOver.bind(this);
        this.startDemo = this.startDemo.bind(this);



    }

    startGame() {

        this.props.createGame({roomId: this.props.roomId})
        .then(() => {
            this.socket.emit('start-game', this.props.roomId);
            this.props.openModal('game');
            this.setState({ gameStart: true })

        })
    }

    startDemo() {
        this.props.openModal('demo');
        this.setState({gameStart: true})
    }

    handleGameOver() {
        this.props.requestGame(this.props.roomId)
        .then(
            () => this.setState({ gameOver: true })
        )

    }

    handleDemoGameOver(demo) {

        this.setState({ gameOver: true })
        this.props.receiveDemo(demo)
        
    }

    componentDidMount(){
        // window.addEventListener('beforeunload',e => {
        //     e.preventDefault()
        //     e.returnValue = ''
        //     this.socket.emit("test")
        // })

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
        this.props.updateRoom(object)
            .then(() => this.socket.emit("update-count"))
        this.props.closeModal();
    }

    leaveRoom(e) {
        e.preventDefault();
        this.socket.emit('leave-room', this.props.roomId);
        this.props.history.push('/lobby');
        if (this.props.room.name.includes("Demo Room")){
            this.props.deleteRoom(this.props.roomId);
        }
    }


    render() {

        
        if (!this.props.room) return null;
        const { currentUser, room} = this.props;
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
                        <div className='players-container'>
                            {playersList}
                        </div>
                  <div id='game-room-container'>    
                      <div className='left-container'>

                        
                        { this.props.room.name.includes("Demo Room") ? 
                            ((this.state.gameStart || room.host !== currentUser.id) ? "" : <button className="start-button" onClick={this.startDemo}>demo game</button>) 
                                : 
                            ((this.state.gameStart || room.host !== currentUser.id) ? "" : <button className='start-button' onClick={this.startGame}>start</button>)
                        }
                        {/* <button className='start-button' onClick={this.handleGameOver}>Start</button> */}
                        {this.props.modal === "game" ? <GameContainer prompts={this.prompts} room={this.props.room} handleGameOver={this.handleGameOver}/> : ""}
                        {this.props.modal === "demo" ?
                        <Demo demo={true} handleDemoGameOver={this.handleDemoGameOver} /> : "" }
                        
                    </div>
                    <div id='draw-container'>
                        <div id='freeDrawSpace'>
                            {this.state.gameOver ? <GameOver roomId = {this.props.roomId} room = {this.props.room}/> : <Board roomId={this.props.roomId}></Board>}
                        </div>
                        <div id='chat-container'>
                            <button onClick={(e) => { this.leaveRoom(e); this.props.removeDemo(); }}
                                id='leaveRoom'>
                                leave room
                            </button>
                            <MessageBoxContainer roomId={this.props.roomId} />

                            </div>

                        </div>
                    </div>

                </div>

            )
          }
    }
}

export default Room;