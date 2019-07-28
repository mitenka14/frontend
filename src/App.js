import React from 'react';
import './App.css';
import CampaignsList from './components/campaign/CampaignsList';
import CampaignsAdd from './components/campaign/CampaignsAdd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/user/Registaration';
import Activation from './components/user/Activation';
import CheckEmail from './components/user/CheckEmail';
import SuccesfulRegistration from './components/user/SuccesfulRegistration'
import Login from './components/auth/Login';
import UserBlocked from './components/auth/UserBlocked';
import NavBar from './components/NavBar'
import Users from './components/user/Users';
import Campaign from './components/campaign/Campaign';
import CommentsList from './components/comment/CommentsList';
import AddImage from './components/image/AddImage';
import CampaignsListByUser from './components/campaign/CampaignsListByUser';
import UserList from './components/user/UserList';
import EditUser from './components/user/EditUser';
import CampaignEdit from './components/campaign/CampaignEdit';

function App() {
  return (
    <div class="container-fluid">
       
        <Router>  
            <Route path="/" component={NavBar}/>
            <div class="layer">
            <Route path="/auth/login" component={Login}></Route>
            <Route path="/auth/userblocked" component={UserBlocked}></Route>
            <Route path="/users/registration" component={Registration}></Route>
            <Route path="/users/activation/:code" component={Activation}></Route>
            <Route path="/users/checkemail" component={CheckEmail}></Route>
            <Route path="/users/succesfulregistration" component={SuccesfulRegistration}></Route>
            <Route path="/users/admin/userlist" component={UserList}></Route>
            <Route path="/users/user/:userid" component={Users}></Route>
            <Route path="/users/edituser/:userid" component={EditUser}></Route>
            <Route path="/users/user/:userid/campaigns" component={CampaignsListByUser}/>
            <Route path="/campaigns/list" component={CampaignsList} />
            <Route path="/campaigns/campaign/:id" component={Campaign}/>
            <Route path="/campaigns/editcampaign/:id" component={CampaignEdit}/>
            <Route path="/campaigns/editcampaign/:id/addimage" component={AddImage}/>
            <Route path="/campaigns/campaign/:id/comments" component={CommentsList}/>
            <Route path="/campaigns/add" component={CampaignsAdd}/>
            <Route path="/campaigns/add/addimage" component={AddImage}/>
            </div>
        </Router>
      
    </div>
  );
}

export default App;
