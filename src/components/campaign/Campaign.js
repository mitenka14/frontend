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
                        <form onSubmit={this.delete}>
                            <button type="delete" class="btn btn-danger">delete</button>
                        </form>
                    </div>
                    )
                    this.edit = (
                        <div>
                        <form action={'/campaigns/editcampaign/'+window.location.pathname.split('/')[3]}>
                            <button type="edit" class="btn btn-warning">edit</button>
                        </form>
                    </div>
                    )
                }
            const imageUrl = response.data.imageUrl;
            this.setState({id_user, name, text, username, imageUrl});
          })
          
        
    }

    componentWillReceiveProps(){
        axios.get('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            const id_user = response.data.id_user;
            const name = response.data.name;
            const text = response.data.text;
            const username = response.data.username;
            if(localStorage.getItem('username') === username || localStorage.getItem('role') === '(admin)'){
                    this.delete = (
                    <div>
                        <form onSubmit={this.delete}>
                            <button type="delete" class="btn btn-danger">delete</button>
                        </form>
                    </div>
                    )
                    this.edit = (
                        <div>
                        <form action={'/campaigns/editcampaign/'+window.location.pathname.split('/')[3]}>
                            <button type="edit" class="btn btn-warning">edit</button>
                        </form>
                    </div>
                    )
                }
            const imageUrl = response.data.imageUrl;
            this.setState({id_user, name, text, username, imageUrl});
          })
          
        
    }

   

    delete = event => {
        event.preventDefault();
        axios.delete('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split('/')[3], {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status){
                    this.props.history.push('/campaigns/list');   
                }
            })
    }


    comments = event =>{
        this.props.history.push('/campaigns/campaign/'+window.location.pathname.split("/")[3]+'/comments')
    }
    
    render(){
        return(
            <div class="container-fluid">
                <div class="row justify-content-center"><h1>{this.state.name}</h1></div>
                <div class="row">
                    <div class="col-2">
                        <img  src={this.state.imageUrl}/>

                    </div>
                    <div class="col-8"><h3>Description:</h3>{this.state.text}</div>
                    <div class="col-2">
                        <h3>Creator: <a href={"/users/user/"+this.state.id_user}>{this.state.username}</a></h3>
                        {this.delete}
                        {this.edit}
                    </div>
                </div>
                <div class="row justify-content-center">
                        <form onSubmit={this.comments}>
                            <button type="comments" class="btn btn-primary">Comments</button>
                        </form>
                    </div>
                
                
                

            </div>
        )
    }
}    