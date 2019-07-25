import React from 'react';
import axios from 'axios';

export default class AddImage extends React.Component {
    state = {
        file: null
    }
    

    handleFile (e){
        this.setState({file: e.target.files[0]})
        
    }

    handleUpload(e){
        let formdata = new FormData()
        formdata.append('file', this.state.file)
        axios.post('http://localhost:8080/images', formdata, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('image', response.data)
                    this.props.history.push(window.location.pathname.replace('/addimage',''));   
                }
            })
    }
    

  

    render() {
        return (
            <div> 
                <form>
                    <div>
                        <input type="file" name="file"  onChange={(e)=> this.handleFile(e)}/>
                    </div>
                    <button type="button" onClick={(e)=>this.handleUpload(e)}>UPLOAD</button>
                </form>
            </div>
        )
    }
}