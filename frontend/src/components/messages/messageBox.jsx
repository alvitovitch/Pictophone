import React from "react";
import { io } from "socket.io-client";

class MessageBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.props.socket.on('receive-message', message => {
            console.log(message)
            console.log(this.props.socket)
            this.createMessage(message)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const message = this.state.message
        const user = this.props.user.username
        const messageDiv = document.createElement('div')
        messageDiv.innerText = `${user}: ${message}`
        document.getElementById('chatMessages').appendChild(messageDiv)
        

        this.props.socket.emit('send-message', {user, message}, this.props.roomId)
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
                    <form onSubmit={this.handleSubmit}>
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