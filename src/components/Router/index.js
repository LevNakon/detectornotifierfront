
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PATHS from '../../constants/PATHS';
import auth from '../../utils/auth';

import Main from '../Main';
import SignUp from '../SignUp';
import ObjectDetection from '../ObjectDetection';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={PATHS.INDEX} render={() => (
                    auth.isAuthenticated ? <ObjectDetection /> : <Main />
                )} />
                <Route exact path={PATHS.SIGNUP} component={SignUp} />
            </Switch>
        );
    }
}

export default Router;