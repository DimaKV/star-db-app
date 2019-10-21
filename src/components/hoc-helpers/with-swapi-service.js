import React from 'react';
import {SSConsumer} from '../swapi-service-context/';

//const swapi = new SwapiService();

const withSS = (Wrapped, mapMethodsToProps) => {
    
    return (props) => {
        return(
            <SSConsumer>
                {
                    (swapi) => {                        
                        const serviceProps = mapMethodsToProps(swapi);                        
                        return <Wrapped {...props} {...serviceProps}/>
                    }
                }
            </SSConsumer>
        );
    }
}

export default withSS;