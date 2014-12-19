define(['utils', 'canvas'], function(utils, canvas) {

	function Player(id, width, height, left, x, y) {
		this.id = id;
		this.width = 20;
		this.height = 150;
		this.x = 0;
		this.y = 0;
		this.isValid = false;
		this.hand = false;
		this.isLeft = false;
		this.isRight = false;
		this.color = null;
	};

	Player.prototype.setPosition = function(position) {
		switch (position.toLowerCase()) {
			case 'left':
				this.x = 0;
				break;
			case 'right':
				this.x = canvas.el.width - this.width;
				break;
		}
	};

	Player.prototype.update = function(frame) {

		if (!frame) {
		  throw new Error('Invalid frame given for player.render()');
		}
		if (this.hand) {
			var palmPos = utils.LeapToScene(frame, this.hand.stabilizedPalmPosition);
			this.y = palmPos.y;
		};

	};

	Player.prototype.render = function(frame) {

		// Drawing the pad
		canvas.context.fillStyle = this.color;
		canvas.context.shadowColor = this.color;
		canvas.context.shadowBlur = 18;
		canvas.context.shadowOffsetX = 0;
		canvas.context.shadowOffsetY = 0;
		canvas.context.fill();
        canvas.context.fillRect(this.x, this.y, this.width, this.height);



        // Drawing the finger (if on screen)
        if (this.hand) {
			finger = this.hand.fingers[1];
			/*if (finger) {
				var fingerPos = utils.LeapToScene(frame, finger.stabilizedTipPosition);
				canvas.context.fillRect(fingerPos.x, fingerPos.y, 10, 10);
			}*/
		}

	};

	return Player;

});