import React from 'react';
import './App.css';
import CampaignsList from './components/campaign/CampaignsList';
import CampaignsAdd from './components/campaign/CampaignsAdd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/auth/Registaration';
import Activation from './components/auth/Activation';
import CheckEmail from './components/auth/CheckEmail';
import SuccesfulRegistration from './components/auth/SuccesfulRegistration'
import Login from './components/auth/Login';
import Header from './components/Header'
import Users from './components/Users';
import Campaign from './components/campaign/Campaign';
import CommentAdd from './components/campaign/CommentAdd';
import CommentsList from './components/campaign/CommentsList';


function App() {
  return (
    <div className="App">
      <Router>  
          <Route path="/" component={Header}/>
          <Route path="/campaigns/list" component={CampaignsList} />
          <Route path="/campaigns/campaign/:id" component={Campaign}/>
          <Route path="/campaigns/new/addcampaign" component={CampaignsAdd}/>
          <Route path="/auth/registration" component={Registration}></Route>
          <Route path="/auth/activation/:code" component={Activation}></Route>
          <Route path="/auth/checkemail" component={CheckEmail}></Route>
          <Route path="/auth/succesfulregistration" component={SuccesfulRegistration}></Route>
          <Route path="/auth/login" component={Login}></Route>
          <Route path="/users/:username" component={Users}></Route>
          <Route path="/campaigns/campaign/:id/comments/add" component={CommentAdd}/>
          <Route path="/campaigns/campaign/:id/comments" component={CommentsList}/>
      </Router>
    </div>
  );
}

export default App;
