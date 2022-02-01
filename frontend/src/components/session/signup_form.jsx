import React from "react";

class SignupForm extends React.Component {
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

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.signup(user);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    render() {

        return (
            <div className='signup-form-container'>
                <form
                    className='signup-form'
                    onSubmit={this.handleSubmit}
                >   <div className="signup-header">
                        <h2>SIGN UP FOR PICTOPHONE</h2>
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
                    <button className="navButton">Sign Up</button>
                </form>

            </div>
        )
      
    }
}

export default SignupForm;