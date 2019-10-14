import React, { Component } from 'react';

import './person-details.css';

import SwapiService from '../../services';

import Spinner from '../spinner';

export default class PersonDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      person: null,      
      loading: true
    }
  }

  swapi = new SwapiService();

  componentDidMount(){    
    this.getPerson();
  }

  componentDidUpdate(prevProps){
    // console.log(this.props.activeItem,  prevProps.activeItem)
    if (this.props.activeItem != prevProps.activeItem) {
      this.setState({
        loading: true
      })
      this.getPerson();
    }    
    
  }

  getPerson = () =>{
    let {activeItem} = this.props;
    if(!activeItem){
      return;
    }
    this.swapi.getPerson(activeItem)
      .then( (person) => {
        this.setState({
          person,
          loading: false
        })
      } )
  }

  render() {

    
    const {loading} = this.state;
    if(!this.state.person){
      return(
        <span>Select someone from a list please</span>
      );
    }
    const {id, name, gender, birthYear, eyeColor} = this.state.person;
    if (loading) return <Spinner/>

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}