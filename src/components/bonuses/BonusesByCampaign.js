import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class BonusesByCampaign extends React.Component {
    state = {
        bonuses: []
    }
    componentWillMount(){
        axios.get('http://localhost:8080/bonuses/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            
            this.setState({bonuses: response.data});
          })
        
    }

    handleClick(id){
        axios.get('http://localhost:8080/bonuses/buy/'+id, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status == 200){
                    // this.context.router.history.push('/dd')
                }
            })
    }

    
    
    render(){
        return(
                <div>
                    <h3>Bonuses:</h3>
                    <ul class="list-group">{this.state.bonuses.map(bonus=>
                        <div class="margin30">
                            <li class="list-group-item  list-group-item">
                                <div>
                                    <button type="pledge" class="btn btn-success" onClick={(e)=>this.handleClick(bonus.id)}>Pledge {bonus.price}$</button>
                                    
                                </div>
                                {bonus.text}
                            </li>
                        </div>)}
                    </ul>
                </div>
        )
    }
}