import React from 'react';

import axios from 'axios';

export default class BonusesByCampaign extends React.Component {
    state = {
        bonuses: []
    }
    componentWillMount(){
        axios.get('http://localhost:8080/bonuses/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            console.log(response.data) 
            this.setState({bonuses: response.data});
          })
        
    }

    
    
    render(){
        return(
                <div>
                    <h3>Bonuses:</h3>
                    <ul class="ul1">{this.state.bonuses.map(bonus=>
                        <li class="li1">
                            <a href={'/search/tag/'+bonus.id}>{bonus.name}  </a>
                        </li>)}
                    </ul>
                </div>
        )
    }
}