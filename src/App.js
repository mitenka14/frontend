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
import NavBar from './components/NavBar'
import Users from './components/user/Users';
import Campaign from './components/campaign/Campaign';
import CommentAdd from './components/comment/CommentAdd';
import CommentsList from './components/comment/CommentsList';
import AddImage from './components/image/AddImage';
import CampaignsListByUser from './components/campaign/CampaignsListByUser';
import Delete from './components/campaign/Delete';

function App() {
  return (
    <div className="App">
      <Router>  
          <Route path="/" component={NavBar}/>
          <Route path="/auth/login" component={Login}></Route>
          <Route path="/users/registration" component={Registration}></Route>
          <Route path="/users/activation/:code" component={Activation}></Route>
          <Route path="/users/checkemail" component={CheckEmail}></Route>
          <Route path="/users/succesfulregistration" component={SuccesfulRegistration}></Route>
          <Route path="/users/:userid" component={Users}></Route>
          <Route path="/campaigns/list" component={CampaignsList} />
          <Route path="/campaigns/campaign/:id" component={Campaign}/>
          <Route path="/campaigns/campaign/:id/delete" component={Delete}/>
          <Route path="/campaigns/campaign/:id/comments/add" component={CommentAdd}/>
          <Route path="/campaigns/campaign/:id/comments" component={CommentsList}/>
          <Route path="/campaigns/add" component={CampaignsAdd}/>
          <Route path="/campaigns/userlist/:userid" component={CampaignsListByUser}/>
          <Route path="/campaigns/add/addimage" component={AddImage}/>
          
      </Router>
    </div>
  );
}

export default App;
