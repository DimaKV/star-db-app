import React from 'react';

//import SwapiService from '../../services';
import Record from '../record';
import ItemDetails from '../item-details';
import { SSConsumer } from '../swapi-service-context';

//const swapi = new SwapiService();

const PersonDetails = ({activeItem}) => {
    return (
        <SSConsumer>
            {
                (swapi) => {
                    return(
                        <ItemDetails
                            getData = {swapi.getPerson}
                            getImgUrl = {swapi.getPersonImgUrl} 
                            activeItem = {activeItem} >
                                <Record field='gender' label='Gender' />
                                <Record field='eyeColor' label='Eye Color' />
                        </ItemDetails>
                    )
                }
            }
        </SSConsumer>
        
    )

}

const PlanetDetails = ({activeItem}) => {

    return (
       <SSConsumer>
           {
               (swapi) => {
                   return(

                    <ItemDetails
                        getData = {swapi.getPlanet}
                        getImgUrl = {swapi.getPlanetImgUrl} 
                        activeItem = {activeItem} >
                            <Record field='population' label='Population' />
                            <Record field='rotationPeriod' label='Rotation Period' />
                            <Record field='diameter' label='Diameter' />
                    </ItemDetails>

                   );
               }
           }
       </SSConsumer>
    )
    
}

const StarshipDetails = ( {activeItem} ) => {
    
    return (
        <SSConsumer>
            {
                (swapi) => {
                    return(
                        <ItemDetails
                            getData = {swapi.getStarship}
                            getImgUrl = {swapi.getStarshipImgUrl} 
                            activeItem = {activeItem} >
                                <Record field='model' label='Model' />
                                <Record field='length' label='Length' />
                                <Record field='costInCredits' label='Cost' />
                        </ItemDetails>
                    )
                }
            }
        </SSConsumer>
        
    )
    
}

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}