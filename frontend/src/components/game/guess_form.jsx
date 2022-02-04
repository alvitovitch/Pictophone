import React from "react";
import { socket } from '../../util/socket_util';

class GuessForm extends React.Component {
    constructor(props) {
        super(props)
        // this.submit = this.submit.bind(this)
        this.state = {
            guess: "",
        }
        this.socket = socket
        this.submitGuess = this.submitGuess.bind(this)
        this.updateGuess = this.updateGuess.bind(this);
        this.awooga = new Audio('./audio/awooga.mp3')

    }

    async submitGuess(e) {
        e.preventDefault()

        if (this.state.guess.length > 0) {
            if (this.props.demoBoard) {
                this.props.acceptInput(this.state.guess);
            } else {
                let guess = {}; 
                guess['word'] = this.state.guess;
                guess['roomId'] = this.props.roomId;
                guess['userId'] = this.props.userId;
                guess['chainId'] = this.props.chainId;
                await this.props.createGuess(guess)
                .catch(error => console.log(error))
                // Guesses are patched to backend game with respective players
                // chain IDs
                let chain = {};
                chain[this.props.chainId] = this.state.guess;

                this.props.updateGame({ roomId: this.props.roomId, chainObj: chain })
                    
                this.socket.emit('submit-chain', this.props.roomId)
                this.props.handleSubmit()
                let button = document.getElementById('submit-one')
                button.style.display = 'none' 
                button.style.pointerEvents = 'none'
            }
        } else {
            const errors = document.getElementById('guess-errors')
             errors.style.background = 'rgba(255, 0, 0, .9)'
             errors.style.color = 'rgba(255, 255, 255, 1)'
             this.awooga.play()
            
             setTimeout(() => {errors.style.background = 'rgba(255, 0, 0, 0)';
                errors.style.color = 'rgba(255, 255, 255, 0)';
            }, 3000)
        }
    }

    updateGuess(e) {
        this.setState({ guess: e.currentTarget.value });
    }

    render(){
        return( <div className="guess-form">
            <div id='guess-errors'>
                You need to type something before submitting
            </div>
            <div className="img-container">
                <img src={this.props.demoBoard ? this.props.url : `https://pictophone-uploads.s3.amazonaws.com/drawing${this.props.roomId}${this.props.fetchChainId}`} alt="" />
            </div>
            <form onSubmit={this.submitGuess}>
                <input type="text" 
                placeholder='guess?'
                value={this.state.guess} 
                onChange={this.updateGuess}/>
                <input id='submit-one' type="submit" value="submit"/>
            </form>
        </div>
        )
    }
}

export default GuessForm;