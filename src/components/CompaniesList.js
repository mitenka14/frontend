import React from 'react';

import axios from 'axios';

export default class CompaniesList extends React.Component {
  state = {
    companies: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/list`)
      .then(res => {
        const companies = res.data;
        console.log(res);
        this.setState({ companies });
      })
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.companies.map(company => 
            <li>
              <div>{company.name}</div>
              <div>{company.text}</div>
            </li>
          )}
        </ul>
        <form action="/addcompany">
          <button type="submit">Add company</button>
        </form>
      </div>
    )
  }
}