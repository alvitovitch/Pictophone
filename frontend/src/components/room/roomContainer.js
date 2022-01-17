import { connect } from 'react-redux';
import Room from './room';
const mSTP = (state, ownProps) => {
    debugger
    return{
        // players: Object.values(state.entities.users)
        roomId: ownProps.match.params.roomId
    }
}

const mDTP = dispatch => {
    return{
        // create board
        // update board
    }
}


export default connect(mSTP, mDTP)(Room)