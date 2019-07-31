import React from 'react';
import axios from 'axios';

export default class CampaignsAdd extends React.Component {
    state = {
        name: '',
        text: '',
        tagsString: '',
        imageUrl: ''
    }
    
    componentWillMount() {
        if (localStorage.getItem('token')==''){
            this.props.history.push('/auth/login')
        }
        this.state.imageUrl = localStorage.getItem('image')
        this.state.name = localStorage.getItem('name')
        this.state.tagsString = localStorage.getItem('tagsString')
        this.state.text = localStorage.getItem('text')
        
    }

    componentWillReceiveProps() {
        if (localStorage.getItem('token')==''){
            this.props.history.push('/auth/login')
        }
        this.state.imageUrl = localStorage.getItem('image')
        
        if (localStorage.getItem('image') != ''){
            this.image = (
                <img class="image" src={this.state.imageUrl}/>
            )
        } 
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
        localStorage.setItem('name', this.state.name)
        localStorage.setItem('text', this.state.text)
        localStorage.setItem('tagsString', this.state.tagsString)
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:8080/campaigns', this.state, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('image', '')
                    localStorage.setItem('name', '')
                    localStorage.setItem('text', '')
                    localStorage.setItem('tagsString', '')
                    this.props.history.push('/campaigns/list');   
                } 
                
                
            })
        
        
    }
    
    addImage= event =>{
        this.props.history.push("/campaigns/add/addimage")
    }
  

    render() {
        const {name, tagsString, text} = this.state
        return (
            <div class="container-fluid margin"> 
                
                <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col-10">
                <div>    <h1>Add campaign:</h1></div>
                    <div><div>Name</div>
                        <input type="text" class="form-control" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div><div>Tags</div>
                        <input type="text" class="form-control" name="tagsString" value={tagsString} onChange={this.handleChange}/>
                    </div>
                    <div class="margin"><div>Description</div>
                        <textarea type="text" class="form-control" rows="10" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <div class="margin">
                         {this.image}                   
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