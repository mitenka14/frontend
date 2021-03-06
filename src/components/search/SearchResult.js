import React from 'react';

import axios from 'axios';

export default class CampaignsList extends React.Component {
  state = {
    campaigns: []
  }

  componentWillMount() {
    axios.get('http://localhost:8080/campaigns/search/'+window.location.pathname.split('/')[3])
      .then(response => {
        if (response.data.length == 0){
          this.nothingFound = (
              <div><h1>Nothing found</h1></div>
          )
        }
        const campaigns = response.data;
        this.setState({ campaigns });
      })
  }

  componentWillReceiveProps() {
    axios.get('http://localhost:8080/campaigns/search/'+window.location.pathname.split('/')[3])
      .then(response => {
        if (response.data.length == 0){
          this.nothingFound = (
              <div><h1>Nothing found</h1></div>
          )
        }
        const campaigns = response.data;
        this.setState({ campaigns });
      })
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row justify-content-center">{this.nothingFound}</div>
        <div class="row">
          
        </div>
        <ul class="list-group">
          { this.state.campaigns.slice(0).reverse().map(campaign => 
            <div class="margin30"><li class="list-group-item  list-group-item-list">
              <div class="row">
              <div class="col-2"><img class="image" src={campaign.imageUrl}/></div>
              <div class="col-8">
                <div><h3><a href={"/campaigns/campaign/"+campaign.id}>{campaign.name}</a></h3></div>
                <div>{campaign.text.slice(0,300)}</div>
                <div class="row">
                  <div class="col-1"><h4>Tags:</h4></div>
                <div class="col-11"><ul>{campaign.tags.map(tag=><li class="li"><a href={'/search/tag/'+tag.id}>{tag.name}  </a></li>)}</ul></div></div>
                </div>
                <div class="col-2">
                <div>
                  Creator: <a href={"/users/user/"+campaign.id_user}>{campaign.username}</a>
                  </div>
                  <div>
                  Category: <a href={"/campaigns/category/"+campaign.category}>{campaign.category}</a>
                  </div>
                  </div>
              </div>
            </li></div>
          )}
        </ul>
      </div>
    )
  }
}