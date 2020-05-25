const RadiusPieConfig = (data) => {
    return {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: 'Number of detected classes'
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'Count: <b>{point.y}</b><br/>'
        },
        series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'classes',
            data: data.map(item => {
                return {
                    name: item.classType,
                    y: item.count,
                    z: 100
                }
            })
        }]
    };
};

const ScatterConfig = (data) => {
    return {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Avarage Height Versus Avarage Width'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Width'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'Height: {point.x} px, Width: {point.y} px'
                }
            }
        },
        series: data.map(item => {
            return {
                name: item.classType,
                data: [[item.height, item.width]]
            }
        })
    };
};

const ScatterCenterConfig = (data) => {
    return {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Last 30 Items Center Offset'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Width'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'X: {point.x} px, Y: {point.y} px'
                }
            }
        },
        series:
            Object.keys(data).map(key => {
                return {
                    name: key,
                    data: data[key]
                };
            })
    };
};

module.exports = {
    RadiusPieConfig,
    ScatterConfig,
    ScatterCenterConfig,
};