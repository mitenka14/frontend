import React from 'react';

import axios from 'axios';
import BonusesByUser from '../bonuses/BonusesByUser';

export default class Users extends React.Component {
    state = {
        id: '',
        username: '',
        firstName: '',
        secondName: ''
    }
    componentWillMount(){
        axios.get('http://localhost:8080/users/'+window.location.pathname.split('/')[3])
        .then(response => {
            const id = response.data.id;
            const username = response.data.username;
            const firstName = response.data.firstName;
            const secondName = response.data.secondName;
            if(localStorage.getItem('role') === '(admin)'){
                this.role = response.data.role
                if (response.data.role == 'ROLE_USER'){
                    if (response.data.blocked === true){
                        this.blockText = 'Unblock'
                    }
                    else{this.blockText = 'Block'}
                    this.adminAction = (
                    <div>
                        <div>
                            <form onSubmit={this.delete}>
                                <button type="delete" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={this.makeAdmin}>
                                <button type="makeAdmin" class="btn btn-info">Give admin role</button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={this.block}>
                                <button type="block" class="btn btn-dark">{this.blockText}</button>
                            </form>
                        </div>
                        <div>
                            <form action={'/users/edituser/'+window.location.pathname.split('/')[3]}>
                                <button type="edit" class="btn btn-warning">Edit</button>
                            </form>
                        </div>
                    </div>
                    )
                }
            }
                if (username == localStorage.getItem('username')){
                    this.userAction = (
                        <div>
                            <form action={'/users/edituser/'+window.location.pathname.split('/')[3]}>
                                <button type="edit" class="btn btn-warning">edit</button>
                            </form>
                        </div>
                    )
                }
            
            this.setState({id, username, firstName, secondName});
          })
        
    }

    delete(){
        axios.delete('http://localhost:8080/users/'+window.location.pathname.split('/')[3], {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status==200){
                    this.componentWillMount()
                }   
            })
    }

    block(){
        axios.get('http://localhost:8080/users/'+window.location.pathname.split('/')[3]+'/block', {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status==200){
                    this.componentWillMount()
                }   
            })
    }

    makeAdmin(){
        axios.get(`http://localhost:8080/users/`+window.location.pathname.split('/')[3]+'/makeadmin', {headers:{Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.status==200){
                this.componentWillMount()
            }  
        })
    }

    campaigns = event =>{
        this.props.history.push('/users/user/'+window.location.pathname.split('/')[3]+'/campaigns')
    }
    
    render(){
        return(
            <div class="container-fluid">
                <div class="row justify-content-center"><h1>{this.state.name}</h1></div>
                <div class="row">
                    <div class="col-4">
                    {this.adminAction}
                        {this.userAction}
                    </div>
                    <div class="col-6">
                        <div class="margin"><h3>Username: {this.state.username}</h3></div>
                        <div><p>First Name: {this.state.firstName}</p></div>
                        <div><p>Second Name: {this.state.secondName}</p></div>
                        </div>
                    <div class="col-2">
                        <h3>{this.role}</h3>
                        <BonusesByUser/>
                    </div>
                </div>
                <div class="row justify-content-center margin">
                        <form onSubmit={this.campaigns}>
                            <button type="campaigns" class="btn btn-primary">User's campaigns</button>
                        </form>
                    </div>
            </div>
            
        )
    }
}