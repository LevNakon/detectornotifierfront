import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { signUpWatcher, signUpNull } from '../../actions/signUpAction';

import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class SignUp extends Component {

    componentDidMount() {
        if (this.props.success !== null) {
            this.props.signUpNull();
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    cpassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const { firstName, lastName, email, password } = values;
                    const { signUpWatcher, history } = this.props;
                    signUpWatcher({
                        firstName,
                        lastName,
                        email,
                        password,
                        history
                    });
                }}
            >
                {({ errors, touched }) => {
                    const { message, success } = this.props;
                    return (<Grid xs={10} md={6} item className='mg_0_auto'>
                        <Paper xs={10} md={6} className='mg_0_auto bg'>
                            <Form className='sign_up_form'>
                                <div className='sign_up_div'><h2>Sign Up</h2></div>
                                <div>
                                    <Field fullWidth={true} disabled={false} type="text" name="firstName" label="First Name" component={TextField} />
                                </div>
                                <div>
                                    <Field fullWidth={true} disabled={false} type="text" name="lastName" label="Last Name" component={TextField} />
                                </div>
                                <div>
                                    <Field fullWidth={true} disabled={false} type="email" name="email" label="E-mail" component={TextField} />
                                </div>
                                <div>
                                    <Field fullWidth={true} disabled={false} type="password" name="password" label="Password" component={TextField} />
                                </div>
                                <div>
                                    <Field fullWidth={true} disabled={false} type="password" name="cpassword" label="Confirm Password" component={TextField} />
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
    firstName: Yup.string().min(3, 'First Name must be 3 characters or longer').required('First Name is required'),
    lastName: Yup.string().min(3, 'Last Name must be 3 characters or longer').required('Last Name is required'),
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is required'),
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signUpWatcher,
        signUpNull
    }, dispatch);
};

const mapStateToProps = ({ signUpState }) => ({
    message: signUpState.message,
    success: signUpState.success,
    userId: signUpState.userId
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);