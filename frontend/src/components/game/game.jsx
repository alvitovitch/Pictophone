import React from "react";
import GameBoard from "../board/game_board";
import GuessFormContainer from "./guess_form_container";
import { socket } from "../../util/socket_util";

import axios from "axios";

class Game extends React.Component {
    constructor(props) {    
        super(props)
        this.socket = socket;
        
        this.ring = new Audio('audio/ring.mp3')
        this.ring.volume = .4
        this.applause = new Audio('audio/applause.mp3')
        this.jolly = new Audio('audio/jolly-good-show.mp3')
        this.jolly.volume = .6

        this.socket.on('chain-received', () => {
            this.chainCount()
        })
        this.count = 0
        this.state = {
            players: this.props.room.players,
            chainId: (((this.props.room.players.findIndex(id => id === this.props.currentUser.id))+1)*10)+1,
            chainIds: [],
            fetchChainIds: [],
            turn: 0,
            gameover: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.draw = this.draw.bind(this);
        this.socket.on('increased-turn', () => {
            this.ring.currentTime = 0
            this.ring.play()
            this.setState({turn: this.state.turn + 1})
        })

    }

    componentDidMount() {
        let chainIds = [this.state.chainId];
        for (let i=0; i<this.props.room.size-1; i++) {
            let nextChainId = chainIds[chainIds.length-1] + 11;
            if (nextChainId > (this.props.room.size + 1) * 10) {
                nextChainId -= (this.props.room.size * 10);
            }

            chainIds.push(nextChainId);
        }
        let fetchChainIds = chainIds.map(id => id-1);
        fetchChainIds.shift()
        this.setState({ chainIds: chainIds });
        this.setState({ fetchChainIds: fetchChainIds });

    
       this.volume = document.getElementById("sound-control");
        this.volume.addEventListener("change", ()=> {
            this.ring.volume = (this.volume.value / 100)*.4;
            this.applause.volume = this.volume.value / 100;
            this.jolly.volume = (this.volume.value / 100)*.6;
        })
    }

    chainCount() {
        if (this.props.room.host === this.props.currentUser.id) {
            this.count++
        }
        if (this.count >= this.props.room.size) { 
            setTimeout(() => {
                this.socket.emit('increase-turn', this.props.room._id)
                this.count = 0;
            }, 1000)
        }
    }

    componentDidUpdate() {
        if (document.getElementById('prompt-div') !== null){
            if (this.state.turn % 2 !== 0) {
                document.getElementById('prompt-div').style.display = 'none'
            } else if (this.state.turn !== 0 && this.state.turn % 2 === 0) {
                document.getElementById('prompt-div').style.display = 'block'
                }
            }
        }


    handleSubmit() {
        
        const nextChainId = this.state.chainId + 11
        if (nextChainId > (this.state.players.length + 1) * 10) {
            this.setState({ chainId: nextChainId - (this.state.players.length * 10) })
            
        } else {
            this.setState({ chainId: this.state.chainId + 11 });

        }
    }


    draw() {
       
        // on a drawing turn
        // want to fetch the prompt on first turn
        // else fetch the previous chain guess
        let prompt = '';
        const promptDiv = document.createElement('div');
        promptDiv.id = 'prompt-div';
        if (this.state.turn === 0) {
            prompt = this.props.prompts[this.state.players.indexOf(this.props.currentUser.id)]
            promptDiv.innerText = prompt.word
            document.getElementById('draw-modal').appendChild(promptDiv)
            //take the initial randomized prompt and add it to our database as a "guess" with the current roomId, userId, and chainId minus 1 (yielding four guess chainIds for each respective user's initial chainId: 10(for 11), 20(for 21), 30(for 31), 40(for 41))
            let initialPrompt = {};
            initialPrompt['word'] = prompt.word
            initialPrompt['roomId'] = this.props.room._id; //changed from roomId
            initialPrompt['userId'] = this.props.currentUser.id;
            initialPrompt['chainId'] = this.state.chainId-1;
            this.props.createGuess(initialPrompt);

            let chain = {};
            chain[this.state.chainId-1] = prompt.word;
            this.props.updateGame({roomId: this.props.room._id,chainObj: chain})
            // Initial prompt is patched to backend game with respective players
            // chain IDs

        } else if (this.state.turn % 2 === 0 && this.state.turn !== this.props.room.size ) {
            axios.get(`/api/guesses/${this.props.room._id},${this.state.fetchChainIds[this.state.turn-1]}`)
            .then( 
                guess => {
                    document.getElementById('prompt-div').innerText = guess.data.word
                }
            )
        }
        
    }


    render() {
        if (this.state.turn % 2 !== 0) {
            document.getElementById('prompt-div').style.display = 'none';
        }
        
        if (this.state.turn === this.props.room.size) {
            this.props.handleGameOver();
            this.applause.play()
            this.jolly.play()
        }
        if (this.state.turn === 0) {
           
            return (
                <div id="draw-modal" className="game-modal">

                    <div className="game-container">
                        <GameBoard updateGame={this.props.updateGame} 
                            draw={this.draw} 
                            handleSubmit={this.handleSubmit} 
                            userId={this.props.currentUser.id} 
                            roomId={this.props.room._id} 
                            createDrawing={this.props.createDrawing} 
                            chainId={this.state.chainIds[this.state.turn]} 
                            fetchChainId={this.state.fetchChainIds[this.state.turn]} />
                        {/* DRAW */}
                    </div>
                </div>
            )
        } else if (this.state.turn > 0 && this.state.turn !== this.props.room.size)  {
            
            return (
                (this.state.turn % 2 === 0 ?
                    <div className="game-modal">
                        <div className="game-container">
                            <GameBoard updateGame={this.props.updateGame} 
                            draw={this.draw}  
                            handleSubmit={this.handleSubmit} 
                            userId={this.props.currentUser.id} 
                            roomId={this.props.room._id} 
                            createDrawing={this.props.createDrawing} 
                            chainId={this.state.chainIds[this.state.turn]} 
                            fetchChainId={this.state.fetchChainIds[this.state.turn]} />
                            {/* DRAW */}
                        </div>
                    </div>
                    :
                    <div className="game-modal">
                        <div className="game-container">
                          
                            {/* GUESS */}
                            <GuessFormContainer handleSubmit={this.handleSubmit} 
                                roomId={this.props.room._id} 
                                userId={this.props.currentUser.id} 
                                chainId={this.state.chainIds[this.state.turn]} 
                                fetchChainId={this.state.fetchChainIds[this.state.turn-1]} />
                        </div>
                    </div>
                )
            )
        } else {
            return(
                null
            )
        }
    }
}

export default Game;
