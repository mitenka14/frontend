import React from 'react';

export default class Header extends React.Component {
    state = {
        username: '',
        buttonText: ''

    }
    componentWillMount(){
        if (localStorage.getItem('token') !== ''){
            this.state.username = localStorage.getItem('username')+localStorage.getItem('role')
            this.state.buttonText = 'LogOut'
        }
        else{
            this.state.buttonText = 'Login'
        }
    }

    componentWillReceiveProps(){
        if (localStorage.getItem('token') !== ''){
            this.state.username = localStorage.getItem('username')+localStorage.getItem('role')
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
            localStorage.setItem('role', '')
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
            
            <div class="container">
                <div class="row" > 
                    <div class="col-11"></div>
                    <div class="col-1">
                        <div>{this.state.username}</div>
                        <form onSubmit={this.handleSubmit}>
                            <button type="submit" class="btn btn-outline-danger">{this.state.buttonText}</button>
                        </form>
                    </div>
                    </div>
                    <div class="row" > 
                    <div class="col-3">
                    <form action="/campaigns/list/all">
                        <button class="btn btn-primary btn-lg" type="submit">All campaigns</button>
                    </form>
                    </div>
                    <div class="col-6"></div>
                    <div class="col-3">
                        <form action="/campaigns/add">
                            <button type="submit" class="btn btn-success btn-lg">Add campaign</button>
                        </form>
                    </div>
                    </div>
                    
                </div>
            
        )
    }
}