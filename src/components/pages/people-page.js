import React from 'react';

import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundary from '../error-boundary';


const PeoplePage  = ( {match, history} ) => {
   
    const itemList = (
        <PersonList onItemSelected = { (id) => {
            history.push(id);
        } } />
    );
    const personalDetails = ( 
        <ErrorBoundary>
            <PersonDetails activeItem = { match.params.id } />                
        </ErrorBoundary>
        );
    

    return(

        <Row first = {itemList} second = {personalDetails} />

    )

}

export default PeoplePage;
