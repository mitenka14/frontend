import React from 'react';

import axios from 'axios';

export default class CommentsList extends React.Component {
  state = {
    comments: [],
    text: ''
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/comments/`+window.location.pathname.split("/")[3])
      .then(response => {
        this.setState({ comments:  response.data});
      })
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
}

handleSubmit = event => {
    event.preventDefault()
    if (localStorage.getItem('token') === ''){
      this.props.history.push('/auth/login')
  }
        axios.post('http://localhost:8080/comments/'+window.location.pathname.split('/')[3], this.state, {headers:{Authorization: localStorage.getItem('token')}})
        .then((response) => {
            console.log(response)
            if (response.status == 200) {
              this.state.text = ''
              this.componentWillMount()
            } 
                            
        }) 
}


  render() {
    const {text} = this.state
    return (
      <div class="container">
        <div class="row">
        <div class="col">
        <form onSubmit={this.handleSubmit} >
                  <div class="row margin">
                    <div class="col-10" >
                        <input type="text" class="form-control" name="text" placeholder="Write a comment" value={text} onChange={this.handleChange}/>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-success">Send</button>
                    </div>
                    </div>
                </form>
        <ul class="list-group">
          { this.state.comments.slice(0).reverse().map(comment => 
            <li class="list-group-item list-group-item-primary">
                <div><a href={"/users/user/"+comment.id_user}>{comment.username}:</a></div>
                <div>{comment.text}</div>
              
            </li>
          )}
        </ul>
      
            </div>
            </div>
            </div>
    )
  }
}