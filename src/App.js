import React from 'react';
import './App.css';
import CampaignsList from './components/CampaignsList';
import CampaignsAdd from './components/CampaignsAdd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/Registaration';
import Activation from './components/Activation';
import CheckEmail from './components/CheckEmail';
import SuccesfulRegistration from './components/SuccesfulRegistration'
import Login from './components/Login';
import Header from './components/Header'
import Users from './components/Users';


function App() {
  return (
    <div className="App">
      <Router>  
          <Route path="/" component={Header}/>
          <Route path="/list" component={CampaignsList} />
          <Route path="/addcampaign" component={CampaignsAdd}/>
          <Route path="/auth/registration" component={Registration}></Route>
          <Route path="/auth/activation/:code" component={Activation}></Route>
          <Route path="/auth/checkemail" component={CheckEmail}></Route>
          <Route path="/auth/succesfulregistration" component={SuccesfulRegistration}></Route>
          <Route path="/auth/login" component={Login}></Route>
          <Route path="/users/:username" component={Users}></Route>
      </Router>
    </div>
  );
}

export default App;
