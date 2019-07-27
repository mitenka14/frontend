import React from 'react';

import axios from 'axios';

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
                    this.adminAction = (
                    <div>
                        <div>
                            <form onSubmit={this.delete}>
                                <button type="delete">delete</button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={this.makeAdmin}>
                                <button type="makeAdmin">Make admin</button>
                            </form>
                        </div>
                        <div>
                            <form action={'/users/user/'+window.location.pathname.split('/')[3]+'/edit'}>
                                <button type="edit">edit</button>
                            </form>
                        </div>
                    </div>
                    )
                }
                if (username == localStorage.getItem('username')){
                    this.userAction = (
                        <div>
                            <form action={'/users/user/'+window.location.pathname.split('/')[3]+'/edit'}>
                                <button type="edit">edit</button>
                            </form>
                        </div>
                    )
                }
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

    makeAdmin(){
        axios.get(`http://localhost:8080/users/`+window.location.pathname.split('/')[3]+'/makeadmin', {headers:{Authorization: localStorage.getItem('token')}})
        .then(response => {
            if (response.status==200){
                this.componentWillMount()
            }  
        })
    }
    
    render(){
        return(
            <div>
                <div>{this.adminAction}</div>
                <div>{this.userAction}</div>
                <div>{this.state.username}</div>
                <div>{this.state.firstName}</div>
                <div>{this.state.secondName}</div>
                <div>{this.role}</div>
                <div><a href={'/users/user/'+window.location.pathname.split('/')[3]+'/campaigns'}>USERS CAMPAIGNS</a></div>
            </div>
        )
    }
}