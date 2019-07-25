import React from 'react';

import axios from 'axios';

export default class UserList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/users/admin/userlist`, {headers:{Authorization: localStorage.getItem('token')}})
      .then(response => {
        const users = response.data;
        this.setState({ users });
        console.log(response)
      })
  }

  render() {
    return (
      <div>
           USERS LIST
        <ul>
          { this.state.users.map(user => 
            <li>
              <div><a href={'/users/user/'+user.id}>id {user.id}</a></div>
              <div>username {user.username}</div>
              <div>firstName {user.firstName}</div>
              <div>secondName {user.secondName}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}