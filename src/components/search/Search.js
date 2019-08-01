import React from 'react';

import axios from 'axios';

export default class Tags extends React.Component {
    state = {
        tags: [],
        text:''
    }
    componentWillMount(){
        axios.get('http://localhost:8080/tags')
        .then(response => {
            console.log(response.data)
            const tags = response.data;   
            this.setState({tags: response.data});
          })
        
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.history.push('/search/text/'+this.state.text) 
    }

    
    
    render(){
        const {text} = this.state
        return(
            <div class="container-fluid">
                <div class="margin"></div>
                <div class="row">
                <div class="col-10">
                <form onSubmit={this.handleSubmit}>
                    <div class="row">
                    <div class="col-10">
                        <input type="text" class="form-control" name="text" value={text} placeholder="Enter your search query" onChange={this.handleChange}/>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-primary">Find</button></div>
                    </div>
                </form>
                </div>
                <div class="col-2"><h3>Popular Tags:</h3><ul class="ul1">{this.state.tags.map(tag=><li class="li1"><a href={'/search/tag/'+tag.id}>{tag.name}  </a></li>)}</ul></div>
                    </div>
            </div>
            
        )
    }
}