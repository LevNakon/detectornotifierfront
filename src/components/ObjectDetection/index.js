import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import Highcharts from 'highcharts';
import variablePie from "highcharts/modules/variable-pie";
import HighchartsReact from "highcharts-react-official";

import {
  startStreaming,
  resultStreaming,
  listWithCountsStreaming,
  sendReqForListWithCounts,
} from '../../utils/socket';
import auth from '../../utils/auth';
import { RadiusPieConfig, ScatterConfig, ScatterCenterConfig } from '../../constants/HIGHCHARTS';
import {
  Paper,
  Container,
  Input,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
  CardMedia,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

import doggy from '../../static/images/dogs.jpg';

variablePie(Highcharts);

class ObjectDetection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      btnDeviceId: null,
      model: null,
      width: 300,
      height: 300,
      streamOn: false,
      location: 'STATIC_LOCATION',
      isLocationSet: true,
      listOfLastTen: [],
      listWithCounts: [],
      interval: null,
      lastStats: []
    }

    resultStreaming((itemDetected) => {
      let list = this.state.listOfLastTen;
      if (list.length >= 10) {
        let newArray = list.slice(1, 10);
        this.setState({
          listOfLastTen: [...newArray, itemDetected],
        });
      } else {
        this.setState({
          listOfLastTen: [...list, itemDetected],
        });
      }
    });

    listWithCountsStreaming((listWithCounts, lastStats) => {
      this.setState({
        listWithCounts,
        lastStats
      });
      this.chart = Highcharts.chart("pie-chart-profile", RadiusPieConfig(listWithCounts));
    });
  }

  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (prevState.streamOn === false && this.state.streamOn === true) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const webCamPromise = navigator.mediaDevices
          .getUserMedia({
            video: true
          })
          .then((stream) => {
            window.stream = stream;
            this.videoRef.current.srcObject = stream;

            navigator.mediaDevices
              .enumerateDevices()
              .then((devices) => {
                devices
                  .filter((device) => device.kind === "videoinput")
                  .forEach((device) => {
                    this.setState({
                      btnDeviceId: (
                        <button onClick={() => this.changeDevice(device.deviceId)}>
                          {device.label}
                        </button>
                      )
                    })
                  })
              });

            return new Promise((resolve, reject) => {
              this.videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            });
          });

        const modelPromise = cocoSsd.load();

        Promise.all([modelPromise, webCamPromise])
          .then((values) => {
            this.setState({
              model: 1,
            })
            this.detectFrame(this.videoRef.current, values[0]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  detectFrame = (video, model) => {
    model.detect(video)
      .then((predictions) => {
        this.renderPredictions(predictions);

        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      });
  }

  renderPredictions = (predictions) => {
    if (this.canvasRef.current) {
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Font options
      const font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";
      const offset = 70;

      predictions.forEach((prediction) => {
        const x = prediction.bbox[0] - offset;
        const y = prediction.bbox[1] - offset;
        const width = prediction.bbox[2] - offset;
        const height = prediction.bbox[3] - offset;

        // Draw the bounding box
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        // Draw the label background
        ctx.fillStyle = "#00FFFF";

        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);

        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });

      predictions.forEach((prediction) => {
        const x = prediction.bbox[0] - offset;
        const y = prediction.bbox[1] - offset;

        // Draw the text last to ensure it's on top
        ctx.fillStyle = "#000000";
        if (this.state.streamOn) {
          startStreaming({
            email: auth.email(),
            location: this.state.location,
            classType: prediction.class,
            width: prediction.bbox[2],
            height: prediction.bbox[3],
            xCenter: prediction.bbox[0] - offset + (prediction.bbox[2] - offset) / 2,
            yCenter: prediction.bbox[1] - offset + (prediction.bbox[3] - offset) / 2,
            time: Date.now().toString()
          });
        }

        ctx.fillText(prediction.class, x, y);
      });
    }
  }

  /* Change facing mode */
  changeFacingMode = (facingMode) => {
    if (this.videoRef.current.srcObject) {
      this.videoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());

      this.videoRef.current.srcObject = null;
    }

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: facingMode,
        }
      })
      .then((stream) => this.videoRef.current.srcObject = stream);
  }

  /* Change device */
  changeDevice = (deviceId) => {
    if (this.videoRef.current.srcObject) {
      this.videoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());

      this.videoRef.current.srcObject = null;
    }

    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: deviceId,
        }
      })
      .then((stream) => this.videoRef.current.srcObject = stream);
  }

  streamingHandler = (data) => (event) => {
    if (data && !this.state.streamOn) {
      sendReqForListWithCounts({
        email: auth.email(),
        location: this.state.location,
      });
      let interval = setInterval(() => {
        sendReqForListWithCounts({
          email: auth.email(),
          location: this.state.location,
        });
      }, 10 * 1000);
      this.setState({
        streamOn: data,
        interval
      });
    } else if (!data && this.state.streamOn) {
      clearInterval(this.state.interval);
      sendReqForListWithCounts({
        email: auth.email(),
        location: this.state.location,
      });
      this.setState({
        streamOn: data,
        interval: null
      });
    }
  };

  handleLocation = (event) => {
    event.preventDefault();
    this.setState({
      location: event.currentTarget.value
    })
  };

  handleLocationSet = (event) => {
    this.setState({
      isLocationSet: true
    });
  };

  render() {
    const { streamOn, location, isLocationSet, listOfLastTen, listWithCounts, lastStats } = this.state;
    return (
      <div className="App">
        <Container>
          <div className='location-detection'>
            {/* <Paper elevation={3} className='paper'>
              <p className='text-detection'>Choose location to check your history or start real time object detection</p>
              <FormControl className='input-detection'>
                <InputLabel>Write new location</InputLabel>
                <Input value={location} onChange={this.handleLocation} />
              </FormControl>
              <FormControl className='input-detection'>
                <InputLabel>Choose existing location</InputLabel>
                <Select defaultValue=''>
                </Select>
              </FormControl>
              <Button variant="contained" color='primary' className='set-location' onClick={this.handleLocationSet}>Set location</Button>
            </Paper> */}
            <Paper elevation={3} className='paper'>
              {streamOn ?
                <React.Fragment>
                  <div className='preview'>
                    <video
                      autoPlay
                      playsInline
                      muted
                      ref={this.videoRef}
                      width={this.state.width}
                      height={this.state.height}
                      className="fixed"
                    />
                    <canvas
                      ref={this.canvasRef}
                      width={this.state.width}
                      height={this.state.height}
                      className="fixed"
                    />
                  </div>
                  {this.state.btnDeviceId && (
                    <div class="btn-device-container">
                      <p>
                        Click button below to access back camera
                </p>
                      <div id="btnDeviceIdContainer">
                        {this.state.btnDeviceId}
                      </div>
                    </div>
                  )}

                </React.Fragment>
                : <CardMedia
                  className="doggy_photo"
                  component="img"
                  alt="Doggy"
                  image={doggy}
                  title="Doggy"
                />}
              {!this.state.model && this.state.streamOn && (
                <h2>
                  Loading model...
                </h2>
              )}
              <div className='streaming'>
                <Button
                  variant="contained"
                  disabled={!isLocationSet ? true : false}
                  color='primary'
                  onClick={this.streamingHandler(true)}
                >Start Streaming</Button>
                <Button
                  variant="contained"
                  color='primary'
                  disabled={!isLocationSet ? true : false}
                  onClick={this.streamingHandler(false)}
                >Stop Streaming</Button>
              </div>
            </Paper>
          </div>
        </Container>
        <div className={`${this.state.streamOn ? "opacity_1" : "opacity_0"}`}>
          <Container>
            <div>
              <h1>Classes Log</h1>
              <Paper elevation={3} className='list-logs'>
                <ul className='last-logs'>
                  {
                    listOfLastTen.map((item) => {
                      return <li>{`Class: ${item.classType} ${new Date(Number(item.time)).toISOString()}`}</li>;
                    })
                  }
                </ul>
              </Paper>
            </div>
          </Container>
          <Container>
            <div>
              <h1>Variable Radius Pie</h1>
              <Paper elevation={3} className='list-logs'>
                <div className="chart-toggle-display" id="pie-chart-profile" />
              </Paper>
            </div>
          </Container>
          <Container>
            <h1>Stats Table</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Average Width</TableCell>
                    <TableCell>Averege Height</TableCell>
                    <TableCell>Is Important</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listWithCounts.map(item => (
                    <TableRow key={item.classType}>
                      <TableCell>{item.classType}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.width}</TableCell>
                      <TableCell>{item.height}</TableCell>
                      <TableCell>false</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <Container>
            <h1>Scatter Chart</h1>
            <HighchartsReact
              highcharts={Highcharts}
              options={ScatterConfig(listWithCounts)}
            />
          </Container>
          <Container>
            <h1>Scatter Chart</h1>
            <HighchartsReact
              highcharts={Highcharts}
              options={ScatterCenterConfig(lastStats)}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ObjectDetection);