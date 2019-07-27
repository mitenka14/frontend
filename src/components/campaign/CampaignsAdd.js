import React from 'react';
import axios from 'axios';

export default class CampaignsAdd extends React.Component {
    state = {
        name: '',
        text: '',
        imageUrl: ''
    }
    
    componentWillMount() {
        
        if (localStorage.getItem('token')==''){
            this.props.history.push('/auth/login')
        }
        localStorage.setItem('image', '')
    }

    componentWillReceiveProps() {
        if (localStorage.getItem('token')==''){
            this.props.history.push('/auth/login')
        }
        this.state.imageUrl = localStorage.getItem('image')
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
            axios.post('http://localhost:8080/campaigns/add', this.state, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('image', '')
                    this.props.history.push('/campaigns/list');   
                } 
                
                
            })
            
        
    }
    
    addImage= event =>{
        this.props.history.push("/campaigns/add/addimage")
    }
  

    render() {
        const {name, text} = this.state
        return (
            <div class="container-fluid"> 
                
                <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col-10">
                <div>    <h1>Add campaign:</h1></div>
                    <div><div>Name</div>
                        <input type="text" class="form-control" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div><div>Description</div>
                        <input type="text" class="form-control" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <img  src={this.state.imageUrl}/>                    
                    </div>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-success btn-lg">Submit</button>
                    
                    </div>
                </div>
                </form>
                
                <form onSubmit={this.addImage}>
                        <button type="addImage" class="btn btn-outline-secondary">Add Image</button>
                    
                    </form>
                
            </div>
            
        )
    }
}