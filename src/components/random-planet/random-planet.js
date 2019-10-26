import React, { Component } from 'react';

import './random-planet.css';
//import SwapiService from '../../services';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PropTypes from 'prop-types';

import {withSS} from '../hoc-helpers/';



class RandomPlanet extends Component {

  constructor(){
    super();
    this.state = {
      planet: { },
      loading: true,
      error: false
    }    
  }


  static defaultProps = {
    updateInterval : 7000
  };

  static propTypes = {
    updateInterval: PropTypes.number
  }

  
  componentDidMount() {
    // console.log(this.props);
    const { updateInterval } = this.props;    
    this.updatePlanet();
    this.intervalPlanet = setInterval(this.updatePlanet, updateInterval);
    // console.log( this.intervalPlanet);
  };

  componentWillUnmount(){
    clearInterval(this.intervalPlanet);
    // console.log( this.intervalPlanet);
  }

 
  //получаем данные по API
  updatePlanet = () => {
    let id = Math.floor(Math.random()*17 + 3);
    this.props.getData(id)
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
    const content = (loading || error) ? null : <PlanetView planet={planet} getPlanetImg={this.props.getImg}/>
    
    return (      
        <div className="random-planet jumbotron rounded">
          {spinner}
          {errorMsg}
          {content}
        </div>
    );
  }
};



const mapProps = (swapi) => {
  return {
    getData: swapi.getPlanet,
    getImg: swapi.getPlanetImgUrl
  }
}

export default withSS(RandomPlanet, mapProps);

//отдельный компонент
const PlanetView = ({planet, getPlanetImg}) => {
  const {id, name, rotationPeriod, population, diameter} = planet;  
  return(
    <React.Fragment>
      <img alt='' className="planet-image"
          //  src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          src={getPlanetImg(planet)}
           />
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

