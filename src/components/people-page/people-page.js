import React, {Component} from 'react';

import ItemDetails from '../item-details';
import ItemList from '../item-list';
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

        const itemList = <ItemList
                            getData = {this.swapi.getPeople}                            
                            onItemSelected = {this.onItemSelected}>
                                { (item) => `${item.name} (${item.birthYear})` }
                        </ItemList>
        const personalDetails = ( 
            <ErrorBoundary>
                <ItemDetails
                    getData = {this.swapi.getPerson}
                    getImgUrl = {this.swapi.getPersonImgUrl} 
                    activeItem = {this.state.activeItem} >
                        <Record field='gender' label='Gender' />
                        <Record field='eyeColor' label='Eye Color' />
                </ItemDetails>
            </ErrorBoundary>
            );

        return(

            <Row first = {itemList} second = {personalDetails} />

        )

    }
}
