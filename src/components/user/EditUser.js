import React from 'react';

import axios from 'axios';

export default class EditUser extends React.Component {
    state = {
        id: '',
        username: '',
        firstName: '',
        secondName: '',
        email: '',
        newPassword: ''
    }
    componentWillMount(){
        axios.get('http://localhost:8080/users/'+window.location.pathname.split('/')[3])
        .then(response => {
            console.log(response.data)
            const id = response.data.id;
            const username = response.data.username;
            const firstName = response.data.firstName;
            const secondName = response.data.secondName;
            const email = response.data.email;
            const newPassword = response.data.newPassword;
            this.setState({id, username, firstName, secondName, email, newPassword});
          })
        
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/users/'+window.location.pathname.split('/')[3], this.state, {headers:{Authorization: localStorage.getItem('token')}})
        .then((response) => {

            console.log(response)
           
        })
    }

    cancel = event =>{
        this.props.history.push("/users/user/"+window.location.pathname.split('/')[3])
    }
    
    render(){
        const {firstName, secondName, username, email, password, newPassword} = this.state
        return (
            <div>
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
                    <div>password(to confirm)
                        <input type="password" name="password" value={password} onChange={this.handleChange}/>
                    </div>
                    <div>newPassword(if you don't want to change, leave empty)
                        <input type="password" name="newPassword" value={newPassword} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <form onSubmit={this.cancel}>
                        <button type="cancel">cancel</button>
                    </form>
            </div>
        )
    }
}