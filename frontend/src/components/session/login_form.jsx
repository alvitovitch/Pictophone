import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user);
    }

    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    render() {
        <div className='login-form-container'>
            <form 
                className='login-form'
                onSubmit={this.handleSubmit}
                >
                <div className='username-input-container'>
                    <input
                        type="text"
                        onChange={this.update(field)} />
                    <label>Username</label>
                </div>
                <div className='password-input-container'>
                    <input
                        type="password"
                        onChange={this.update(field)} />
                    <label>Password</label>
                </div>
                <button>Sign In</button>
            </form>

        </div>
    }
}

export default LoginForm;