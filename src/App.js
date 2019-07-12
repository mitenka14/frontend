import React from 'react';
import './App.css';
import CompaniesList from './components/CompaniesList';
import CompaniesAdd from './components/CompaniesAdd';
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>    
          <Route path="/list" component={CompaniesList} />
          <Route path="/addcompany" component={CompaniesAdd}/>
      </Router>
    </div>
  );
}

export default App;
