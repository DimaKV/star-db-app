import React from 'react';

import Record from '../record';
import ItemDetails from '../item-details';
import { withSS } from '../hoc-helpers';

const StarshipDetails = ( {activeItem, getData, getImgUrl } ) => {
    
    return (
        <ItemDetails
            getData = {getData}
            getImgUrl = {getImgUrl} 
            activeItem = {activeItem} >
                <Record field='model' label='Model' />
                <Record field='length' label='Length' />
                <Record field='costInCredits' label='Cost' />
        </ItemDetails>
        
    )
    
}

const mapMethodsToProps = (swapi) => {
    return {
        getData: swapi.getStarship,
        getImgUrl: swapi.getStarshipImgUrl
    }
}

export default withSS(StarshipDetails, mapMethodsToProps);