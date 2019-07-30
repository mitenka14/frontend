import React from 'react';

import axios from 'axios';

export default class Tags extends React.Component {
    state = {
        tags: []
    }
    componentWillMount(){
        axios.get('http://localhost:8080/search')
        .then(response => {
            console.log(response.data)
            const tags = response.data;   
            this.setState({tags});
          })
        
    }

    
    
    render(){
        return(
            <div class="container-fluid">
                <div class="margin"></div>
                <div class="row">
                <div class="col-10"></div>
                <div class="col-2"><h3>Popular Tags:</h3><ul>{this.state.tags.map(tag=><li><a href={'/search/tag/'+tag.id}>{tag.name}  </a></li>)}</ul></div>
                    </div>
            </div>
            
        )
    }
}