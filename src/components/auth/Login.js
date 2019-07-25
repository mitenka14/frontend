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
            if (response.data.token != null){
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.username)
                if (response.data.userRole == 'ROLE_ADMIN') {
                    localStorage.setItem('role', '(admin)')
                }
                console.log(localStorage.getItem('role'))
                this.props.history.push('/')
            }
            if (response.data.responseTextDto.message == '222'){
                this.props.history.push('/auth/userblocked')
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
                    {this.message}
                    <button type="submit">Submit</button>
                </form>
                <dialog>jjj</dialog>
            </div>
        )
    }
}