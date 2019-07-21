import React from 'react';
import axios from 'axios';

export default class CommentAdd extends React.Component {
    state = {
        text: '',
        id_user: localStorage.getItem('id')
    }
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
            axios.post('http://localhost:8080'+window.location.pathname, this.state, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                   this.props.history.push(window.location.pathname.replace("/add",""));   
                } 
                if (response.status == 401) {
                    this.props.history.push('/auth/login')
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