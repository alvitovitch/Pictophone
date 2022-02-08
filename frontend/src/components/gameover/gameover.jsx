import React from 'react';
import { connect } from 'react-redux';
import { requestGame } from "../../actions/games_actions";
import { withRouter } from 'react-router-dom';
import { sortedChains, sortedDemo } from '../../reducers/selectors';

class GameOver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    this.scrollLeft = this.scrollLeft.bind(this);
  }

  scrollLeft(e) {
    e.preventDefault();
    const idx = this.props.demo !== null ? ((parseInt(e.currentTarget.previousElementSibling.id) + 1) % 4) :
      ((parseInt(e.currentTarget.previousElementSibling.id) + 1) % this.props.room.players.length);
    const slides = document.querySelector('.presentation-container');
    const slide = document.getElementById(idx);
    slides.scrollTo((slide.offsetLeft - 200), 0);

  }

  render() {
    if (this.props.demo !== null) {
      const players = [this.props.currentUsername, "Ida", "Reginald", "Theodore"]
      return (
      <div className='presentation-container'>
          {players.map(((player,idx) => {
            return(
              <div className='chain-container'>
                <div className='chain' id={idx} key={idx}>
                  <h2>{player}</h2>
                  <ul>{
                    this.props.demo[player].map((chain, i) => {
                      return chain.includes("https://") ? <li key={i}><img src={chain} /></li> : <li key={i}>{chain}</li>
                    })
                  }
                  </ul>
                </div>
                  <p className={`arrow ${idx}`} onClick={this.scrollLeft}>&#9654;</p>
              </div>
              
            ) 
          }))}
      </div>
      )
    } else {
    return (
      <div className='presentation-container'>
          {this.props.room.players.map(((player,idx) => {
            return(
            <div className='chain-container'>
              <div className='chain' id={idx} key={idx}>
                <h2>{this.props.users[player].username}</h2>
                <ul className='photo-strip'>{
                  this.props.presentaionObj[player].map((chain,i) => {
                    return chain.includes("https://") ? <li key={i}><img src={chain} /></li> : <li key={i}>{chain}</li>
                  })
                }
                </ul>
            </div>
                <p className={`arrow ${idx}`} onClick={this.scrollLeft}>&#9654;</p>
              </div>
            ) 
          }))}
        
      </div>

    )
   }
  }
}

const mapStateToProps = (state, ownProps) => {
  
  return {
    game: state.entities.games[ownProps.match.params.roomId],
    presentaionObj: sortedChains(state.entities.rooms[ownProps.match.params.roomId], state),
    users: state.entities.users,
    currentUsername: state.session.user.username,
    demo: sortedDemo(state.session.user.username, state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestGame: roomId => dispatch(requestGame(roomId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameOver));


