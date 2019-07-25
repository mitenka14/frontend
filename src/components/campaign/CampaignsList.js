import React from 'react';

import axios from 'axios';

export default class CampaignsList extends React.Component {
  state = {
    campaigns: []
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/campaigns/list`)
      .then(response => {
        const campaigns = response.data;
        this.setState({ campaigns });
      })
  }

  render() {
    return (
      <div>
        CAMPAIGNS LIST
        <form action="/campaigns/add">
          <button type="submit">Add campaign</button>
        </form>
        <ul>
          { this.state.campaigns.map(campaign => 
            <li>
              <div>creator <a href={"/users/user/"+campaign.id_user}>{campaign.username}</a></div>
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