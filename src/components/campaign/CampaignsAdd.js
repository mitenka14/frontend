import React from 'react';
import axios from 'axios';

export default class CampaignsAdd extends React.Component {
    state = {
        name: '',
        text: '',
        id_user: localStorage.getItem('id'),
        imageUrl: localStorage.getItem('image')
    }
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
            axios.post('http://localhost:8080/campaigns/new/addcampaign', this.state, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                localStorage.setItem('image', '')
                console.log(response)
                console.log(response)
                if (response.status == 200) {
                    this.props.history.push('/campaigns/list/all');   
                } 
                if (response.status == 401) {
                    this.props.history.push('/auth/login')
                }
                
            },(error) => { 
                
                console.log('ddf')
                console.log(error) })
            
        
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
                <div><a href="/campaigns/new/addcampaign/addimage">ADD IMAGE</a></div>
            </div>
        )
    }
}