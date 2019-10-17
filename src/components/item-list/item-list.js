import React, { Component } from 'react';

import { withData } from '../hoc-helpers';
import SwapiService from '../../services';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

const ItemList = (props) => {  

  //генерпруем список имен на основании данных из state
  const generateItems = (arr) => {
    return arr.map( (item) => {
      const label = props.children(item);

      return (
        <li 
          onClick = {() => props.onItemSelected(item.id) }
          className="list-group-item" 
          key={item.id}>
          {label}
        </li>
      )
    } );
  }

  const {loading, error, data} = props;   
  const itemsList = generateItems(data);

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

const swapi = new SwapiService();

export default withData(ItemList, swapi.getPeople);

