
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import auth from '../../utils/auth';
import PATHS from '../../constants/PATHS';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={props => {
            return auth.isAuthenticated ? <Redirect to={PATHS.INDEX} /> : <Component {...props} />
        }}
    />
);

export default PrivateRoute;