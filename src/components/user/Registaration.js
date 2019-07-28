import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
    state = {
        firstName: '',
        secondName: '',
        username: '',
        email: '',
        password: '',
        message: '',
    }
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(window.location.pathname);
        axios.post('http://localhost:8080/users/registration', this.state)
        .then((response) => {
            if (response.data.message === "000") {
                this.props.history.push('/users/checkemail');
            }
            else{
                this.message = response.data.message;
                console.log(this.message)
            }
        })
    }

  

    render() {
        const {firstName, secondName, username, email, password} = this.state
        return (
            <div class="container-fluid">
                <div class="row justify-content-center">
                    
                <div class="col-4">
                    <div>    <h1>Registration form</h1></div>
                <form onSubmit={this.handleSubmit}>
                    <div><div>First Name</div>
                        <input type="text" class="form-control" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange}/>
                    </div>
                    <div><div>Second Name</div>
                        <input type="text" class="form-control" name="secondName" placeholder="Second Name" value={secondName} onChange={this.handleChange}/>
                    </div>
                    <div><div>Username</div>
                        <input type="text" class="form-control" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div><div>Email</div>
                        <input type="text" class="form-control" name="email" placeholder="Email" value={email} onChange={this.handleChange}/>
                    </div>
                    <div><div>Password</div>
                        <input type="password" class="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                    </div>
                    
                    <button type="submit" class="btn btn-success btn-lg">Submit</button>
                </form>
                
            </div>
            </div>
            </div>
        )
    }
}