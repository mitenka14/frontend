import React from 'react';
import axios from 'axios';

export default class CommentAdd extends React.Component {
    
    componentWillMount(){
            axios.delete('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split('/')[3], {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                   this.props.history.push('/campaigns/list');   
                }         
            })
            
        
    }

  

    render() {
     
        return (
            <div> 
            </div>
        )
    }
}