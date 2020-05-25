import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { signInWatcher, signInNull } from '../../actions/signInAction';

class SignIn extends Component {

    componentDidMount() {
        if (this.props.success !== null) {
            this.props.signInNull();
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const { email, password } = values;
                    const { signInWatcher, history } = this.props;
                    signInWatcher({
                        email,
                        password,
                        history
                    });
                }}
            >
                {() => {
                    const { message, success } = this.props;
                    return (
                        <Grid xs={10} md={10} item className='mg_0_auto'>
                            <Paper xs={10} md={10} className='mg_0_auto bg'>
                                <Form className='sign_up_form'>
                                    <div className='sign_up_div'><h2>Sign In</h2></div>
                                    <div>
                                        <Field fullWidth={true} disabled={false} type="email" name="email" label="E-mail" component={TextField} />
                                    </div>
                                    <div>
                                        <Field fullWidth={true} disabled={false} type="password" name="password" label="Password" component={TextField} />
                                    </div>
                                    {!success ? <div style={{ color: '#ff00cf' }}>{message}</div> : null}
                                    <Button type="submit" className='btn_sign mg_top_20' variant="contained" color="primary">Submit</Button>
                                </Form>
                            </Paper>
                        </Grid>
                    );
                }}
            </Formik>
        );
    }
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is required')
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signInWatcher,
        signInNull
    }, dispatch);
};

const mapStateToProps = ({ signInState }) => ({
    message: signInState.message,
    success: signInState.success
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);