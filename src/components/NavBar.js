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
                <div class="row margin" > 
                <div class="col-3">{this.adminAction}</div>
                    <div class="col-6 kekstarter row justify-content-center">KEKstarter</div>
                    <div class="col-2">
                        <div class="float"><h2><a href={"/users/user/"+this.state.id}>{this.state.username}</a></h2></div>
                        </div>
                        <div class="col-1">
                        <form onSubmit={this.handleSubmit}>
                            <button type="submit" class="btn btn-outline-danger btn-lg">{this.state.buttonText}</button>
                        </form>
                    </div>
                    </div>

                    


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
    <form onSubmit={this.searchSubmit} class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" name="text" value={text} placeholder="Search" onChange={this.searchChange} aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>

                    {/* <div class="row margin" > 
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
                    <div class="col-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="success btn-lg" id="dropdown-basic">
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
                    </div>
                    <div class="col-3">
                        <form action="/campaigns/add">
                            <button type="submit" class="btn btn-success btn-lg">Add campaign</button>
                        </form>
                    </div>
                    </div> */}
                    
                </div>
            
        )
    }
}