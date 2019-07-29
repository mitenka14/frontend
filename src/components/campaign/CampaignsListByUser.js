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
      <div class="container-fluid">
        
        <div class="row">
          
        </div>
        <ul class="list-group">
          { this.state.campaigns.slice(0).reverse().map(campaign => 
            <li class="list-group-item  list-group-item-list">
              <div class="row">
              <div class="col-2"><img class="image" src={campaign.imageUrl}/></div>
              <div class="col-10">
                <div><h3><a href={"/campaigns/campaign/"+campaign.id}>{campaign.name}</a></h3></div>
                <div>{campaign.text.slice(0,300)}</div>
                <div class="row">
                  <div class="col-1"><h4>Tags:</h4></div>
                <div class="col-11"><ul>{campaign.tags.map(tag=><li class="li"><a href={tag.id}>{tag.name}  </a></li>)}</ul></div></div>
                
                </div>
              
              
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}