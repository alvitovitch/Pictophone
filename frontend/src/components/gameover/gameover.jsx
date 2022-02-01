import React from 'react';
import { connect } from 'react-redux';
import { requestGame } from "../../actions/games_actions";

class GameOver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    debugger
    this.props.requestGame(this.props.roomId);
  }

  render() {
    return (
      <div>Game Over</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    roomId: ownProps.match.params.roomId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGame: roomId => dispatch(requestGame(roomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);