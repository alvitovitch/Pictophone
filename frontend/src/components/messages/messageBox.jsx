import React from "react";
import { socket } from "../../util/socket_util";

class MessageBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
       
        this.socket = socket;
        this.socket.on('receive-message', message => {
            this.createMessage(message)
        })
        this.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
    }

    handleSubmit(e) {
        e.preventDefault()
        const message = this.state.message
        const user = this.props.user.username
        const messageDiv = document.createElement('div')
        messageDiv.innerText = `${user}: ${message}`
        document.getElementById('chatMessages').appendChild(messageDiv)
        

        this.socket.emit('send-message', {user, message}, this.props.roomId)
        this.setState({message: ''})
    }
    
    createMessage(message) {
        const text = message.message
        const user = message.user
        const newMessage = document.createElement('div')
        
        newMessage.innerText = `${user}: ${text}`
        
        document.getElementById('chatMessages').appendChild(newMessage)
        

    }

    handleUpdate(field) {
        return e => this.setState({[field]: e.currentTarget.value })
    }

    render (){
        
        return (
            
                <div id='roomChat'>
                    <div id='chatMessages'>

                    </div>
                    <form className='chat-form' onSubmit={this.handleSubmit}>
                        <input onChange={this.handleUpdate('message')} type="text" id='textBox' value={this.state.message}/>
                        <button>
                            Send
                        </button>
                    </form>
                </div>
            
        )
    }
}


export default MessageBox