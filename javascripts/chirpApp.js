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



app.controller('audioDemo', function($scope, ngAudio) {
    $scope.audio = ngAudio.load('som.wav');
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

app.directive('shortcut', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link: function postLink(scope, iElement, iAttrs) {
            jQuery(document).on('keypress', function(e) {
                scope.$apply(scope.keyPressed(e));
            });
        }
    };
});

app.factory('postService', function($resource) {
    return $resource('/api/posts/:id');
});

app.controller('pianoController', function($scope) {
    var img = new Image();
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
    img.src = "views/piano.jpg";
    var alpha = 0, /// current alpha value
        delta = 0.1; /// delta = speed
    function fadeBlackRectangle(x, y, w, h, r, g, b) {
        var steps = 30,
            dr = (0 - r) / steps,
            dg = (0 - g) / steps,
            db = (0 - b) / steps,
            i = 0,
            interval = setInterval(function() {
                ctx.fillStyle = 'rgb(' + Math.round(r + dr * i) + ',' +
                    Math.round(g + dg * i) + ',' +
                    Math.round(b + db * i) + ')';
                ctx.fillRect(x, y, w, h);
                i++;
                if (i === steps) {
                    clearInterval(interval);
                }
            }, 30);
    }

    function fadeWhiteRectangle(x, y, w, h, r, g, b) {
        var steps = 30,
            dr = (255 - r) / steps,
            dg = (255 - g) / steps,
            db = (255 - b) / steps,
            i = 0,
            interval = setInterval(function() {
                ctx.fillStyle = 'rgb(' + Math.round(r + dr * i) + ',' +
                    Math.round(g + dg * i) + ',' +
                    Math.round(b + db * i) + ')';
                ctx.fillRect(x, y, w, h);
                i++;
                if (i === steps) {
                    clearInterval(interval);
                }
            }, 30);
    }
    // Draws piano keys pressed
    $scope.keyPressed = function(e) {
        $scope.keyCode = e.which;

        switch ($scope.keyCode) {
            case 113:
                //'q' - UNIQUE KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(0, 0, 24, 150);
                fadeWhiteRectangle(0, 0, 24, 150, 123, 213, 50);
                break;
            case 119:
                //'w' - SPECIAL KEY L
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(25, 0, 17, 150);
                ctx.fillRect(42, 101, 8, 150);
                fadeWhiteRectangle(25, 0, 17, 150, 123, 213, 50);
                fadeWhiteRectangle(42, 101, 8, 150, 123, 213, 50);
                break;
            case 51:
                //'3' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(42, 0, 17, 101);
                fadeBlackRectangle(42, 0, 17, 101, 123, 213, 50);
                break;
            case 101:
                //'e' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(59, 0, 8, 101);
                ctx.fillRect(51, 101, 24, 150);
                fadeWhiteRectangle(59, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(51, 101, 24, 150, 123, 213, 50);
                break;
            case 52:
                //'4' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(67, 0, 17, 101);
                fadeBlackRectangle(67, 0, 17, 101, 123, 213, 50);
                break;
            case 114:
                //'r' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(84, 0, 8, 101);
                ctx.fillRect(76, 101, 24, 150);
                fadeWhiteRectangle(84, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(76, 101, 24, 150, 123, 213, 50);
                break;
            case 53:
                //'5' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(92, 0, 17, 101);
                fadeBlackRectangle(92, 0, 17, 101, 123, 213, 50);
                break;
            case 116:
                //'t' - SPECIAL KEY J
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(109, 0, 16, 101);
                ctx.fillRect(101, 101, 24, 150);
                fadeWhiteRectangle(109, 0, 16, 101, 123, 213, 50);
                fadeWhiteRectangle(101, 101, 24, 150, 123, 213, 50);
                break;
            case 121:
                //'y' - SPECIAL KEY L
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(126, 0, 16, 150);
                ctx.fillRect(126, 101, 24, 150);
                fadeWhiteRectangle(126, 0, 16, 150, 123, 213, 50);
                fadeWhiteRectangle(126, 101, 24, 150, 123, 213, 50);
                break;
            case 55:
                //'7' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(142, 0, 17, 101);
                fadeBlackRectangle(142, 0, 17, 101, 123, 213, 50);
                break;
            case 117:
                //'u' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(159, 0, 8, 101);
                ctx.fillRect(151, 101, 24, 150);
                fadeWhiteRectangle(159, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(151, 101, 24, 150, 123, 213, 50);
                break;
            case 56:
                //'8' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(167, 0, 17, 101);
                fadeBlackRectangle(167, 0, 17, 101, 123, 213, 50);
                break;
            case 105:
                //'i' - SPECIAL KEY J
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(184, 0, 16, 101);
                ctx.fillRect(176, 101, 24, 150);
                fadeWhiteRectangle(184, 0, 16, 101, 123, 213, 50);
                fadeWhiteRectangle(176, 101, 24, 150, 123, 213, 50);
                break;
            case 111:
                //'o' - SPECIAL KEY L
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(201, 0, 16, 150);
                ctx.fillRect(201, 101, 24, 150);
                fadeWhiteRectangle(201, 0, 16, 150, 123, 213, 50);
                fadeWhiteRectangle(201, 101, 24, 150, 123, 213, 50);
                break;
            case 48:
                //'0' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(217, 0, 17, 101);
                fadeBlackRectangle(217, 0, 17, 101, 123, 213, 50);
                break;
            case 112:
                //'p' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(234, 0, 8, 101);
                ctx.fillRect(226, 101, 24, 150);
                fadeWhiteRectangle(234, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(226, 101, 24, 150, 123, 213, 50);
                break;
            case 45:
                //'-' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(242, 0, 17, 101);
                fadeBlackRectangle(242, 0, 17, 101, 123, 213, 50);
                break;
            case 122:
                //'z' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(259, 0, 8, 101);
                ctx.fillRect(251, 101, 24, 150);
                fadeWhiteRectangle(259, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(251, 101, 24, 150, 123, 213, 50);
                break;
            case 115:
                //'s' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(267, 0, 17, 101);
                fadeBlackRectangle(267, 0, 17, 101, 123, 213, 50);
                break;
            case 120:
                //'x' - SPECIAL KEY J
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(284, 0, 16, 101);
                ctx.fillRect(276, 101, 24, 150);
                fadeWhiteRectangle(284, 0, 16, 101, 123, 213, 50);
                fadeWhiteRectangle(276, 101, 24, 150, 123, 213, 50);
                break;
            case 99:
                //'c' - SPECIAL KEY L
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(301, 0, 16, 150);
                ctx.fillRect(301, 101, 24, 150);
                fadeWhiteRectangle(301, 0, 16, 150, 123, 213, 50);
                fadeWhiteRectangle(301, 101, 24, 150, 123, 213, 50);
                break;
            case 102:
                //'f' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(317, 0, 17, 101);
                fadeBlackRectangle(317, 0, 17, 101, 123, 213, 50);
                break;
            case 118:
                //'v' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(334, 0, 8, 101);
                ctx.fillRect(326, 101, 24, 150);
                fadeWhiteRectangle(334, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(326, 101, 24, 150, 123, 213, 50);
                break;
            case 103:
                //'g' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(342, 0, 17, 101);
                fadeBlackRectangle(342, 0, 17, 101, 123, 213, 50);
                break;
            case 98:
                //'b' - SPECIAL KEY J
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(359, 0, 16, 101);
                ctx.fillRect(351, 101, 24, 150);
                fadeWhiteRectangle(359, 0, 16, 101, 123, 213, 50);
                fadeWhiteRectangle(351, 101, 24, 150, 123, 213, 50);
                break;
            case 110:
                //'n' - SPECIAL KEY L
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(376, 0, 16, 150);
                ctx.fillRect(376, 101, 24, 150);
                fadeWhiteRectangle(376, 0, 16, 150, 123, 213, 50);
                fadeWhiteRectangle(376, 101, 24, 150, 123, 213, 50);
                break;
            case 106:
                //'j' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(392, 0, 17, 101);
                fadeBlackRectangle(392, 0, 17, 101, 123, 213, 50);
                break;
            case 109:
                //'m' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(409, 0, 8, 101);
                ctx.fillRect(401, 101, 24, 150);
                fadeWhiteRectangle(409, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(401, 101, 24, 150, 123, 213, 50);
                break;
            case 107:
                //'k' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(417, 0, 17, 101);
                fadeBlackRectangle(417, 0, 17, 101, 123, 213, 50);
                break;
            case 44:
                //',' - SPECIAL KEY T
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(434, 0, 8, 101);
                ctx.fillRect(426, 101, 24, 150);
                fadeWhiteRectangle(434, 0, 8, 101, 123, 213, 50);
                fadeWhiteRectangle(426, 101, 24, 150, 123, 213, 50);
                break;
            case 108:
                //'l' - BLACK KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(442, 0, 17, 101);
                fadeBlackRectangle(442, 0, 17, 101, 123, 213, 50);
                break;
            case 46:
                //'.' - SPECIAL KEY J
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(459, 0, 16, 101);
                ctx.fillRect(451, 101, 24, 150);
                fadeWhiteRectangle(459, 0, 16, 101, 123, 213, 50);
                fadeWhiteRectangle(451, 101, 24, 150, 123, 213, 50);
                break;
            case 59:
            case 113:
                //';' - UNIQUE KEY
                ctx.beginPath();
                ctx.fillStyle = 'rgb(123, 213, 50)';
                ctx.fillRect(476, 0, 24, 150);
                fadeWhiteRectangle(476, 0, 24, 150, 123, 213, 50);
                break;
        }
    };

});



app.controller('MainCtrl', function($scope, $rootScope, ngAudio) {
    //$scope.sound = ngAudio.load("sounds/mySound.mp3"); // returns NgAudioObject
    $scope.name = 'World';
    $scope.keyCode = "";


    //Maximum Number of notes
    var numOfNotes = 10;
    //Getting played time
    var timeBuffer = new Int32Array(numOfNotes);
    //Getting notes played
    var noteBuffer = new Int32Array(numOfNotes);
    //Time auxiliar
    var timeInt = new Date();
    //Auxiliar for recoding and stopping
    $scope.flag = true;
    //Auxiliar flag to stop playing sound
    var stopAudioFlag = false;
    //Auxiliar flag for stop recording
    var flagAux = true;
    //Offset time to start recording at right moment [ms]
    var timeOffSet = 0;
    //Total time to record in seconds
    var durationTime = 5;
    $scope.remainingTime = durationTime;


    //Loading wav sound files
    lowLag.init();
    for (ii = 1; ii <= 68; ii++) {
        lowLag.load('sounds/piano_' + ii + '.wav', 'piano_' + ii);
    }
    //Count to access audio file
    var count = 0;
    // Initializing variables
    var request = new AudioFileRequest('sounds/piano_1.wav', false);
    request.onSuccess = getSampleRate;
    request.send();
    var length = durationTime * sampleRate;

    var trackBuffer = new Float32Array(length);
    var trackBuffer2 = new Float32Array(length);

    // Getting wav sounds data
    function printInfo(decoded) {
        for (jj = 0; jj < decoded.length; jj++) {
            //First Channel
            trackBuffer[timeOffSet + jj] = (trackBuffer[timeOffSet + jj] + decoded.channels[0][jj]) / 2;
            //First Channel
            trackBuffer2[timeOffSet + jj] = (trackBuffer2[timeOffSet + jj] + decoded.channels[1][jj]) / 2;
        }
    }
    // Getting wav audio sample rate
    function getSampleRate(decoded) {
        sampleRate = decoded.sampleRate;
    }

    function saveAudioTrack() {
        // Starting to update trackBuffer with notes
        for (ii = 0; ii < timeBuffer.length; ii++) {
            timeOffSet = Math.floor((timeBuffer[ii] / 1000) * sampleRate);
            switch (noteBuffer[ii]) {
                case 113:
                    //'q'
                    request = new AudioFileRequest('sounds/piano_1.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 119:
                    //'w'
                    request = new AudioFileRequest('sounds/piano_2.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 51:
                    //'3'
                    request = new AudioFileRequest('sounds/piano_3.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 101:
                    //'e'
                    request = new AudioFileRequest('sounds/piano_4.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 52:
                    //'4'
                    request = new AudioFileRequest('sounds/piano_5.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 114:
                    //'r'
                    request = new AudioFileRequest('sounds/piano_6.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 53:
                    //'5'
                    request = new AudioFileRequest('sounds/piano_7.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 116:
                    //'t'
                    request = new AudioFileRequest('sounds/piano_8.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 121:
                    //'y'
                    request = new AudioFileRequest('sounds/piano_9.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 55:
                    //'7'
                    request = new AudioFileRequest('sounds/piano_10.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 117:
                    //'u'
                    request = new AudioFileRequest('sounds/piano_11.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 56:
                    //'8'
                    request = new AudioFileRequest('sounds/piano_12.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 105:
                    //'i'
                    request = new AudioFileRequest('sounds/piano_13.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 111:
                    //'o'
                    request = new AudioFileRequest('sounds/piano_14.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 48:
                    //'0'
                    request = new AudioFileRequest('sounds/piano_15.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 112:
                    //'p'
                    request = new AudioFileRequest('sounds/piano_16.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 45:
                    //'-'
                    request = new AudioFileRequest('sounds/piano_17.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 122:
                    //'z'
                    request = new AudioFileRequest('sounds/piano_18.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 115:
                    //'s'
                    request = new AudioFileRequest('sounds/piano_19.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 120:
                    //'x'
                    request = new AudioFileRequest('sounds/piano_20.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 99:
                    //'c'
                    request = new AudioFileRequest('sounds/piano_21.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 102:
                    //'f'
                    request = new AudioFileRequest('sounds/piano_22.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 118:
                    //'v'
                    request = new AudioFileRequest('sounds/piano_23.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 103:
                    //'g'
                    request = new AudioFileRequest('sounds/piano_24.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 98:
                    //'b'
                    request = new AudioFileRequest('sounds/piano_25.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 110:
                    //'n'
                    request = new AudioFileRequest('sounds/piano_26.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 106:
                    //'j'
                    request = new AudioFileRequest('sounds/piano_27.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 109:
                    //'m'
                    request = new AudioFileRequest('sounds/piano_28.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 107:
                    //'k'
                    request = new AudioFileRequest('sounds/piano_29.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 44:
                    //','
                    request = new AudioFileRequest('sounds/piano_30.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 108:
                    //'l'
                    request = new AudioFileRequest('sounds/piano_31.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 46:
                    //'.'
                    request = new AudioFileRequest('sounds/piano_32.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
                case 59:
                    //';'
                    request = new AudioFileRequest('sounds/piano_33.wav', false);
                    request.onSuccess = printInfo;
                    request.send();
                    break;
            }
        }
        //Save Wav file
        // Stereo
        var channels = 2;
        // Create an empty two second stereo buffer at the
        // sample rate of the AudioContext
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var frameCount = sampleRate * durationTime;

        var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, sampleRate);
        // Fill the buffer with white noise;
        // just random values between -1.0 and 1.0
        for (var channel = 0; channel < channels; channel++) {
            // This gives us the actual array that contains the data
            var nowBuffering = myArrayBuffer.getChannelData(channel);
            for (ii = 0; ii < length; ii++) {
                nowBuffering[ii] = trackBuffer[ii];
            }
        }
        //encodeWAV(trackBuffer);


        window.URL = window.URL || window.webkitURL;
        encoder = new Mp3LameEncoder(sampleRate, 64);
        encoder.encode([trackBuffer, trackBuffer2]);


        msieversion();

        function msieversion() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            if (msie > 0) // If Internet Explorer, return version number
            {
                alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
                // IE10
                window.navigator.msSaveOrOpenBlob(blobMp3, "MusicScore.mp3");
                var req = new XMLHttpRequest();
                req.open('GET', URL.createObjectURL(blobMp3), false);
                req.onload = function() { /* ... */ };
                req.send(null);
            } else // If another browser, return 0
            {
                var blobMp3 = new Blob([encoder.finish()], { type: "audio/mpeg3" });
                saveAs(blobMp3, "music.mp3");
            }

            return false;
        }



        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        var source = audioCtx.createBufferSource();

        // set the buffer in the AudioBufferSourceNode
        source.buffer = myArrayBuffer;
        source.loop = true;
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(audioCtx.destination);

        // start the source playing
        source.start();
    }

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
    // Sets which part of piano to use
    var slideFlag = false;

    // Playing Piano Sounds
    $scope.keyPressed = function(e) {
        $scope.keyCode = e.which;
        switch ($scope.keyCode) {
            case 65:
                // Slide to left piano part [default]
                slideFlag = false;
                break;
            case 68:
                // Slide to right piano part
                slideFlag = true;
                break;
            case 13:
                //'enter' Save track
                $scope.remainingTime = 0;
                break;
            case 32:
                //'space': start/stop recording
                if (flagAux) {
                    // Time Variable to compare with note played time
                    $scope.timeInt = new Date().getTime();
                    // Thread to play/pause recording
                    var x = window.setInterval(function() {
                        if ($scope.flag) {
                            //Recording is running
                            //Time CountDown
                            $scope.remainingTime = $scope.remainingTime - 1;
                            console.log("" + $scope.remainingTime);
                            if ($scope.remainingTime < 1) {
                                //Time is over, time to save the track
                                clearInterval(x);
                                saveAudioTrack();
                                $scope.remainingTime = durationTime;
                                flagAux = true;
                                $scope.flag = true;
                            }
                        } else {
                            clearInterval(x);
                            $scope.flag = true;
                        }
                    }, 1000);
                    flagAux = false;
                } else {
                    //Recording is paused
                    //Auxiliar if/else statement for pause/continue recording
                    // Saving offset time to start again in the right time    
                    timeOffSet = new Date().getTime() - $scope.timeInt;
                    flagAux = true;
                    $scope.flag = false;
                }
                break;
            case 113:
                //'q'
                //Note played time
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                //Note played
                noteBuffer[count] = 113;
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_1');
                } else {
                    //Left piano part
                    lowLag.play('piano_34');
                }
                break;
            case 119:
                //'w'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 119;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_2');
                } else {
                    //Left piano part
                    lowLag.play('piano_35');
                }
                break;
            case 51:
                //'3'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 51;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_3');
                } else {
                    //Left piano part
                    lowLag.play('piano_36');
                }
                break;
            case 101:
                //'e'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 101;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_4');
                } else {
                    //Left piano part
                    lowLag.play('piano_37');
                }
                break;
            case 52:
                //'4'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 52;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_5');
                } else {
                    //Left piano part
                    lowLag.play('piano_38');
                }
                break;
            case 114:
                //'r'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 114;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_6');
                } else {
                    //Left piano part
                    lowLag.play('piano_39');
                }
                break;
            case 53:
                //'5' 
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 53;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_7');
                } else {
                    //Left piano part
                    lowLag.play('piano_40');
                }
                break;
            case 116:
                //'t'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 116;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_8');
                } else {
                    //Left piano part
                    lowLag.play('piano_41');
                }
                break;
            case 121:
                //'y'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 121;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_9');
                } else {
                    //Left piano part
                    lowLag.play('piano_42');
                }
                break;
            case 55:
                //'7'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 55;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_10');
                } else {
                    //Left piano part
                    lowLag.play('piano_43');
                }
                break;
            case 117:
                //'u'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 117;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_11');
                } else {
                    //Left piano part
                    lowLag.play('piano_44');
                }
                break;
            case 56:
                //'8'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 56;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_12');
                } else {
                    //Left piano part
                    lowLag.play('piano_45');
                }
                break;
            case 105:
                //'i'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 105;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_13');
                } else {
                    //Left piano part
                    lowLag.play('piano_46');
                }
                break;
            case 111:
                //'o'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 111;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_14');
                } else {
                    //Left piano part
                    lowLag.play('piano_47');
                }
                break;
            case 48:
                //'0'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 48;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_15');
                } else {
                    //Left piano part
                    lowLag.play('piano_48');
                }
                break;
            case 112:
                //'p'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 112;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_16');
                } else {
                    //Left piano part
                    lowLag.play('piano_49');
                }
                break;
            case 45:
                //'-'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 45;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_17');
                } else {
                    //Left piano part
                    lowLag.play('piano_50');
                }
                break;
            case 122:
                //'z'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                timeBuffer[count] = 122;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_18');
                } else {
                    //Left piano part
                    lowLag.play('piano_51');
                }
                break;
            case 115:
                //'s'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 115;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_19');
                } else {
                    //Left piano part
                    lowLag.play('piano_52');
                }
                break;
            case 120:
                //'x'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 120;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_20');
                } else {
                    //Left piano part
                    lowLag.play('piano_53');
                }
                break;
            case 99:
                //'c'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 99;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_21');
                } else {
                    //Left piano part
                    lowLag.play('piano_54');
                }
                break;
            case 102:
                //'f'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 102;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_22');
                } else {
                    //Left piano part
                    lowLag.play('piano_55');
                }
                break;
            case 118:
                //'v'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 118;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_23');
                } else {
                    //Left piano part
                    lowLag.play('piano_56');
                }
                break;
            case 103:
                //'g'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 103;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_24');
                } else {
                    //Left piano part
                    lowLag.play('piano_57');
                }
                break;
            case 98:
                //'b'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 98;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_25');
                } else {
                    //Left piano part
                    lowLag.play('piano_58');
                }
                break;
            case 110:
                //'n'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 110;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_26');
                } else {
                    //Left piano part
                    lowLag.play('piano_59');
                }
                break;
            case 106:
                //'j'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 106;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_27');
                } else {
                    //Left piano part
                    lowLag.play('piano_60');
                }
                break;
            case 109:
                //'m'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 109;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_28');
                } else {
                    //Left piano part
                    lowLag.play('piano_61');
                }
                break;
            case 107:
                //'k'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 107;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_29');
                } else {
                    //Left piano part
                    lowLag.play('piano_62');
                }
                break;
            case 44:
                //','
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 44;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_30');
                } else {
                    //Left piano part
                    lowLag.play('piano_63');
                }
                break;
            case 108:
                //'l'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 108;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_31');
                } else {
                    //Left piano part
                    lowLag.play('piano_64');
                }
                break;
            case 46:
                //'.'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 46;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_32');
                } else {
                    //Left piano part
                    lowLag.play('piano_65');
                }
                break;
            case 59:
                //';'
                timeBuffer[count] = timeOffSet + new Date().getTime() - $scope.timeInt;
                noteBuffer[count] = 59;
                console.log("time " + timeBuffer[count]);
                if ($scope.flag) {
                    count = count + 1;
                }
                if (!slideFlag) {
                    //Left piano part
                    lowLag.play('piano_33');
                } else {
                    //Left piano part
                    lowLag.play('piano_66');
                }
                break;
        }
    };
});


app.controller('mainController', function($rootScope, $scope, postService) {
    $scope.posts = postService.query();
    $scope.newPost = { created_by: '', text: '', created_at: '' };

    $scope.post = function() {
        $scope.newPost.created_by = $rootScope.current_user;
        $scope.newPost.created_at = Date.now();
        postService.save($scope.newPost, function() {
            $scope.posts = postService.query();
            $scope.newPost = { created_by: '', text: '', created_at: '' };
        });
    };
    $scope.record = function() {};
});

app.controller('authController', function($scope, $rootScope, $http, $location) {
    $scope.user = { username: '', password: '' };
    $scope.error_message = '';

    $scope.login = function() {
        $http.post('/auth/login', $scope.user).success(function(data) {
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/');
        });
    };

    $scope.register = function() {
        $http.post('/auth/signup', $scope.user).success(function(data) {
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/');
        });
    };
});