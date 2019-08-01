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
                localStorage.setItem('id', atob(response.data.token.split(".")[1]).split(",")[0].split(":")[1])
                if (response.data.userRole == 'ROLE_ADMIN') {
                    localStorage.setItem('role', '(admin)')
                }
                this.props.history.push("/users/user/"+localStorage.getItem('id'))
            }
            if (response.data.responseTextDto.message == '222'){
                this.props.history.push('/auth/userblocked')
            }
        })
    }
  

    render() {
        const {username, password} = this.state
        return (
            <div class="container-fluid">
                <div class="row justify-content-center">
                    
                <div class="col-3">
                    <div>    <h1> LOGIN FORM</h1></div>

                <form onSubmit={this.handleSubmit}>
                    <div><div>Username</div>
                        <input type="text" class="form-control" name="username" value={username} placeholder="Enter username" onChange={this.handleChange}/>
                    </div>
                    <div><div>Password</div>
                        <input type="password" class="form-control" name="password" value={password} placeholder="Password" onChange={this.handleChange}/>
                    </div>
                    {this.message}
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <div><p>New to KEKstarter? <a href="/users/registration">Sign up</a></p></div>
                </form>
                </div>
                </div>
            </div>
        )
    }
}