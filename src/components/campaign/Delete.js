import React from 'react';
import axios from 'axios';

export default class CommentAdd extends React.Component {
    
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
            axios.get('http://localhost:8080'+window.location.pathname, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                console.log(response)
                // if (response.status == 200) {
                //    this.props.history.push(window.location.pathname.replace("/add",""));   
                // } 
                // if (response.status == 401) {
                //     this.props.history.push('/auth/login')
                // }
                
            })
            
        
    }

  

    render() {
     
        return (
            <div> 
            </div>
        )
    }
}