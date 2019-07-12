import React from 'react';
import axios from 'axios';

export default class CompaniesAdd extends React.Component {
    state = {
        name: '',
        text: ''
    }
    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.name.trim().length>3 && this.state.text.trim().length>10 ) {
            axios.post('http://localhost:8080/addcompany', this.state)
            .then((response) => {
                if (response.status == 200) {
                    this.props.history.push('/list');
                } 
            })
        }
    }

  

    render() {
        const {name, text} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="text" name="text" value={text} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}