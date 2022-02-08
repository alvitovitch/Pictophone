import React from "react";
import { connect } from 'react-redux';
import GameBoard from "../board/game_board";
import GuessFormContainer from "../game/guess_form_container";
import { receiveDemo } from "../../actions/demo_actions";

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turn: 0, // 1
      index: 1, // 7
      key: 11, // 22
      promptIndexes: [10, 21, 32, 43], // 10, 21, 32, 43
      demoGame: [
        {10: "mammoth"}, // 0
        {11: null}, // 1
        {12: "mammoth"},
        {13: "https://pictophone-uploads.s3.amazonaws.com/drawing208169"},   //mammoth image
        {14: "mammoth"},
        {20: "bagel"},
        {21: "https://pictophone-uploads.s3.amazonaws.com/drawing888245"}, //bagel image
        {22: null}, // 7
        {23: "https://pictophone-uploads.s3.amazonaws.com/drawing584805"}, //bagel image
        {24: "bagel"},
        {30: "lobster"},
        {31: "https://pictophone-uploads.s3.amazonaws.com/drawing837695"},   //lobster image
        {32: "lobster"},
        {33: null}, // 13
        {34: "lobster"},
        {40: "popcorn"},
        {41: "https://pictophone-uploads.s3.amazonaws.com/drawing993332"},  //popcorn image
        {42: "popcorn"},
        {43: "https://pictophone-uploads.s3.amazonaws.com/drawing599606"},  //popcorn image
        {44: null}, // 19
    ],
    
    };
    this.acceptInput = this.acceptInput.bind(this);
    this.ring = new Audio('audio/ring.mp3')
    this.ring.volume = .4
    this.applause = new Audio('audio/applause.mp3')
    this.jolly = new Audio('audio/jolly-good-show.mp3')
    this.jolly.volume = .6
  }

  componentDidMount() {
    this.volume = document.getElementById("sound-control");
        this.volume.addEventListener("change", ()=> {
            this.ring.volume = (this.volume.value / 100)*.4;
            this.applause.volume = this.volume.value / 100;
            this.jolly.volume = (this.volume.value / 100)*.6;
        })
  }

  acceptInput(string) {
    const arr = this.state.demoGame
    arr[this.state.index][this.state.key] = string
    this.setState({ demoGame: arr });
    this.setState({ index: this.state.index + 6 });
    this.setState({ key: this.state.key + 11 });
    this.setState({ turn: this.state.turn + 1 });
  }
  

  render() {
    if (this.state.turn === 4) {
      this.props.handleDemoGameOver(this.state.demoGame);
      this.applause.play()
      this.jolly.play()
      return null
    } else if (this.state.turn % 2 === 0 && this.state.turn < 4) {
      this.ring.currentTime = 0
      this.ring.play()
      return (
        <div id="draw-modal" className="game-modal">

          <div className="game-container">
            <GameBoard  demoBoard={true} acceptInput={this.acceptInput} />
            {/* DRAW */}
          </div>
          {<div id='prompt-div'>{this.state.demoGame[this.state.index-1][this.state.promptIndexes[this.state.turn]]}</div>}
        </div>
      )
    } else if (this.state.turn % 2 !== 0 && this.state.turn <4) {
      this.ring.currentTime = 0
      this.ring.play()
      return (
        <div className="game-modal">
          <div className="game-container">

            {/* GUESS */}
            <GuessFormContainer demoBoard={true} acceptInput={this.acceptInput} url={ this.state.demoGame[this.state.index - 1][this.state.promptIndexes[this.state.turn]] }/>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveDemo: demo => dispatch(receiveDemo(demo)),
  }
}

export default connect(null, mapDispatchToProps)(Demo);