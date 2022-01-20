import React from "react";
import img from '../../images/drawing.jpeg'

class GuessForm extends React.Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault()
        this.props.handleSubmit()

    }

    render(){
        // {console.log(this.props)}
        return <div className="guess-form">
            <div className="img-container">
                <img src={`https://pictophone-uploads.s3.amazonaws.com/drawing${this.props.roomId}${this.props.chainId}`} alt="" />
            </div>
            <form>
                <h2>Your Guess:</h2>
                <input type="text" />
                <input onClick={this.submit} type="submit" value="submit" />
            </form>
        </div>
    }
}

export default GuessForm;