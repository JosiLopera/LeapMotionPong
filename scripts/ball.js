define(['canvas'], function(canvas) {

	function Ball(x, y) {
	  this.x = x;
	  this.y = y;
	  this.x_speed = Math.random() * -4 - 4;
	  this.y_speed = Math.random() * 4 + 4;
	  this.radius = 10;
	  this.width = this.radius * 2;
	  this.height = this.radius * 2;
	  this.angle = - Math.PI/4;
	  this.color = null;
	};
	//...

	Ball.prototype.update = function() {
		// update
        this.x += Math.cos(this.angle) * this.x_speed;
        this.y += Math.sin(this.angle) * this.y_speed;

        // Collision with top/bottom of screen
		if(this.y - this.radius < 0) { // hitting the top wall
			$("#hit").get(0).currentTime = 0;
        	$("#hit").get(0).play();
			this.y = this.radius;
			this.y_speed *= -1;
		} else if(this.y + this.radius > canvas.el.height) { // hitting the bottom wall
			$("#hit").get(0).currentTime = 0;
        	$("#hit").get(0).play();
			this.y = canvas.el.height - this.radius;
			this.y_speed *= -1;
		}
	}

	Ball.prototype.render = function() {
		canvas.context.beginPath();
        canvas.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        canvas.context.fillStyle = this.color;
        canvas.context.shadowColor = this.color;
		canvas.context.shadowBlur = 10;
		canvas.context.shadowOffsetX = 0;
		canvas.context.shadowOffsetY = 0;
        canvas.context.fill();
        canvas.context.closePath();
	}

	return Ball;

});