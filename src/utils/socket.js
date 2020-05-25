import openSocket from 'socket.io-client';
const CONFIG = Object.freeze({
    URL: 'http://localhost:8080',
    START_STREAMING: 'START_STREAMING',
    STREAM_RESULT: 'STREAM_RESULT',
    LIST_WITH_COUNTS_REQ: 'LIST_WITH_COUNTS_REQ',
    LIST_WITH_COUNTS_RES: 'LIST_WITH_COUNTS_RES',
});
const socket = openSocket(CONFIG.URL, { transports: ['websocket'] });

socket.on('error', () => { });

function startStreaming(data) {
    socket.emit(CONFIG.START_STREAMING, data);
};

function resultStreaming(cb) {
    socket.on(CONFIG.STREAM_RESULT, ({ classesListByLocation, listWithCounts }) => {
        return cb(classesListByLocation, listWithCounts);
    });
};

function sendReqForListWithCounts(data) {
    socket.emit(CONFIG.LIST_WITH_COUNTS_REQ, data);
};


function listWithCountsStreaming(cb) {
    socket.on(CONFIG.LIST_WITH_COUNTS_RES, ({ listWithCounts, lastStats }) => {
        return cb(listWithCounts, lastStats);
    });
}

export {
    socket,
    startStreaming,
    resultStreaming,
    sendReqForListWithCounts, 
    listWithCountsStreaming,
};