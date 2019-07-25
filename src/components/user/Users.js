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
        axios.get('http://localhost:8080/users/'+window.location.pathname.split('/')[2])
        .then(res => {
            const id = res.data.id;
            const username = res.data.username;
            const firstName = res.data.firstName;
            const secondName = res.data.secondName;
            this.setState({id, username, firstName, secondName});
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