import React from "react";


class Game extends React.Component {
    constructor(props) {    
        super(props)
        this.state = {
            turn: 1
        } 
    }


/// socket timeout when turn starts 30 to draw then 15sec to guess


    componentDidMount() {
    }


    /// [0,1,2,3]
        // 1    
        
        // your index + turn % 4


    turn(type) {
        if (type === 'DRAW') {

        }
        // get input
        // draw picture
        // pass to next person
        else {

        }
        // get drawing
        // make guess
        // pass to next person
    }



    render() {
        return (
        <div className="game-container">
            <button onClick={this.props.closeModal}>Close</button>

        </div>
        )
    }
}

export default Game