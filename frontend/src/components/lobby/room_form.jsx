import React from "react";

class RoomForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.room
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.formAction(this.state)
    }

    render(){
        return(
            <div>
                <h2>Create a room</h2>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        value={this.state.name}
                        placeholder="Room name"
                        onChange={e=>this.setState({name: e.currentTarget.value})}/>
                    <select
                        onChange={e=>this.setState({size: e.currentTarget.value})}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                    </select>
                    <input type="submit" value="Create a room" />
                </form>
            </div>
        )
    }
}

export default RoomForm;