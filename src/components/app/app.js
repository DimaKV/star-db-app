import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import { BrowserRouter, Route } from 'react-router-dom';


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
      error: false,
      swapi : new SwapiService()
    }
  }

  // swapi = new SwapiService();
  // dummy = new DummySwapiService();

  componentDidCatch(){
    console.log('catch');
    this.setState({
      error: true
    });
  }

  onChangeServer = () =>{
    this.setState( (prevState) => {
      const newSwapi = (prevState.swapi instanceof SwapiService) ? 
                      new DummySwapiService : new SwapiService;      
      return {
        swapi: newSwapi
      }
    } );
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

    const randomPlanet = (this.state.showPlanet) ? <RandomPlanet updateInterval={8000} /> : null;    
    return (
      <div>
        <SSProvider value = {this.state.swapi}>
        <BrowserRouter>
            <Header onChangeServer = {this.onChangeServer} />
            
            {randomPlanet}
    
            <div className="buttonToggle">
                <button className = "btn btn-warning" onClick={this.onShowPlanet}>Toggle Random Planet</button>
            </div>        
            <Route path="/" render={() => <h2>Welcome to Star DB</h2>} exact = {true}></Route>
            <Route path="/people" component={PeoplePage} />
            <Route path="/starships" component={StarshipPage} />
            <Route path="/planets" component={PlanetPage} />
          </BrowserRouter>     

        </SSProvider>        
      </div>
    );

  }
  
};
