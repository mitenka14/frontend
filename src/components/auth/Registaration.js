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
        axios.post('http://localhost:8080/auth/registration', this.state)
        .then((response) => {
            if (response.data.message === "000") {
                this.props.history.push('/auth/checkemail');
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
            <div>REGISTRATION FORM
                <form onSubmit={this.handleSubmit}>
                    <div>FirstName
                        <input type="text" name="firstName" value={firstName} onChange={this.handleChange}/>
                    </div>
                    <div>SecondName
                        <input type="text" name="secondName" value={secondName} onChange={this.handleChange}/>
                    </div>
                    <div>username
                        <input type="text" name="username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div>email
                        <input type="text" name="email" value={email} onChange={this.handleChange}/>
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