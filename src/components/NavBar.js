import React from 'react';

export default class Header extends React.Component {
    state = {
        username: '',
        buttonText: ''

    }
    componentWillMount(){
        if (localStorage.getItem('token') !== ''){
            this.state.username = localStorage.getItem('username')
            this.state.buttonText = 'LogOut'
        }
        else{
            this.state.buttonText = 'Login'
        }
    }

    componentWillReceiveProps(){
        if (localStorage.getItem('token') !== ''){
            this.state.username = localStorage.getItem('username')
            this.state.buttonText = 'LogOut'
        }
        else{
            this.state.buttonText = 'Login'
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        if (this.state.buttonText === 'LogOut'){
            localStorage.setItem('token', '');
            localStorage.setItem('username', '');
            this.state.username = '';
            this.state.buttonText = 'Login'
            this.props.history.push('/auth/login');
        }
        else{
            this.props.history.push('/auth/login');
        }
    }
    
    render(){
        return(
            
            <div>
                <form action="/campaigns/list/all">
                    <button type="submit">All campaigns</button>
                </form>
                <div> {this.state.username}</div>
                <form onSubmit={this.handleSubmit}>
                <button type="submit">{this.state.buttonText}</button>
                </form>
            </div>
        )
    }
}