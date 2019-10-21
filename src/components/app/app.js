import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';


import './app.css';

import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services';

import DummySwapiService from '../../services/dummy-service';

import { SSProvider } from '../swapi-service-context';

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
  dummy = new DummySwapiService();

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
        <SSProvider value = {this.swapi}>
          <Header />
          
        {randomPlanet}
  
          <div className="buttonToggle">
              <button className = "btn btn-warning" onClick={this.onShowPlanet}>Toggle Random Planet</button>
          </div>        

          <PeoplePage />        
        </SSProvider>        
      </div>
    );

  }
  
};
