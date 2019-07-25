import React from 'react';

import axios from 'axios';

export default class Activation extends React.Component {
    componentWillMount(){
        axios.get('http://localhost:8080'+window.location.pathname)
        .then((response) => {
            if (response.status === 200) {
                this.props.history.push('/users/succesfulregistration');
            } 
        })
    }
    
    render(){
        return(
            <div></div>
        )
    }
}    