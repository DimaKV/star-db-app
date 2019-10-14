import React, {Component} from 'react';

import PersonDetails from '../person-details';
import ItemList from '../item-list';


import SwapiService from '../../services';

export default class PeoplePage extends Component{
    constructor(){
        super()
        this.state = {
            activeItem: 3
        }


    }

    swapi = new SwapiService();


    onItemSelected = (id) => {
        this.setState({
            activeItem: id
        });
    }

    render(){

        return(

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
                getData = {this.swapi.getPeople}
                onItemSelected = {this.onItemSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails activeItem = {this.state.activeItem} />
          </div>
        </div>

        )

    }
}
