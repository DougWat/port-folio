"use strict";

var loadEnabled = false;
var musicPlaying = false;
var musicPaused = false;

var context = new(window.AudioContext || window.webkitAudioContext)();
var source;
var processor;
var analyser;
var xhr;
var speedVal = 0;
var musicStartTime = 0;
var startOffset = 0;
var musicCurrentTime = 0;
var musicTime = 0;
var musicLength = 0;

var recordTime = 0;
var curRecordTime = 0;

var maxDataPoints = 30;
var dataPointIndex = 0;
var dataPoints = [];

function initAudio(data) {
    source = context.createBufferSource();

    if (context.decodeAudioData) {
        context.decodeAudioData(data, function (buffer) {
            source.buffer = buffer;
            createAudio();
        }, function (e) {
            console.log(e);
        });
    } else {
        source.buffer = context.createBuffer(data, false /*mixToMono*/ );
        createAudio();
    }
}

function createAudio() {
    processor = context.createScriptProcessor(1024 /*bufferSize*/ , 1 /*num inputs*/ , 1 /*num outputs*/ );
    processor.onaudioprocess = processAudio;

    analyser = context.createAnalyser();

    source.connect(context.destination);
    source.connect(analyser);

    analyser.connect(processor);
    processor.connect(context.destination);

    console.log("done");
    musicLength = source.buffer.duration;
    recordTime = musicLength / maxDataPoints;

    for (var i = 0; i < maxDataPoints; i++) {
        dataPoints[i] = -1
    }
    game.state.callbackContext.done();
}

function startAudio() {
    musicStartTime = game.time.time;
    musicCurrentTime = musicStartTime;
    //console.log(context.currentTime);
    source.start(0);
    musicPlaying = true;
    setTimeout(disconnect, source.buffer.duration * 1000 + 3000);
}

function pause() {
    source.stop();
    // Measure how much time passed since the last pause.
    startOffset += context.currentTime - musicStartTime;
}

function continueAudio() {

    source.start(startOffset);
}

function disconnect() {
    source.noteOff(0);
    source.disconnect(0);
    processor.disconnect(0);
    analyser.disconnect(0);
}

function processAudio(e) {
    var freqByteData = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(freqByteData);

    var finalVal = 0;
    for (var i = 0; i < freqByteData.length; ++i) {

        var magnitude = freqByteData[i];
        finalVal += magnitude;
    }
    speedVal = finalVal;
    musicCurrentTime = game.time.time;
    musicTime = (musicCurrentTime - musicStartTime) / 1000;

    if (musicTime >= curRecordTime && musicPlaying && !musicPaused) {
        dataPoints[dataPointIndex] = speedVal;
        dataPointIndex++;
        curRecordTime += recordTime;
        console.log("Recorded: " + speedVal);
    }
}

function dropEvent(evt) {

    if (!loadEnabled) {
        return;
    }

    game.state.callbackContext.dragged();

    evt.stopPropagation();
    evt.preventDefault();

    var droppedFiles = evt.dataTransfer.files;

    var reader = new FileReader();

    reader.onload = function (fileEvent) {
        var data = fileEvent.target.result;
        initAudio(data);
    }
    reader.readAsArrayBuffer(droppedFiles[0]);
}

function handleResult() {
    if (xhr.readyState == 4 /* complete */ ) {
        switch (xhr.status) {
        case 200:
            /* Success */
            initAudio(request.response);
            break;
        default:
            break;
        }
        xhr = null;
    }
}

function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
}

var dropArea = document.getElementById('dropzone');
dropArea.addEventListener('drop', dropEvent, false);
dropArea.addEventListener('dragover', dragOver, false);