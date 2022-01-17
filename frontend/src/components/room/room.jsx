import React from "react";
import MessageBoxContainer from "../messages/messageBoxContainer";
class Room extends React.Component {
    constructor(props){
        super(props)
        
    }

    render() {
        return (
            <div id='Room'>
                <div id='freeDrawSpace'>
                    Free Draw
                </div>
                <div id='roomChat'>
                    <MessageBoxContainer socket={this.socket} />
                </div>
            </div>
        )
    }
}

export default Room