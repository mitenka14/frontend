import React from 'react';

export default class Header extends React.Component {
    state = {
        userId: '',
        buttonText: ''

    }
    componentWillMount(){
        if (localStorage.getItem('token') !== ''){
            var token = localStorage.getItem('token').split('.',3)
            var tokenPayload = atob(token[1]).split(',',1)
            var userId = tokenPayload[0].split(':')
            this.userId="userId"+userId[1]
            this.buttonText = 'LogOut'
        }
        else{
            this.buttonText = 'Login'
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        if (this.buttonText == 'Login'){
            this.props.history.push('/auth/login');
        }
        else{
            localStorage.setItem('token', '')
            this.props.history.push('/list');
        }
    }
    
    render(){
        return(
            
            <div>
                <div> {this.userId}/</div>
                <form onSubmit={this.handleSubmit}>
                <button type="submit">{this.buttonText}</button>
                </form>
            </div>
        )
    }
}