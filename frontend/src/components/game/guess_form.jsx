import React from "react";
import img from '../../images/drawing.jpeg'

class GuessForm extends React.Component {

    render(){
        // {console.log(this.props)}
        debugger
        return <div className="guess-form">
            <div className="img-container">
                <img src={`https://pictophone-uploads.s3.amazonaws.com/drawing${this.props.roomId}11`} alt="" />
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