import React from 'react';

export default class Header extends React.Component {
    state = {
        username: '',
        id: '',
        buttonText: ''

    }
    componentWillMount(){
        if (localStorage.getItem('token') !== ''){
            this.state.username = localStorage.getItem('username')
            this.state.buttonText = 'LogOut'
            this.state.id = localStorage.getItem('id')
            if(localStorage.getItem('role') === '(admin)'){
                    this.adminAction = (
                        <a href="/users/admin/userlist"> (admin)</a>
                     )   
            }
        }
        else{
            this.state.buttonText = 'Login'
        }
    }

    componentWillReceiveProps(){
        if (localStorage.getItem('token') !== ''){
            this.state.username = localStorage.getItem('username')
            this.state.buttonText = 'LogOut'
            this.state.id = localStorage.getItem('id')
            if(localStorage.getItem('role') === '(admin)'){
                    this.adminAction = (
                        <a href="/users/admin/userlist"> (admin)</a>
                     )   
            }
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
            localStorage.setItem('id', '')
            this.state.username = '';
            this.state.buttonText = 'Login'
            this.adminAction=(<div></div>)
            this.props.history.push('/auth/login');
        }
        else{
            this.props.history.push('/auth/login');
        }
    }
    
    render(){
        return(
            
            <div class="container">
                <div class="row margin" > 
                    <div class="col-11"></div>
                    <div class="col-1">
                        <div><a href={"/users/user/"+this.state.id}>{this.state.username}</a>{this.adminAction}</div>
                        <form onSubmit={this.handleSubmit}>
                            <button type="submit" class="btn btn-outline-danger">{this.state.buttonText}</button>
                        </form>
                    </div>
                    </div>
                    <div class="row margin" > 
                    <div class="col-3">
                    <form action="/campaigns/list/all">
                        <button class="btn btn-primary btn-lg" type="submit">All campaigns</button>
                    </form>
                    </div>
                    <div class="col-3">
                        <form action="/search">
                            <button class="btn btn-primary btn-lg" type="submit">Find campaign</button>
                        </form>
                    </div>
                    <div class="col-3"></div>
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