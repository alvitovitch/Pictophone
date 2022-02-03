import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user);
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleDemoUser = e => {
        e.preventDefault();
        const demoUser = { 
            username: `DemoUser${Math.floor(Math.random() * 1000000000)}`, 
            password: "hunter12"}
        this.props.signup(demoUser);
    }

    render() {

        return(
            <div className='login-form-container'>
                <form
                    className='login-form'
                    onSubmit={this.handleSubmit}
                >   <div className="login-header">
                        <h2>login</h2>
                    </div>
                    <div className='username-input-container'>
                        <input
                            type="text"
                            onChange={this.update('username')} placeholder="Username"/>
                    </div>
                    {this.props.errors.username ? 
                        <p className="session-error">{this.props.errors.username}</p> : ""}
                    <div className='password-input-container'>
                        <input
                            type="password"
                            onChange={this.update('password')} placeholder="Password"/>
                    </div>
                    {this.props.errors.password ? 
                        <p className="session-error">{this.props.errors.password}</p> : ""}
                    {this.props.errors.handle ? 
                        <p className="session-error">{this.props.errors.handle}</p> : ""}
                    <div className="login-buttons">
                        <button className="navButton">sign in</button>
                        <button className="navButton" onClick={this.handleDemoUser}>demo user</button>
                    </div>
                </form>

            </div>
        )
     
    }
}

export default LoginForm;