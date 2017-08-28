var app = angular.module('chirpApp', ['ngRoute', 'ngAudio', 'ngResource']);

app.run(function($rootScope, $http) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';

    $rootScope.signout = function() {
        $http.get('/auth/signout');

        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    };
});



app.controller('audioController', function($scope, ngAudio) {

    $scope.convert = function() {
        var audioOutput = document.getElementById("audioOutput");
        if (audioOutput.value == "Convertendo para .mp3") {
            console.log("mp3");

            // Decoding .wav
            var sampleRate = 0;
            var length = 0;
            var request = new AudioFileRequest('sounds/piano_1.wav', false);
            request.onSuccess = getAudioStats;
            request.send();

            var trackBufferLeft = new Float32Array(length);
            var trackBufferRight = new Float32Array(length);
            var request = new AudioFileRequest('sounds/piano_1.wav', false);
            request.onSuccess = printInfo;
            request.send();

            function getAudioStats(decoded) {
                sampleRate = decoded.sampleRate;
                length = decoded.length
            }

            function printInfo(decoded) {
                for (jj = 0; jj < decoded.length; jj++) {
                    //First Channel
                    trackBufferLeft[jj] = decoded.channels[0][jj];
                    //First Channel
                    trackBufferRight[jj] = +decoded.channels[1][jj];
                }
            }


            // Encoding .mp3
            window.URL = window.URL || window.webkitURL;
            encoder = new Mp3LameEncoder(sampleRate, 64);
            encoder.encode([trackBufferLeft, trackBufferRight]);


            // Saving and downloading mp3 file
            msieversion();

            function msieversion() {
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                if (msie > 0) {
                    // If Internet Explorer, return version number
                    alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
                    // IE10
                    window.navigator.msSaveOrOpenBlob(blobMp3, "MusicScore.mp3");
                    var req = new XMLHttpRequest();
                    req.open('GET', URL.createObjectURL(blobMp3), false);
                    req.onload = function() { /* ... */ };
                    eq.send(null);
                } else {
                    // If another browser, return 0
                    var blobMp3 = new Blob([encoder.finish()], { type: "audio/mpeg3" });
                    saveAs(blobMp3, "music.mp3");
                }

                return false;
            }
        }
    }
});


app.config(function($routeProvider) {
    $routeProvider
    //the timeline display
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        //the login display
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'authController'
        })
        //the signup display
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'authController'
        })
        .when('/record', {
            templateUrl: 'main.html',
            controller: 'mainController'
        });
});





// appends an audio element to playback and download recording
function createAudioElement(blobUrl) {
    const downloadEl = document.createElement('a');
    downloadEl.style = 'display: block';
    downloadEl.innerHTML = 'download';
    downloadEl.download = 'audio.mp3';
    downloadEl.href = blobUrl;
    const audioEl = document.createElement('audio');
    audioEl.controls = true;
    const sourceEl = document.createElement('source');
    sourceEl.src = blobUrl;
    sourceEl.type = 'audio/mp3';
    audioEl.appendChild(sourceEl);
    document.body.appendChild(audioEl);
    document.body.appendChild(downloadEl);
}

function exportWAV(type) {
    var bufferL = mergeBuffers(recBuffersL, recLength);
    //var bufferR = mergeBuffers(recBuffersR, recLength);
    //var interleaved = interleave(bufferL, bufferR);
    //var dataview = encodeWAV(interleaved);
    var dataview = encodeWAV(bufferL);
    var audioBlob = new Blob([dataview], { type: type });

    this.postMessage(audioBlob);
}

function encodeWAV(samples) {
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);
    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 32 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    //view.setUint16(22, 2, true); /*STEREO*/
    view.setUint16(22, 1, true); /*MONO*/
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    //view.setUint32(28, sampleRate * 4, true); /*STEREO*/
    view.setUint32(28, sampleRate * 2, true); /*MONO*/
    /* block align (channel count * bytes per sample) */
    //view.setUint16(32, 4, true); /*STEREO*/
    view.setUint16(32, 2, true); /*MONO*/
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);

    return view;
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

function saveMp3File() {
    window.location.href = "index.php ? uid =" + blobMp3;
}

function playAudioTracks() {
    var playTime = 0;
    var index = 0;
}