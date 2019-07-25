import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
        url: ''
    }
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/auth/login', this.state)
        .then((response) => {
            if (response.status == 200){
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', this.state.username)
                this.props.history.push('/')
            }
        })
    }

  

    render() {
        const {username, password} = this.state
        return (
            <div>LOGIN FORM
                <form onSubmit={this.handleSubmit}>
                    <div>username
                        <input type="text" name="username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div>password
                        <input type="password" name="password" value={password} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}