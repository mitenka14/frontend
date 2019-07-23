import React from 'react';

import axios from 'axios';

export default class CommentsList extends React.Component {
  state = {
    comments: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080`+window.location.pathname)
      .then(res => {
        const comments = res.data;
        console.log(res);
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