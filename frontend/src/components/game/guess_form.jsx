import React from "react";
import img from '../../images/drawing.jpeg'
import { socket } from '../../util/socket_util';

class GuessForm extends React.Component {
    constructor(props) {
        debugger
        super(props)
        // this.submit = this.submit.bind(this)
        this.state = {
            guess: "",
        }
        this.socket = socket
        this.submitGuess = this.submitGuess.bind(this)
        this.updateGuess = this.updateGuess.bind(this);
    }

    // submit(e) {
    //     e.preventDefault()
    //     this.props.handleSubmit()
    // }

    async submitGuess(e) {
        e.preventDefault()
        let guess = {};
        guess['word'] = this.state.guess;
        guess['roomId'] = this.props.roomId;
        guess['userId'] = this.props.userId;
        guess['chainId'] = this.props.chainId;
        await this.props.createGuess(guess)
            
        this.socket.emit('submit-chain', this.props.roomId)
        this.props.handleSubmit()
    }

    updateGuess(e) {
        this.setState({ guess: e.currentTarget.value });
    }

    render(){
        // {console.log(this.props)}
        return( <div className="guess-form">
            <div className="img-container">
                <img src={`https://pictophone-uploads.s3.amazonaws.com/drawing${this.props.roomId}${this.props.fetchChainId}`} alt="" />
            </div>
            <form onSubmit={this.submitGuess}>
                <h2>Your Guess:</h2>
                <input type="text" value={this.state.guess} onChange={this.updateGuess}/>
                <input type="submit" value="submit" />
            </form>
        </div>
        )
    }
}

export default GuessForm;