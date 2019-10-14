import React, { Component } from 'react';

import SwapiServi from '../../services/index';

import './random-planet.css';
import SwapiService from '../../services';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  constructor(){
    super();
    this.state = {
      planet: {
        id: null,
        name: null,
        rotationPeriod: null,
        poulation: null,
        diameter: null
      },
      loading: true,
      error: false
    }    
  }

  swapi = new SwapiService();

  componentDidMount() {    
    this.updatePlanet();
    this.intervalPlanet = setInterval(this.updatePlanet, 3000);
  };

  componentWillUnmount(){
    clearInterval(this.intervalPlanet);
  }



 
  //получаем данные по API
  updatePlanet = () => {
    let id = Math.floor(Math.random()*17 + 3);
    this.swapi.getPlanet(id)
      .then( this.onPlanetLoaded )
      .catch(this.onErrorShow);   
  }

  onPlanetLoaded = (planet) => {
    this.setState( {
      planet,
      loading: false      
    } )
  }

//функция меняет error в state
onErrorShow = () => {
  this.setState({
    error: true,
    loading: false
  });
}
  

  render() {
    const {loading, error, planet} = this.state

    const errorMsg = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = (loading || error) ? null : <PlanetView planet={planet}/>

    // return <Spinner/>
    return (      
        <div className="random-planet jumbotron rounded">
          {spinner}
          {errorMsg}
          {content}
        </div>
    );
  }
};

//отдельный компонент
const PlanetView = ({planet}) => {
  const {id, name, rotationPeriod, population, diameter} = planet;

  return(
    <React.Fragment>
      <img alt='' className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}