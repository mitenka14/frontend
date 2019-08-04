import React from 'react';

import axios from 'axios';

export default class BonusesByUser extends React.Component {
    state = {
        bonuses: []
    }
    componentWillMount(){
        axios.get('http://localhost:8080/bonuses/user/'+window.location.pathname.split("/")[3])
        .then(response => {
            console.log(response)
            this.setState({bonuses: response.data});
          })
        
    }

    

    
    
    render(){
        return(
                <div>
                    <h3>Bonuses:</h3>
                    <ul class="list-group">{this.state.bonuses.slice(0).reverse().map(bonus=>
                        <div class="margin">
                            <li class="list-group-item  list-group-item">
                            <div class="margin">{bonus.text}</div>
                            
                                <div>From campaign: <a href={"/campaigns/campaign/"+bonus.idCampaign}>{bonus.campaignName}</a></div>
                                
                            </li>
                        </div>)}
                    </ul>
                </div>
        )
    }
}