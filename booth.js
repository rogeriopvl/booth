var booth = function(o) {
  'use strict';

  // default values
  if (!o.dims) { o.dims = [640, 480]; }
  if (!o.dims) { o.onReadyFail = function() {}; }

  var gum = (
		navigator.getUserMedia       ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia    ||
		navigator.oGetUserMedia      ||
		navigator.msieGetUserMedia   ||
		false
  );

  var isReady = false;

  var parentEl = document.createElement('div');
  document.body.appendChild(parentEl);
  parentEl.style.opacity = 0;
  parentEl.style.position = 'absolute';
  parentEl.style.left = '-1000px';
  parentEl.style.top = 0;
  
  var videoEl = document.createElement('video');
  videoEl.style.width  = o.dims[0] + 'px';
  videoEl.style.height = o.dims[1] + 'px';

  var canvasEl = document.createElement('canvas');
  canvasEl.setAttribute('width',  o.dims[0]);
  canvasEl.setAttribute('height', o.dims[1]);

  parentEl.appendChild(videoEl);

  var ctx = canvasEl.getContext('2d');

  var onStreamOk = function(stream) {
    if (navigator.mozGetUserMedia) {
      videoEl.mozSrcObject = stream;
    }
    else {
      var url = window.URL || window.webkitURL;
      videoEl.src = url ? url.createObjectURL(stream) : stream;
    }
    videoEl.play();
    isReady = true;
    o.onReadyFail(null);
  };
  
  var takePicture = function() {
    //parentEl.style.opacity = 1; // WITHOUT THIS MAY NOT WORK IN ALL BROWSERS?
    ctx.drawImage(videoEl, 0, 0, o.dims[0], o.dims[1]);
    setTimeout(function() {
      parentEl.style.opacity = 0;
    }, 0);
    return canvasEl.toDataURL('image/jpeg');
  };

  var onStreamErr = function(err) {
    o.onReadyFail(err);
  };
  
  if (!gum) {
    return o.onReadyFail('navigator.getUserMedia() not supported!');
  }

  gum.call(navigator, {video:true}, onStreamOk, onStreamErr);

  return {
    isReady:     function() { return isReady; },
    takePicture: takePicture
  };
};
