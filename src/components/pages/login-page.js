import React from 'react';
import {Redirect} from 'react-router-dom';

const LoginPage = ( {isLogged, onLoging} ) => {

    if (isLogged) return <Redirect to='/' />

    return(
        <div className='jumbotron'>
            <h3>Login please</h3>
            <button className="btn btn-primary" onClick = {onLoging}>Login</button>
        </div>
    )
}

export default LoginPage;