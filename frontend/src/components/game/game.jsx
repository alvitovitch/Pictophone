import React from "react";
import GameBoard from "../board/game_board";
import GuessFormContainer from "./guess_form_container";
import { socket } from "../../util/socket_util";

import axios from "axios";

class Game extends React.Component {
    constructor(props) {    
        super(props)
        this.socket = socket;
        
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
            //prevChainId: this.state.chainId-10,
            // nextId: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.draw = this.draw.bind(this);
        this.socket.on('increased-turn', () => {
            // this.nextId()
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
        console.log(chainIds)
        console.log(fetchChainIds)
       // this.draw();
    }

    // nextId() {
    //     let nextId = this.state.chainId + 10 
    //     if (nextId > (this.state.players.length + 1) * 10) {
    //             nextId -= (this.state.players.length * 10)
    //         }
    //     this.setState({nextId: nextId})
    //     }

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

    
    // componentDidMount() {
    // //     setTimeout(() => {
    // //         this.setState({ chainId: this.state.chainId + 11 });
    // //         if (this.state.chainId > (this.state.players.length+1)*10) {
    // //             this.setState({ chainId: this.state.chainId - (this.state.players.length*10)})
    // //         };
    // //         //this.setState({ turn: this.state.turn + 1 });
    // //     }, 30000);
    // }

    // componentDidUpdate() {
    //     if (this.state.gameover) {
    //         // end the game? or unmount the component?
    //     }   else if (this.state.chainId % 2 === 0) {
    //         setTimeout(() => {
    //             this.setState({ chainId: this.state.chainId + 11 });
    //             if (this.state.chainId > (this.state.players.length + 1) * 10) {
    //                 this.setState({ chainId: this.state.chainId - (this.state.players.length * 10) })
    //             };
    //            // this.setState({ turn: this.state.turn + 1 });
    //         }, 15000);
    //     } else {
    //         setTimeout(() => {
    //             this.setState({ chainId: this.state.chainId + 11 });
    //             if (this.state.chainId > (this.state.players.length + 1) * 10) {
    //                 this.setState({ chainId: this.state.chainId - (this.state.players.length * 10) })
    //             };
    //             //this.setState({ turn: this.state.turn + 1 });
    //         }, 30000);
    //     }
    // }


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
        let prompt = ''
        const promptDiv = document.createElement('div')
        promptDiv.id = 'prompt-div'
        if (this.state.turn === 0) {
            prompt = this.props.prompts[this.state.players.indexOf(this.props.currentUser.id)]
            promptDiv.innerText = prompt.word
            document.getElementById('draw-modal').appendChild(promptDiv)
        } else if (this.state.turn % 2 === 0 ) {
                debugger
            //   this.props.requestGuess({ roomId: this.props.room._id, chainId: this.state.fetchChainIds[this.state.turn-1] })
                
            // const guesses = Object.values(this.props.guesses)
            // const guess = guesses.filter(guess => guess.chainId == this.state.fetchChainIds[this.state.turn-1])
            axios.get(`/api/guesses/${this.props.room._id},${this.state.fetchChainIds[this.state.turn-1]}`)
            .then( 
                guess => {
                    console.log(guess)
                    document.getElementById('prompt-div').innerText = guess.data.word
                }
            )
        } 
        
    }


    render() {
        if (this.state.turn === this.props.room.size) {
            return(
                <div>YAAAAY YOU ARE DONE!!!! WHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</div>
            )
        }
        if (this.state.turn === 0) {
            return (
                <div id="draw-modal" className="game-modal">

                    <div className="game-container">
                        <button className="close-gameboard-button" onClick={this.props.closeModal}>Close</button>
                        <GameBoard draw={this.draw} handleSubmit={this.handleSubmit} userId={this.props.currentUser.id} roomId={this.props.room._id} createDrawing={this.props.createDrawing} chainId={this.state.chainIds[this.state.turn]} fetchChainId={this.state.fetchChainIds[this.state.turn]} />
                        {/* DRAW */}
                    </div>
                </div>
            )
        } else if (this.state.turn > 0) {
            return (
                (this.state.turn % 2 === 0 ?
                    <div className="game-modal">
                        <div className="game-container">
                            <button className="close-gameboard-button" onClick={this.props.closeModal}>Close</button>
                            <GameBoard draw={this.draw}  handleSubmit={this.handleSubmit} userId={this.props.currentUser.id} roomId={this.props.room._id} createDrawing={this.props.createDrawing} chainId={this.state.chainIds[this.state.turn]} fetchChainId={this.state.fetchChainIds[this.state.turn]} />
                            {/* DRAW */}
                        </div>
                    </div>
                    :
                    <div className="game-modal">
                        <div className="game-container">
                            <button className="close-gameboard-button" onClick={this.props.closeModal}>Close</button>
                            {/* GUESS */}
                            <GuessFormContainer handleSubmit={this.handleSubmit} roomId={this.props.room._id} userId={this.props.currentUser.id} chainId={this.state.chainIds[this.state.turn]} fetchChainId={this.state.fetchChainIds[this.state.turn-1]} />
                        </div>
                    </div>
                )
            )
        }
    }
}

export default Game

// Kyle Game Logic Potential?

// class Game {
//   constructor
//   super

//   // roomId
//   // state.entities.rooms[roomId] = roomobj
//   // roomObj = {
//     roomId:
//     size:
//     name:
//     players: [3, 2, 4, 1],
//   }

//   // create a room
//   // players: 1, 2, 3, 4
//   // players joined the room in this order: 3, 2, 4, 1
//   // this room has a players array that reads players: [3, 2, 4, 1]

//   //player 3
//   //this.chain = [3, 2, 4, 1];

//   //player 2
//   //player array from the roomobj in our state, and we're going to iterate through it
//   // and if the currentPLayerId !== the current element in the array, then we're going to shift that current element and push it back onto an array

//   //4 players

//   //this.chain = []

//   => [1, 2, 3, 4]
//   this.chain = [1, 2, 3, 4]

//   [1, 2, 3, 4]
//   [2, 3, 4, 1]

//   //player 3
//   [3, 4, 1, 2]

//   fetch the drawing:
//   with this roomId
//   and chain Id : chainObj[0]

//   post that drawing

//   assetUrl
//   chaindId: 2
//   user: 2
//   roomId: roomId

//   render ()

//   {}


// }

        // finds index of player in playerIds array and then adds 1 to compensate for idx 0
        // multiplies that by 10 and then adds 1
        // so the player's chain ids in a four player game should be as follows: 11, 21, 31, 41

        // after a turn occurs, we would want to mutate each player's chainId by adding 11
        // for the first player, their id would start at 11, indicating they are the 1st person in the 1st chain
        // after a turn, their id would become 22, indicating they are the 2nd person in the 2nd chain
        // after another turn, their id would become 33, indicating they are the 3rd person in the 3rd chain
        // for the final turn, their id would become 44, indicating they are the 4th person in the 4th chain

        // to account for players who are not the first element in the player's array:
        // i.e. the 4th player's 1st chainId would start at 41, but after a turn their 2nd chainId would become 52 when it should be 12.
        // to solve this, after we have mutated a chainId, we should check to see if the chain id is larger than the player's array length+1 * 10 (in this case 50).
        // if we mutate the chainId and it excedes this number, then we should conditionally subtract the player's array length * 10 (in this case 40), so their chainId would not excede this boundary and become 12 instead of 52.
        // with this logic, the 4th player begins as the 1st player in the 4th chain, but after a turn, they become the 2nd player in the 1st chain

        // for each player's chainId, if it is odd, then it is a draw round, while if it is even, then it is a guess round, letting our internal state change and dictate what modal each player gets
        // finally, after each turn, we should also set the turn state by adding 1; when the turn state equals the player's state length, the game is over.

        // on the backend, we now have drawings and guesses with the following chain Ids:
        // 11, 21, 31, 41, 12, 22, 32, 42, 13, 23, 33, 43, 14, 24, 34, 44
        // if you sort these drawings and guesses by chainId you get:
        // 11, 12, 13, 14 (first chain in order)
        // 21, 22, 23, 24 (second chain in order)
        // 31, 32, 33, 34 (third chain in order)
        // 41, 42, 43, 44 (fourth chain in order)



    /// [0,1,2,3]
    // 1
    // your index + turn % 4


    // turn(type) {
    //     if (type === 'DRAW') {

    //     }
    //     // get input
    //     // draw picture
    //     // pass to next person
    //     else {

    //     }
    //     // get drawing
    //     // make guess
    //     // pass to next person
    // }