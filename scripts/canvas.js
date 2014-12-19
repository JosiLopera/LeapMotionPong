define([], function() {
  'use strict';

  var canvas  = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.width  = window.innerWidth - 10;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.top      = 0;
  canvas.style.right    = '5px';
  canvas.style.bottom   = 0;
  canvas.style.left     = '5px';
  window.document.body.appendChild(canvas);

  return {
    el : canvas,
    context : context
  };

});