define(['canvas'], function(canvas) {

	function Bomb2(x, y) {
	  this.x = x;
	  this.y = y;
	  this.x_speed = -20;
	  this.radius = 10;
	  this.width = this.radius * 2;
	  this.height = this.radius * 2;
	  this.color = '#40ff00';
	};

	Bomb2.prototype.update = function() {
		this.x += this.x_speed;
	}

	Bomb2.prototype.render = function() {
		canvas.context.beginPath();
        canvas.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        canvas.context.fillStyle = this.color;
        canvas.context.fill();
        canvas.context.closePath();
	}

	return Bomb2;

});