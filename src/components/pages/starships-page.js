import React, {Component} from 'react';

import { StarshipList, StarshipDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundary from '../error-boundary';


export default class StarshipPage extends Component{
    constructor(){
        super()
        this.state = {
            activeItem: 15           
        }
    }

    onItemSelected = (id) => {
        this.setState({
            activeItem: id            
        });
    }

    render(){

        const itemList = (
            <StarshipList onItemSelected = {this.onItemSelected} />
        );
        const itemDetails = ( 
            <ErrorBoundary>
                <StarshipDetails activeItem = {this.state.activeItem} />                
            </ErrorBoundary>
            );

        return(

            <Row first = {itemList} second = {itemDetails} />

        )

    }
}
