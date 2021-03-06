import React from 'react';

import axios from 'axios';
import CommentsList from '../comment/CommentsList';
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class Campaign extends React.Component {
    state = {
        id_user: '',
        name: '',
        text: '',
        username: '',
        imageUrl: '',
        tags: [],
        goal: 0,
        collectedFunds: 0,
        bonuses: []
    }

    componentWillMount(){
        axios.get('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            console.log(response)
            const id_user = response.data.id_user;
            const name = response.data.name;
            const text = response.data.text;
            const username = response.data.username;
            const goal = response.data.goal;
            const collectedFunds = response.data.collectedFunds;
            if(localStorage.getItem('username') === username || localStorage.getItem('role') === '(admin)'){
                    this.delete = (
                    <div>
                        <form onSubmit={this.delete}>
                            <button type="delete" class="btn btn-danger">delete</button>
                        </form>
                    </div>
                    )
                    this.edit = (
                        <div>
                        <form action={'/campaigns/editcampaign/'+window.location.pathname.split('/')[3]}>
                            <button type="edit" class="btn btn-warning">edit</button>
                        </form>
                    </div>
                    )
                    this.setBonuses = (
                        <div>
                        <form action={'/bonuses/campaign/'+window.location.pathname.split('/')[3]}>
                            <button type="edit" class="btn btn-success">add bonus</button>
                        </form>
                    </div>
                    )
                }
            const imageUrl = response.data.imageUrl;
            const tags = response.data.tags;
            this.progressBar = (collectedFunds*100/goal).toString(10).split('.', 1)
            this.progressInstance = <ProgressBar now={this.progressBar} label={`${this.progressBar}%`} />;
            this.setState({id_user, name, text, username, imageUrl, tags, goal, collectedFunds});
          })
          localStorage.setItem('editimage', '')
                localStorage.setItem('editname', '')
                localStorage.setItem('edittext', '')
                localStorage.setItem('edittagsString', '')
                localStorage.setItem('goal', '')
                localStorage.setItem('collectedFunds', '')
                
                axios.get('http://localhost:8080/bonuses/campaign/'+window.location.pathname.split("/")[3])
                .then(response => {
                    
                    this.setState({bonuses: response.data});
                  })  
                  this.pledge = localStorage.getItem("pledge") 
            localStorage.setItem("pledge", "")
        
    }

    componentWillReceiveProps(){
        axios.get('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            const id_user = response.data.id_user;
            const name = response.data.name;
            const text = response.data.text;
            const username = response.data.username;
            const goal = response.data.goal;
            const collectedFunds = response.data.collectedFunds;
            if(localStorage.getItem('username') === username || localStorage.getItem('role') === '(admin)'){
                    this.delete = (
                    <div>
                        <form onSubmit={this.delete}>
                            <button type="delete" class="btn btn-danger">delete</button>
                        </form>
                    </div>
                    )
                    this.edit = (
                        <div>
                        <form action={'/campaigns/editcampaign/'+window.location.pathname.split('/')[3]}>
                            <button type="edit" class="btn btn-warning">edit</button>
                        </form>
                    </div>
                    )
                    this.setBonuses = (
                        <div>
                        <form action={'/bonuses/campaign/'+window.location.pathname.split('/')[3]}>
                            <button type="edit" class="btn btn-success">add bonus</button>
                        </form>
                    </div>
                    )
                }
            const imageUrl = response.data.imageUrl;
            const tags = response.data.tags;
            this.progressBar = (collectedFunds*100/goal).toString(10).split('.', 1)
            this.progressInstance = <ProgressBar now={this.progressBar} label={`${this.progressBar}%`} />;
            this.setState({id_user, name, text, username, imageUrl, tags, goal, collectedFunds});
          })
          axios.get('http://localhost:8080/bonuses/campaign/'+window.location.pathname.split("/")[3])
          .then(response => {
              
              this.setState({bonuses: response.data});
            }) 
            this.pledge = localStorage.getItem("pledge") 
            localStorage.setItem("pledge", "")
        
    }

   

    delete = event => {
        event.preventDefault();
        axios.delete('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split('/')[3], {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status==200){
                    this.props.history.push('/campaigns/list');   
                }
            })
    }

    handleClick(id){
        axios.get('http://localhost:8080/bonuses/buy/'+id, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status == 200){
                    localStorage.setItem("pledge", "Thank you for pledging!")
                    this.componentWillMount()
                }
            })
    }
    
    
    render(){
        return(
            <div class="container-fluid">
                <div class="margin30"></div>
                <div class="row justify-content-center margin30"><h1>{this.state.name}</h1></div>
                <div class="row">
                    <div class="col-2">
                        <img  class="image" src={this.state.imageUrl}/>
                        
                  <div><h4>Tags:</h4></div>
                <div><ul>{this.state.tags.map(tag=><li><a href={'/search/tag/'+tag.id}>{tag.name}  </a></li>)}</ul></div>
                {this.delete}
                        {this.edit}
                        {this.setBonuses}
                        </div>
                    
                    <div class="col-8"><h3>Description:</h3><div class="margin30">{this.state.text}</div>
                    <div class="row">
                <CommentsList/>
                    </div></div>
                    <div class="col-2">
                        <h3>Creator: <a href={"/users/user/"+this.state.id_user}>{this.state.username}</a></h3>
                        
                        <div class="margin30"><div><h4>{this.state.collectedFunds}$ of {this.state.goal}$ collected</h4></div>
                        {this.progressInstance}
                        {this.pledge}
                        </div>
                        
                        <div>
                    <h3>Bonuses:</h3>
                    <ul class="list-group">{this.state.bonuses.slice(0).reverse().map(bonus=>
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
                    </div>
                </div>
                
                
                
                
                
            </div>
        )
    }
}    