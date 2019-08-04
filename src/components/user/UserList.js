import React from 'react';

import axios from 'axios';

export default class UserList extends React.Component {
  state = {
    users: []
  }

  componentWillMount() {
    if(localStorage.getItem('role') !== '(admin)'){
      this.props.history.push("/")
    }
    axios.get(`http://localhost:8080/users/admin/userlist`, {headers:{Authorization: localStorage.getItem('token')}})
      .then(response => {
        const users = response.data;
        this.setState({ users });
        console.log(response)
      })
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="margin30"></div>
        <div class="row justify-content-center margin30"><h1>All Users</h1></div>
        <div class="row">
          
        </div>
        <ul class="list-group">
          { this.state.users.slice(0).reverse().map(user => 
            <div class="margin30"><li class="list-group-item  list-group-item-info">
              <div class="row">
              <div class="col-10">
                <div><h3><a href={"/users/user/"+user.id}>{user.username} id:{user.id}</a></h3></div>
                <div>First Name {user.firstName}</div>
                <div>secondName {user.secondName}</div>
                </div>
              <div class="col-2"><h3>{user.role}</h3></div>
              </div>
            </li>
            </div>
          )}
        </ul>
      </div>
      
    )
  }
}