import React from 'react';

import axios from 'axios';

export default class Campaign extends React.Component {
    state = {
        id_user: '',
        name: '',
        text: '',
        username: ''
    }

    componentWillMount(){
        axios.get('http://localhost:8080'+window.location.pathname)
        .then(response => {
            const id_user = response.data.id_user;
            const name = response.data.name;
            const text = response.data.text;
            const username = response.data.username;
            this.setState({id_user, name, text, username});
          })
    }
    
    render(){
        return(
            <div>
                <div>Campaign's info</div>
                <div><a href={"/users/"+this.state.id_user}>{this.state.username}</a></div>
                <div>{this.state.name}</div>
                <div>{this.state.text}</div>
                <div><a href={window.location.pathname.split("/comments", 1)+'/comments/add'}>ADD COMMENT</a></div>
                <div><a href={window.location.pathname.split("/comments", 1)+'/comments'}>COMMENT LIST</a></div>
            </div>
        )
    }
}    