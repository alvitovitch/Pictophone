import React from "react";
import img from '../../images/drawing.jpeg'

class GuessForm extends React.Component {

    render(){
        // {console.log(this.props)}
        return <div className="guess-form">
            <div className="img-container">
                <img src={img}/>
            </div>
            <form>
                <h2>Your Guess:</h2>
                <input type="text" />
                <input type="submit" value="submit" />
            </form>
        </div>
    }
}

export default GuessForm;