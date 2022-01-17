import React from "react";
import DrawingBoard from "../board/drawing_board";

class Room extends React.Component {

    render() {
        return (
            <div id='Room'>
                <div id='freeDrawSpace'>
                    <DrawingBoard/>
                </div>
                <div id='roomChat'>
                    Chat bar
                </div>
            </div>
        )
    }
}

export default Room