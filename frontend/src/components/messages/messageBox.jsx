import React from "react";
import { io } from "socket.io-client";

class MessageBox extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }
        this.socket = io('http://localhost:5000')
        this.handleSubmit = this.handleSubmit.bind(this)
        this.socket.on('receive-message', message => {
            console.log(message)
            this.createMessage(message)
            debugger
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const message = this.state.message
        const user = this.props.user.username
        const messageDiv = document.createElement('div')
        messageDiv.innerText = `${user}: ${message}`
        document.getElementById('chatMessages').appendChild(messageDiv)
        console.log(messageDiv)
        this.socket.emit('send-message', {user, message})
        this.setState({message: ''})
    }
    
    createMessage(message) {
        debugger
        const text = message.message
        debugger
        const user = message.user
        debugger
        const newMessage = document.createElement('div')
        debugger
        newMessage.innerText = `${user}: ${text}`
        debugger
        document.getElementById('chatMessages').appendChild(newMessage)
        debugger

    }

    handleUpdate(field) {
        return e => this.setState({[field]: e.currentTarget.value })
    }

    render (){
        
        return (
            
                <div>
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