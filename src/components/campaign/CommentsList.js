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
              <div>{comment.text}</div>
              {/* <div><a href={"/campaigns/campaign/"+campaign.id}>{campaign.name}</a></div>
              <div>{campaign.text}</div> */}
            </li>
          )}
        </ul>
      </div>
    )
  }
}