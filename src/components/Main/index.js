import React, { Component } from 'react';

import SignIn from '../SignIn';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import main from '../../static/images/main.jpg';

class Main extends Component {

    render() {
        return (
            <Grid container={true} justify="space-around">
                <Grid item={true} xs={10} md={5}>
                    <SignIn {...this.props} />
                </Grid>
                <Grid item={true} xs={10} md={5}>
                    <Card className='card_photo'>
                        <CardActionArea>
                            <CardMedia
                                className="main_photo"
                                component="img"
                                alt="Detector"
                                image={main}
                                title="Detector"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Detection Notifier
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    App which allow you get stats from detection!
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        );
    };
};

export default Main;