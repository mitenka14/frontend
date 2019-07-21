import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
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
                var i = response.data.token.split(".")
                var a = atob(i[1])
                var b = a.split(",")
                var c = b[0].split(":")
                localStorage.setItem('id', c[1])
                this.props.history.push('/campaigns/list')
            }
        })
    }

  

    render() {
        const {username, password} = this.state
        return (
            <div>LOGIN FORM
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="text" name="password" value={password} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}