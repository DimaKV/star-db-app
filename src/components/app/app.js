import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services';

export default class App extends Component{

  constructor(){
    super();
    this.state = {
      showPlanet: true,
      activeItem: null,
      error: false
    }
  }

  swapi = new SwapiService();

  componentDidCatch(){
    console.log('catch');
    this.setState({
      error: true
    });
  }

  onShowPlanet = () => {
    this.setState({
      showPlanet: !this.state.showPlanet
    });
  }

  onItemSelected = (id) => {
    this.setState({
      activeItem: id
    });
  }
  
  render(){

    if(this.state.error){
      return <ErrorIndicator/>
    }

    const randomPlanet = (this.state.showPlanet) ? <RandomPlanet /> : null;    
    return (
      <div>
        <Header />
        
        {randomPlanet}
  
        <div className="buttonToggle">
            <button className = "btn btn-warning" onClick={this.onShowPlanet}>Toggle Random Planet</button>
        </div>        

        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
                getData = {this.swapi.getAllStarships}
                onItemSelected = {this.onItemSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails activeItem = {this.state.activeItem} />
          </div>
        </div>
        
      </div>
    );

  }
  
};
