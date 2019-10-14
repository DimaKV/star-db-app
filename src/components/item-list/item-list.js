import React, { Component } from 'react';

import SwapiService from '../../services';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      itemList: [
        {name: 'test', id: 1}
      ],
      loading: true,
      error: false
    }
  }

  swapi = new SwapiService();

  componentDidMount(){    
    this.getPeople();    
  }

  onError() {
    this.setState({
      error: true,
      loading: false
    })
  }

  //получаем список людей через API
  getPeople = () => {
    const {getData} = this.props;
    getData()
      .then( (itemList) => {        
        this.setState({
          itemList: itemList,
          loading: false          
        });
      } )
      .catch(() => {
        this.onError();
      })
  }

  //генерпруем список имен на основании данных из state
  generateItems = (arr) => {
    return arr.map( (person) => {
      return (
        <li 
          onClick = {() => this.props.onItemSelected(person.id) }
          className="list-group-item" 
          key={person.id}>
          {person.name}
        </li>
      )
    } );
  }

  // onItemSelected(){

  // }

  render() {
    
    const {loading, error, itemList} = this.state;   
    const itemsList = this.generateItems(itemList);

    const showPeople = (loading || error) ? null : itemsList;
    const spinner = (loading) ? <Spinner/> : null;
    const showError = (error) ? <ErrorIndicator/> : null;

    return (
      <ul className="item-list list-group">
        {spinner}
        {showError}
        {showPeople} 
      </ul>
    );
  }
}

