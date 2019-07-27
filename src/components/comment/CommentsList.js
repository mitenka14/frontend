import React from 'react';

import axios from 'axios';

export default class CommentsList extends React.Component {
  state = {
    comments: []
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/comments/`+window.location.pathname.split("/")[3])
      .then(response => {
        const comments = response.data;
        this.setState({ comments });
      })
  }

  
  handleChange = event => {
    this.text = event.target.value
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
              this.componentWillMount()
            } 
                            
        })
        
    
}

  render() {
    const {text} = this.text
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
        <ul>
          { this.state.comments.map(comment => 
            <li>
                <div><a href={"/users/user/"+comment.id_user}>{comment.username}</a></div>
                <div>{comment.text}</div>
              
            </li>
          )}
        </ul>
        <div><a href={'http://localhost:3000/campaigns/campaign/'+window.location.pathname.split("/")[3]+'/comments/add'}>ADD COMMENT</a></div>
      </div>
    )
  }
}