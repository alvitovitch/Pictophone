import React from "react";

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
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
        <div className='signup-form-container'>
            <form
                className='signup-form'
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

export default SignupForm;