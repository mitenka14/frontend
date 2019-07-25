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

  

    render() {
        const {name, text} = this.state
        return (
            <div> ADD CAMPAIGN
                <form onSubmit={this.handleSubmit}>
                    <div>name
                        <input type="text" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div>description
                        <input type="text" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <img  src={this.state.imageUrl}/>
                <div><a href="/campaigns/add/addimage">CHOSE IMAGE</a></div>
            </div>
        )
    }
}