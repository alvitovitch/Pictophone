import React from "react";

class RoomForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.room
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.formAction(this.state)
            .then(() => {
                if(this.props.errors.length === 0){
                    this.props.closeModal()
                }
            }
        )
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.name !== this.state.name){
            if (this.props.errors.length !== 0)this.props.clearErrors()
        }
    }
            
    componentWillUnmount(){
        this.props.clearErrors()
    }

    render(){
        const { errors } = this.props
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
                        defaultValue={4}
                        onChange={e=>this.setState({size: e.currentTarget.value})}>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
                {errors.name ? <p>{errors.name}</p> : ""}
            </div>
        )
    }
}

export default RoomForm;