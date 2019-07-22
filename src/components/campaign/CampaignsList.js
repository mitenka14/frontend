import React from 'react';

import axios from 'axios';

export default class CampaignsList extends React.Component {
  state = {
    campaigns: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/campaigns/list`)
      .then(res => {
        const campaigns = res.data;
        console.log(res);
        this.setState({ campaigns });
      })
  }

  render() {
    return (
      <div>
        CAMPAIGNS LIST
        <form action="/campaigns/new/addcampaign">
          <button type="submit">Add campaign</button>
        </form>
        <ul>
          { this.state.campaigns.map(campaign => 
            <li>
              <div><a href={"/users/"+campaign.id_user}>{campaign.username}</a></div>
              <div><img  src={campaign.imageUrl}/></div>
              <div><a href={"/campaigns/campaign/"+campaign.id}>{campaign.name}</a></div>
              <div>{campaign.text}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}