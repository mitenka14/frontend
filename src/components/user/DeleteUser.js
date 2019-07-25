import React from 'react';
import axios from 'axios';

export default class DeleteUser extends React.Component {
    
    componentWillMount(){
            axios.delete('http://localhost:8080/users/'+window.location.pathname.split('/')[3], {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                console.log(response)         
            })
            
        
    }

  

    render() {
     
        return (
            <div> 
            </div>
        )
    }
}