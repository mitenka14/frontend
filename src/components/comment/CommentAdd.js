import React from 'react';
import axios from 'axios';

export default class CommentAdd extends React.Component {
    state = {
        text: ''
    }
    
    componentWillMount(){
        if (localStorage.getItem('token') === ''){
            this.props.history.push('/auth/login')
        }
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
            axios.post('http://localhost:8080/comments/'+window.location.pathname.split('/')[3], this.state, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                   this.props.history.push('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split('/')[3]+'/comments');   
                } 
                                
            })
            
        
    }

  

    render() {
        const {text} = this.state
        return (
            <div> ADD COMMENT
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}