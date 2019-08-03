import React from 'react';

import axios from 'axios';

export default class CampaignEdit extends React.Component {
    state = {
        id: '',
        id_user: '',
        name: '',
        text: '',
        username: '',
        imageUrl: '',
        tagsString: '',
        goal: 0
    }

    componentWillMount(){
        
        localStorage.setItem('image', '')
        axios.get('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split("/")[3])
        .then(response => {
            console.log(response.data)
            const username = response.data.username;
            if(localStorage.getItem('username') !== username && localStorage.getItem('role') !== '(admin)'){
                    this.props.history.push('/campaigns/campaign/'+window.location.pathname.split("/")[3])
                }
            const id = response.data.id;
            const id_user = response.data.id_user;

            if(localStorage.getItem('editname') == ''){
                var name = response.data.name;
            }
            else {var name = localStorage.getItem('editname')}
            if(localStorage.getItem('edittagsString') == ''){
                var tagsString = response.data.tags.map(tag=>tag.name).join(" ");
            }
            else {var tagsString = localStorage.getItem('edittagsString')}
            if(localStorage.getItem('edittext') == ''){
                var text = response.data.text;
            }  
            else {var text = localStorage.getItem('edittext')} 
            if(localStorage.getItem('editimage') == ''){
                var imageUrl = response.data.imageUrl;
            }
            else {var imageUrl = localStorage.getItem('editimage')}
            if(localStorage.getItem('editgoal') == ''){
                var goal = response.data.goal;
            }
            else {var goal = localStorage.getItem('editgoal')}
            this.setState({id, id_user, name, text, username, imageUrl, tagsString, goal});
          })
          
          
        
    }

    componentWillReceiveProps(){
        this.state.imageUrl = localStorage.getItem('editimage')
    }



    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
         localStorage.setItem('editname',this.state.name)
         localStorage.setItem('edittext',this.state.text)
         localStorage.setItem('edittagsString',this.state.tagsString)
         localStorage.setItem('editgoal', this.state.goal)
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8080/campaigns/campaign/'+window.location.pathname.split('/')[3], this.state, {headers:{Authorization: localStorage.getItem('token')}})
        .then((response) => {
            if (response.status == 200){
                localStorage.setItem('editimage', '')
                localStorage.setItem('editname', '')
                localStorage.setItem('edittext', '')
                localStorage.setItem('edittagsString', '')
                localStorage.setItem('editgoal', '')
                this.props.history.push('/campaigns/campaign/'+window.location.pathname.split('/')[3])
            }
        })
    }

    changeImage= event =>{
        this.props.history.push('/campaigns/editcampaign/'+window.location.pathname.split('/')[3]+'/addimage')
    }

    cancel=event=>{
        localStorage.setItem('editimage', '')
        localStorage.setItem('editname', '')
        localStorage.setItem('edittext', '')
        localStorage.setItem('edittagsString', '')
        localStorage.setItem('editgoal', '')
        this.props.history.push('/campaigns/campaign/'+window.location.pathname.split('/')[3])
    }
    
    render(){
        const {text, name, tagsString, imageUrl, goal} = this.state
        return (
            <div class="container-fluid"> 
                
                <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col-10">
                <div>    <h1>Edit campaign:</h1></div>
                    <div><div>Name</div>
                        <input type="text" class="form-control" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div><div>Tags</div>
                        <input type="text" class="form-control" name="tagsString" value={tagsString} onChange={this.handleChange}/>
                    </div>
                    <div><div>Goal</div>
                        <input type="number" class="form-control" name="goal" value={goal} onChange={this.handleChange}/>
                    </div>
                    <div class="margin"><div>Description</div>
                        <textarea type="text" class="form-control" rows="10" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <div class="margin">
                        <img class="image" src={imageUrl}/>                    
                    </div>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-success btn-lg">Submit</button>
                    <form onSubmit={this.cancel}>
                        <button type="cancel" class="btn btn-warning">cancel</button>
                    </form>
                    </div>
                </div>
                </form>
                
                <form onSubmit={this.changeImage}>
                        <button type="changeImage" class="btn btn-outline-secondary margin">Change Image</button>
                    
                    </form>
                
            </div>
        )
    }
}