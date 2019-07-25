import React from 'react';

import axios from 'axios';

export default class CommentsList extends React.Component {
  state = {
    comments: []
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/comments/`+window.location.pathname.split("/")[3])
      .then(res => {
        const comments = res.data;
        this.setState({ comments });
      })
  }

  componentWillReceiveProps(){
    axios.get(`http://localhost:8080/comments/`+window.location.pathname.split("/")[3])
    .then(res => {
      const comments = res.data;
      this.setState({ comments });
    })
  }

  render() {
    return (
      <div>
        COMMENTS
        <ul>
          { this.state.comments.map(comment => 
            <li>
                <div><a href={"/users/"+comment.id_user}>{comment.username}</a></div>
                <div>{comment.text}</div>
              
            </li>
          )}
        </ul>
      </div>
    )
  }
}