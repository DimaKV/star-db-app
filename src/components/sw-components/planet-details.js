import React from 'react';
import Record from '../record';
import ItemDetails from '../item-details';
import {withSS} from '../hoc-helpers';




const PlanetDetails = ({activeItem, getData, getImgUrl}) => {

    return (
        <ItemDetails
            getData = {getData}
            getImgUrl = {getImgUrl} 
            activeItem = {activeItem} >
                <Record field='population' label='Population' />
                <Record field='rotationPeriod' label='Rotation Period' />
                <Record field='diameter' label='Diameter' />
        </ItemDetails>
    )
    
}

const mapMethodsToProps = (swapi) => {
    return{
        getData: swapi.getPlanet,
        getImgUrl: swapi.getPlanetImgUrl
    }
}

export default withSS(PlanetDetails, mapMethodsToProps);