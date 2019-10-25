import React from 'react';

import './item-list.css';

const ItemList = (props) => {  

  //генерпруем список имен/названий на основании данных из state
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

  const {data} = props;   
  const itemsList = generateItems(data);  

  return (
    <ul className="item-list list-group">      
      {itemsList}     
    </ul>
  );  

}

export default ItemList;

