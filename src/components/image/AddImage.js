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
                    if(window.location.pathname.split("/")[2] == "editcampaign"){
                        localStorage.setItem('editimage', response.data)
                    }
                    else{
                        localStorage.setItem('image', response.data)
                    }
                    this.props.history.push(window.location.pathname.replace('/addimage',''));   
                }
            })
    }
    

  

    render() {
        return (
        

        <div >
        <div class="custom-file col-2">
            <div class="margin">
               <input type="file" class="custom-file-input" id="inputGroupFile02" onChange={(e)=> this.handleFile(e)}/>
              <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
              </div>
             
             <div><button type="button" class="btn btn-success" onClick={(e)=>this.handleUpload(e)}>UPLOAD</button></div>
             </div>
             </div>
            
        )
    }
}