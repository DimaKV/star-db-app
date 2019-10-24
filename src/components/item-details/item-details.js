import React, { Component } from 'react';

import './item-details.css';

// import SwapiService from '../../services';

import Spinner from '../spinner';
import ErrorButton from '../error-button';



export default class ItemDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: null,
      image: null,      
      loading: true
    }
  }

  // swapi = new SwapiService();

  componentDidMount(){    
    this.getItem();
  }

  //проверяем семнился ли актвивный элемент или на смену источика данных
  componentDidUpdate(prevProps){    
    if (this.props.activeItem != prevProps.activeItem || this.props.getData != prevProps.getData) {
      
      this.setState({
        loading: true
      })
      this.getItem();
    }    
    
  }

  getItem = () =>{
    
    let {activeItem, getImgUrl} = this.props;
    
    if(!activeItem){
      return;
    }
    this.props.getData(activeItem)
      .then( (item) => {        
        this.setState({
          item: item,
          image: getImgUrl(item),
          loading: false
        })
      } )
  }

  render() {

    
    const {loading, item} = this.state;
    if(!this.state.item){
      return(
        <span>Select someone from a list please</span>
      );
    }
    const {id, name, gender, birthYear, eyeColor} = this.state.item;
    const {image} = this.state;
    if (loading) return <Spinner/>

    return (
      <div className="person-details card">
        <img className="person-image"
          src={image} />

        
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {item});
            })}           
          </ul>
          <ErrorButton />
        </div>
      </div>
      
    )
  }
}