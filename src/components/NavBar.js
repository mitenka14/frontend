import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default class Header extends React.Component {
    state = {
        username: '',
        id: '',
        buttonText: '',
        text: ''

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
                        <div class="row"><div class="col-11"></div> <div class="col-1">
                        <a href="/users/admin/userlist"> (admin)</a></div></div>
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

    searchChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    searchSubmit = event => {
        event.preventDefault();
        this.props.history.push('/search/text/'+this.state.text) 
    }
    
    render(){
        const {text} = this.state
        return(
            
            <div class="background">
                                        {this.adminAction}          


                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/campaigns/add">Add campaign</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
        <a class="nav-link" href="/campaigns/list/all">All campaigns <span class="sr-only">(current)</span></a>
      </li>
      
      <li class="nav-item dropdown">
      <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/campaigns/category/Arts">Arts</Dropdown.Item>
                        <Dropdown.Item href="/campaigns/category/Books">Books</Dropdown.Item>
                        <Dropdown.Item href="/campaigns/category/Electronics">Electronics</Dropdown.Item>
                        <Dropdown.Item href="/campaigns/category/Films">Films</Dropdown.Item>
                        <Dropdown.Item href="/campaigns/category/Games">Games</Dropdown.Item>
                        <Dropdown.Item href="/campaigns/category/Music">Music</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
      </li>
      
      
    </ul>
    <div class="kekstarter">KEKstarter</div>
    <form onSubmit={this.searchSubmit} class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" name="text" value={text} placeholder="Search" onChange={this.searchChange} aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <div class="mr"></div>
    <div class="float"><h3><a href={"/users/user/"+this.state.id}>{this.state.username}</a></h3></div>
    <div class="mr"></div>
    <form onSubmit={this.handleSubmit}>
                            <button type="submit" class="btn btn-outline-danger">{this.state.buttonText}</button>
                        </form>
  </div>
</nav>

                    
                </div>
            
        )
    }
}