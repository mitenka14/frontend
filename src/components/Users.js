import React from 'react';

import axios from 'axios';

export default class Users extends React.Component {
    state = {
        username: '',
        firstName: '',
        secondName: ''
    }
    componentWillMount(){
        axios.get('http://localhost:8080'+window.location.pathname, {headers:{Authorization: 'bearer '+localStorage.getItem('token')}})
        .then(res => {
            const username = res.data.username;
            const firstName = res.data.firstName;
            const secondName = res.data.secondName;
            this.setState({username, firstName, secondName});
          })
    }
    
    render(){
        return(
            <div>
                <div>{this.state.username}</div>
                <div>{this.state.firstName}</div>
                <div>{this.state.secondName}</div>
            </div>
        )
    }
}