import React from 'react';

import axios from 'axios';

export default class EditUser extends React.Component {
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
                    this.delete = (
                    <div>
                        <div>
                            <a href={"http://localhost:3000/users/user/"+window.location.pathname.split("/")[3]+"/delete"}>Delete user</a>
                        </div>
                        <div>
                            <a href={"http://localhost:3000/users/user/"+window.location.pathname.split("/")[3]+"/makeadmin"}>Make admin</a>
                        </div>
                    </div>
                    )
                }
            }
            this.setState({id, username, firstName, secondName});
          })
        
    }
    
    render(){
        return(
            <div>
                <div>{this.delete}</div>
                <div>{this.state.username}</div>
                <div>{this.state.firstName}</div>
                <div>{this.state.secondName}</div>
                <div>{this.role}</div>
                <div><a href={'/users/user/'+window.location.pathname.split('/')[3]+'/campaigns'}>USERS CAMPAIGNS</a></div>
            </div>
        )
    }
}