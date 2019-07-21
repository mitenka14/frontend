import React from 'react';

export default class Header extends React.Component {
    state = {
        username: '',
        buttonText: ''

    }
    componentWillMount(){
        if (localStorage.getItem('token') !== ''){
            this.username = localStorage.getItem('username')
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
            localStorage.setItem('token', '');
            localStorage.setItem('username', '');
            this.props.history.push('/campaigns/list');
        }
    }
    
    render(){
        return(
            
            <div>
                <form action="/campaigns/list">
                    <button type="submit">All campaigns</button>
                </form>
                <div> {this.username}</div>
                <form onSubmit={this.handleSubmit}>
                <button type="submit">{this.buttonText}</button>
                </form>
            </div>
        )
    }
}