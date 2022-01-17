import { connect } from 'react-redux';
import Room from './room';
const mSTP = state => {
    return{
        // players: Object.values(state.entities.users)
    }
}

const mDTP = dispatch => {
    return{
        // create board
        // update board
    }
}


export default connect(mSTP, mDTP)(Room)