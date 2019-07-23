import React from 'react';

import axios from 'axios';

export default class CampaignsListByUser extends React.Component {
  state = {
    campaigns: []
  }

  componentWillMount() {
    axios.get(`http://localhost:8080`+window.location.pathname)
      .then(res => {
        const campaigns = res.data;
        console.log(res);
        this.setState({ campaigns });
      })
  }

  render() {
    return (
      <div>
        USER'S CAMPAIGNS
        
        <ul>
          { this.state.campaigns.map(campaign => 
            <li>
              <div><img  src={campaign.imageUrl}/></div>
              <div>name <a href={"/campaigns/campaign/"+campaign.id}>{campaign.name}</a></div>
              <div>description {campaign.text}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}