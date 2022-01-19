import React from "react";

class RoomForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.room
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.formAction(this.state)
            .then(() => this.props.closeModal())
            
    }

    render(){
        return(
            <div className="create-room-form">
                <h2>CREATE A ROOM</h2>
                <form onSubmit={this.handleSubmit}>
                    <h3>Room name: </h3>
                    <input 
                        type="text"
                        value={this.state.name}
                        onChange={e=>this.setState({name: e.currentTarget.value})}/>
                    <h3>Room Size: </h3>
                    <select
                        onChange={e=>this.setState({size: e.currentTarget.value})}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default RoomForm;