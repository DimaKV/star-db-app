import React, {Component} from 'react';

import ItemDetails from '../item-details';
import ItemList from '../item-list';
import { PersonList, PersonDetails } from '../sw-components';
import Record from '../record';

import Row from '../row';


import SwapiService from '../../services';
import ErrorIndicator from '../error-indicator';


class ErrorBoundary extends Component{
    constructor(){
        super();
        this.state = {
            error: false
        }
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){
        if (this.state.error){
            return <ErrorIndicator />
        }
        return this.props.children;
    }
}

export default class PeoplePage extends Component{
    constructor(){
        super()
        this.state = {
            activeItem: 1           
        }


    }

    // swapi = new SwapiService();


    onItemSelected = (id) => {
        this.setState({
            activeItem: id            
        });
    }

    render(){

        const itemList = (
            <PersonList onItemSelected = {this.onItemSelected} />
        );
        const personalDetails = ( 
            <ErrorBoundary>
                <PersonDetails activeItem = {this.state.activeItem} />                
            </ErrorBoundary>
            );

        return(

            <Row first = {itemList} second = {personalDetails} />

        )

    }
}
