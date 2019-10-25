import React, {Component} from 'react';

import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundary from '../error-boundary';


export default class PeoplePage extends Component{
    constructor(){
        super()
        this.state = {
            activeItem: 1           
        }
    }

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
