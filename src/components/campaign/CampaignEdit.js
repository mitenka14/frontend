import React from 'react';

import axios from 'axios';

export default class CampaignEdit extends React.Component {
    state = {
        id: '',
        id_user: '',
        name: '',
        text: '',
        username: '',
        imageUrl: ''
    }

    componentWillMount(){
        localStorage.setItem('image', '')
        axios.get('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            const username = response.data.username;
            if(localStorage.getItem('username') !== username && localStorage.getItem('role') !== '(admin)'){
                    this.props.history.push('/campaigns/campaign/'+window.location.pathname.split("/")[3])
                }
            const id = response.data.id;
            const id_user = response.data.id_user;
            const name = response.data.name;
            const text = response.data.text;
            const imageUrl = response.data.imageUrl;
            this.setState({id, id_user, name, text, username, imageUrl});
          })
          
        
    }

    componentWillReceiveProps(){
        this.state.imageUrl = localStorage.getItem('image')
    }



    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split('/')[3], this.state, {headers:{Authorization: localStorage.getItem('token')}})
        .then((response) => {
            if (response.status == 200){
                this.props.history.push('/campaigns/campaign/'+window.location.pathname.split('/')[3])
            }
        })
    }

    changeImage= event =>{
        this.props.history.push('/campaigns/editcampaign/'+window.location.pathname.split('/')[3]+'/addimage')
    }

    cancel=event=>{
        this.props.history.push('/campaigns/campaign/'+window.location.pathname.split('/')[3])
    }
    
    render(){
        const {text, name, imageUrl} = this.state
        return (
            <div class="container-fluid"> 
                
                <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col-10">
                <div>    <h1>Edit campaign:</h1></div>
                    <div><div>Name</div>
                        <input type="text" class="form-control" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div><div>Description</div>
                        <input type="text" class="form-control" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <img  src={imageUrl}/>                    
                    </div>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-success btn-lg">Submit</button>
                    <form onSubmit={this.cancel}>
                        <button type="cancel" class="btn btn-warning">cancel</button>
                    </form>
                    </div>
                </div>
                </form>
                
                <form onSubmit={this.changeImage}>
                        <button type="changeImage" class="btn btn-outline-secondary">Change Image</button>
                    
                    </form>
                
            </div>
        )
    }
}