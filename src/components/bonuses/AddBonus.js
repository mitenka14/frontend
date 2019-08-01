import React from 'react';
import axios from 'axios';

export default class AddBonus extends React.Component {
    state = {
        price: null,
        text: '',
        
    }
    
    
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:8080/bonuses/campaign/'+window.location.pathname.split("/")[3], this.state, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status == 200) {
                    this.props.history.push('/campaigns/campaign/'+window.location.pathname.split('/')[3]);   
                } 
                
                
            })
        
        
    }
  
  

    render() {
        const {price, text} = this.state
        return (
            <div class="container-fluid margin"> 
                
                <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col-10">
                <div>    <h1>Add bonus:</h1></div>
                    <div><div>Price</div>
                        <input type="number" class="form-control" name="price" value={price} onChange={this.handleChange}/>
                    </div>
                    
                    <div class="margin"><div>Description</div>
                        <textarea type="text" class="form-control" rows="3" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    </div>
                    <div class="col-2">
                    <button type="submit" class="btn btn-success btn-lg">Submit</button>
                    
                    </div>
                </div>
                </form>
                               
            </div>
            
        )
    }
}