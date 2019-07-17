import React from 'react';

import axios from 'axios';

export default class CampaignsList extends React.Component {
  state = {
    campaigns: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/list`)
      .then(res => {
        const campaigns = res.data;
        console.log(res);
        this.setState({ campaigns });
      })
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.campaigns.map(campaign => 
            <li>
              <div>{campaign.name}</div>
              <div>{campaign.text}</div>
            </li>
          )}
        </ul>
        <form action="/addcampaign">
          <button type="submit">Add campaign</button>
        </form>
      </div>
    )
  }
}