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
        {12: "test"},
        {13: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
        {14: "test"},
        {20: "test"},
        {21: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"}, // 6
        {22: null}, // 7
        {23: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
        {24: "test"},
        {30: "test"},
        {31: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
        {32: "test"},
        {33: null}, // 13
        {34: "test"},
        {40: "test"},
        {41: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
        {42: "test"},
        {43: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
        {44: null}, // 19
    ],

    };
    this.acceptInput = this.acceptInput.bind(this);
  }

  acceptInput(string) {
    const arr = this.state.demoGame
    arr[this.state.index][this.state.key] = string
    this.setState({ demoGame: arr });
    this.setState({ index: this.state.index + 6 });
    this.setState({ key: this.state.key + 11 });
    this.setState({ turn: this.state.turn + 1 });
    // might consolidate these
  }

  render() {
    if (this.state.turn === 4) {
      this.props.handleDemoGameOver(this.state.demoGame);
      return null
    } else if (this.state.turn % 2 === 0 && this.state.turn < 4) {
      return (
        <div id="draw-modal" className="game-modal">

          <div className="game-container">
            {/* <button className="close-gameboard-button" onClick={this.props.closeModal}>Close</button> */}

            <GameBoard  demoBoard={true} acceptInput={this.acceptInput} />
            {/* DRAW */}
          </div>
          {<div>{this.state.demoGame[this.state.index-1][this.state.promptIndexes[this.state.turn]]}</div>}
        </div>
      )
    } else if (this.state.turn % 2 !== 0 && this.state.turn <4) {
      return (
        <div className="game-modal">
          <div className="game-container">

            {/* <button className="close-gameboard-button" onClick={this.props.closeModal}>Close</button> */}
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