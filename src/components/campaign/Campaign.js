import React from 'react';

import axios from 'axios';

export default class Campaign extends React.Component {
    state = {
        id_user: '',
        name: '',
        text: '',
        username: '',
        imageUrl: ''
    }

    componentWillMount(){
        axios.get('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            const id_user = response.data.id_user;
            const name = response.data.name;
            const text = response.data.text;
            const username = response.data.username;
            if(localStorage.getItem('username') === username || localStorage.getItem('role') === '(admin)'){
                    this.delete = (
                    <div>
                        <a href={"http://localhost:3000/campaigns/campaign/"+window.location.pathname.split("/")[3]+"/delete"}>Delete campaign</a>
                    </div>
                    )
                }
            const imageUrl = response.data.imageUrl;
            this.setState({id_user, name, text, username, imageUrl});
          })
          
        
    }
    
    render(){
        return(
            <div>
                <div>Campaign's info</div>
                <div><a href={"/users/user/"+this.state.id_user}>{this.state.username}</a></div>
                <div><img  src={this.state.imageUrl}/></div>
                <div>{this.state.name}</div>
                <div>{this.state.text}</div>
                {this.delete}
                <div><a href={'http://localhost:3000/campaigns/campaign/'+window.location.pathname.split("/")[3]+'/comments/add'}>ADD COMMENT</a></div>
                <div><a href={'http://localhost:3000/campaigns/campaign/'+window.location.pathname.split("/")[3]+'/comments'}>COMMENTS</a></div>
            </div>
        )
    }
}    