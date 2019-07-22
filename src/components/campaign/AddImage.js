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
        axios.post('http://localhost:8080/campaigns/new/addcampaign/addimage', formdata, {headers:{Authorization: localStorage.getItem('token')}})
            .then((response) => {
                localStorage.setItem('image', response.data)
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