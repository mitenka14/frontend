import React from 'react';

import axios from 'axios';

export default class CampaignsListByUser extends React.Component {
  state = {
    campaigns: []
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/campaigns/userlist/`+window.location.pathname.split('/')[3])
      .then(response => {
        const campaigns = response.data;
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