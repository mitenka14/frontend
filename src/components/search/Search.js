import React from 'react';

import axios from 'axios';

export default class Tags extends React.Component {
    state = {
        tags: [],
        text: ''
    }
    componentWillMount(){
        axios.get('http://localhost:8080/tags')
        .then(response => { 
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
                <div class="margin30"></div>
        <div class="row justify-content-center margin30"><h1>Find campaign</h1></div>
                <div class="row">
                <div class="col-10">
                    <div class="margin90"></div>
                <form onSubmit={this.handleSubmit}>
                    <div class="row">
                    <div class="col-2"></div>
                    <div class="col-8 margin30">
                        <input type="text" class="form-control" name="text" value={text} placeholder="Search" onChange={this.handleChange}/>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-outline-success">Search</button></div>
                    </div>
                </form>
                </div>
                <div class="col-2"><h3>Popular Tags:</h3><ul class="ul1">{this.state.tags.map(tag=><li class="li1"><a href={'/search/tag/'+tag.id}>{tag.name}  </a></li>)}</ul></div>
                    </div>
            </div>
            
        )
    }
}