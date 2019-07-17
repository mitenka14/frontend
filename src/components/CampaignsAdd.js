import React from 'react';
import axios from 'axios';

export default class CampaignsAdd extends React.Component {
    state = {
        name: '',
        text: ''
    }
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:8080/addcampaign', this.state, {headers:{Authorization: 'bearer '+localStorage.getItem('token')}})
        .then((response) => {
            if (response.status == 200) {
               this.props.history.push('/list');
                
            } 
        })
    }

  

    render() {
        const {name, text} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="text" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}