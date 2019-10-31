import React from 'react';
import {Redirect} from 'react-router-dom';

const SecretPage = ( {isLogged, onLogout} ) => {

    const info = (
        <div className='jumbotron'>
            <h2>Уou know all secrets!</h2>
            <button className="btn btn-info" onClick={onLogout}>Logout</button>
        </div>
    )

    return isLogged ? info : <Redirect to='/login' /> 
}

export default SecretPage;