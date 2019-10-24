import React from 'react';



import ItemList from '../item-list';
import {withData, withSS} from '../hoc-helpers';



const withChildFn = (Wrapped, fn) => {
    return (props) =>{
        return( 
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    }
}

const renderName = (item) => `${item.name} (${item.birthYear})`;
const renderStarship = (item) => `${item.name} (${item.model})`;
const renderPlanet = (item) => `${item.name} (${item.diameter})`;


const mapPersonMethodsToProps = (swapi) => {
    return {
        getData: swapi.getPeople
    }
}

const mapStarshipMethodsToProps = (swapi) => {
    return {
        getData: swapi.getAllStarships
    }
}

const mapPlanetMethodsToProps = (swapi) => {
    return {
        getData: swapi.getAllPlanets
    }
}

const PersonList = withSS(
                    withData( withChildFn(ItemList, renderName)
                ), mapPersonMethodsToProps
);
const StarshipList = withSS(
                withData( withChildFn(ItemList, renderStarship), mapStarshipMethodsToProps)
);
const PlanetList = withSS(
                withData( withChildFn(ItemList, renderPlanet), mapPlanetMethodsToProps)
);


export {
    PersonList,
    StarshipList,
    PlanetList
}