import React from 'react';
import { connect } from 'react-redux';
import { requestGame } from "../../actions/games_actions";
import { withRouter } from 'react-router-dom';
import { sortedChains } from '../../reducers/selectors';

class GameOver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // componentDidMount() {
  //   debugger
  //   this.props.requestGame(this.props.roomId)
  //   debugger
  // }

  render() {
    console.log(this.props.game.chains.length)
    const size = this.props.room.size
    console.log(size)
    // if (!this.props.game.chains.length !== (size + (size * size))) return (<div>loading</div>)
    return (
      <div className='presentation-container'>
          {this.props.room.players.map(((player,idx) => {
            return(
              <div className='chain' key={idx}>
                <h2>{this.props.users[player].username}</h2>
                <ul>{
                  this.props.presentaionObj[player].map((chain,i) => {
                    return chain.includes("https://") ? <li key={i}><img src={chain} /></li> : <li key={i}>{chain}</li>
                  })
                }
                </ul>
              </div>
            ) 
          }))}
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  
  debugger
  return {
    // roomId: ownProps.roomId
    game: state.entities.games[ownProps.match.params.roomId],
    presentaionObj: sortedChains(state.entities.rooms[ownProps.match.params.roomId], state),
    users: state.entities.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGame: roomId => dispatch(requestGame(roomId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameOver));


