import React from 'react';

import { StarshipList} from '../sw-components';

function StarshipPage(props) {
   
    console.log('props', props);       

    return(
        <StarshipList 
            onItemSelected = { (id) => {
                props.history.push(id);
            } } />
    );
    
}

export default StarshipPage;
