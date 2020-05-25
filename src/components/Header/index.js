
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import auth from '../../utils/auth';
import PATHS from '../../constants/PATHS';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
    constructor(props) {
        super(props)
    }

    handlerLogout = (e) => {
        auth.logout();
    }

    render() {
        const { location, history } = this.props;
        return (
            <AppBar position="static" className='header' style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Typography color="inherit">
                    <NavLink to={PATHS.INDEX} className='link_decoration'><h4>Detector</h4></NavLink>
                </Typography>
                {
                    !auth.isAuthenticated ? (location.pathname !== PATHS.SIGNUP ? <NavLink to={PATHS.SIGNUP}>
                        <Button className='btn_sign_up' variant="contained" color="secondary">
                            SIGN UP
                            </Button>
                    </NavLink> : null) :
                        <Button className='btn_sign_up' variant="contained" color="secondary" onClick={this.handlerLogout}>
                            Logout
                            </Button>
                }
            </AppBar>
        );
    }
};

export default withRouter(Header);