import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import StringData from '../context/StringData';

function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth();
    const Name = localStorage.getItem(StringData.FirstName);
    return (
        <Route
            {...rest}
            render={props => {
                return Name ? <Component {...props} /> : <Redirect to='/signin' />
            }}
        >
            
        </Route>
    )
}

export default PrivateRoute
