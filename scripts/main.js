requirejs.config({
  paths: {
    'Leap': '../lib/leap-0.6.4'
  },
  shim: {
    'Leap': {
      'exports': 'Leap'
    }
  }
});

require(['Leap', 'game', 'canvas'], function(Leap, Game, canvas) {
  'use strict';

    
  var game = new Game;
  game.init();

  var controller = new Leap.Controller({
    enableGestures: true,
    frameEventName: 'animationFrame'
  });

  controller.connect();

  // ====================
  // CONTROLLER LISTENERS
  // ====================

  var handLeft, handRight, finger, scoreTop, scoreLeft;

  controller.on('frame', function(frame) {

    // Player's hands
    game.setPlayers(frame);

    game.update(frame);

    // Clear canvas on each frame
    canvas.context.clearRect(0, 0, canvas.el.width, canvas.el.height);

    game.render(frame);
    game.shots(frame);


  });

  controller.on('connect', function() {
    console.info('Leap Motion prêt ...');
  });

  controller.on('deviceConnected', function() {
    console.info('Leap Motion connecté !');
  });

  controller.on('deviceDisconnected', function() {
    console.warn('Leap Motion déconnecté !');
  });

  

});