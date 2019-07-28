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
      <div class="container-fluid">
        <div class="row justify-content-center"><h1>All Campaigns</h1></div>
        <div class="row">
          
        </div>
        <ul class="list-group">
          { this.state.campaigns.slice(0).reverse().map(campaign => 
            <li class="list-group-item  list-group-item-list">
              <div class="row">
              <div class="col-2"><img class="image" src={campaign.imageUrl}/></div>
              <div class="col-9">
                <div><h3><a href={"/campaigns/campaign/"+campaign.id}>{campaign.name}</a></h3></div>
                <div>{campaign.text.slice(0,300)}</div>
                </div>
              <div class="col-1">Creator: <a href={"/users/user/"+campaign.id_user}>{campaign.username}</a></div>
              
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}