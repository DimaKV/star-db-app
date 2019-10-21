import React from 'react';

import Record from '../record';
import ItemDetails from '../item-details';

import {withSS} from '../hoc-helpers';


const PersonDetails = ({activeItem, getData, getImgUrl}) => {
    return (
        <ItemDetails
            getData = {getData}
            getImgUrl = {getImgUrl} 
            activeItem = {activeItem} >
                <Record field='gender' label='Gender' />
                <Record field='eyeColor' label='Eye Color' />
        </ItemDetails>        
    );

};

const mapMethodsToProps = (swapi) => {
    return{
        getData: swapi.getPerson,
        getImgUrl: swapi.getPersonImgUrl
    }
}


export default withSS(PersonDetails, mapMethodsToProps);