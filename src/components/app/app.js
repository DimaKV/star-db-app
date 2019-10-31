import React, {Component} from 'react';

import '../../bootstrap.min.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, PlanetPage, StarshipPage, LoginPage, SecretPage } from '../pages';
import { StarshipDetails } from '../sw-components';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


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
      isLogged: false,
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
                      new DummySwapiService() : new SwapiService();      
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

  onLoging = () => {
    this.setState({
      isLogged: true
    })
  }

  onLogout = () => {
    this.setState({
      isLogged: false
    })
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
            <Switch>
              
              
              <Route path="/" render={() => <div className="jumbotron"><h2>Welcome to Star DB</h2></div>} exact = {true}></Route>
              <Route path="/people/:id?" component={PeoplePage} />
              
              <Route path="/planets" component={PlanetPage} />

              <Route path="/starships" component={StarshipPage} exact />

              <Route path="/starships/:id"
                    render = { ( {match} ) => {
                      console.log(match);
                      return <StarshipDetails activeItem = {match.params.id}/>
                    } } 
              />

              <Route path="/login" 
                render={ () => {
                  return <LoginPage onLoging = {this.onLoging}                                    
                                    isLogged = {this.state.isLogged} />
                } } 
              />

              <Route path="/secret" render={ () => {
                return <SecretPage isLogged = {this.state.isLogged}
                                    onLogout = {this.onLogout}/>
              } } />

              <Route render = { () => <h2>Page not found</h2> } />

            </Switch>

          </BrowserRouter>     

        </SSProvider>        
      </div>
    );

  }
  
};
