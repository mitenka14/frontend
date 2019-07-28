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

            if (response.status == 200){
                this.props.history.push("/users/user/"+window.location.pathname.split('/')[3])
            }
           
        })
    }

    cancel = event =>{
        this.props.history.push("/users/user/"+window.location.pathname.split('/')[3])
    }
    
    render(){
        const {firstName, secondName, username, email, password, newPassword} = this.state
        return (
            <div class="container-fluid">
                <div class="row justify-content-center">
                    
                <div class="col-4">
                    <div>    <h1>Edit user</h1></div>
                <form onSubmit={this.handleSubmit}>
                    <div><div>First Name</div>
                        <input type="text" class="form-control" name="firstName" value={firstName} onChange={this.handleChange}/>
                    </div>
                    <div><div>Second Name</div>
                        <input type="text" class="form-control" name="secondName" value={secondName} onChange={this.handleChange}/>
                    </div>
                    <div><div>Username</div>
                        <input type="text" class="form-control" name="username" value={username} onChange={this.handleChange}/>
                    </div>
                    <div><div>Email</div>
                        <input type="text" class="form-control" name="email" value={email} onChange={this.handleChange}/>
                    </div>
                    <div><div>Password (to confirm)</div>
                        <input type="password" class="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                    </div>
                    <div><div>New Password (if you don't want to change, leave empty)</div>
                        <input type="password" class="form-control" name="newPassword" placeholder="New password" value={newPassword} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" class="btn btn-success btn-lg">Submit</button>
                </form>
                <form onSubmit={this.cancel}>
                        <button type="cancel" class="btn btn-warning">Cancel</button>
                    </form>
            </div>
            </div>
            </div>
        )
    }
}