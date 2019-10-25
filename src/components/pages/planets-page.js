import React, {Component} from 'react';

import { PlanetList, PlanetDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundary from '../error-boundary';


export default class PlanetPage extends Component{
    constructor(){
        super()
        this.state = {
            activeItem: 2           
        }
    }

    onItemSelected = (id) => {
        this.setState({
            activeItem: id            
        });
    }

    render(){

        const itemList = (
            <PlanetList onItemSelected = {this.onItemSelected} />
        );
        const itemDetails = ( 
            <ErrorBoundary>
                <PlanetDetails activeItem = {this.state.activeItem} />                
            </ErrorBoundary>
            );

        return(

            <Row first = {itemList} second = {itemDetails} />

        )

    }
}
