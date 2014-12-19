define(['canvas', 'utils', 'player', 'ball', 'bomb1', 'bomb2'], function(canvas, utils, Player, Ball, Bomb1, Bomb2 ) {

	function Game() {
		this.player1 = null;
		this.player2 = null;
		this.ball = null;
		this.scoreP1 =0;
		this.scoreP2 =0;
		this.spPosX = window.innerWidth/6;
		this.spPosY = window.innerHeight/3;
		this.bombP1 = null;
		this.bombP2 = null;
		this.bomb = null;
		this.bomb2 = null;

	}

	Game.prototype.init = function() {
		// initialisation du jeu, on crée 2 joueurs
		this.player1 = new Player;
		this.player2 = new Player;

		this.player1.setPosition('left');
		this.player2.setPosition('right');
 
		this.player1.color = '#2d3bf8';
		this.player2.color = '#40ff00';

		// on crée la boule
		this.ball = new Ball(canvas.el.width/2, canvas.el.height/2);
		this.ball.color = '#fff';

		// on set les scores
		$("#pp1").css({ left:this.spPosX, top:this.spPosY });
		$("#pp2").css({ right:this.spPosX, top:this.spPosY });


		//on set le bombs
		this.bomb1 = new Bomb1(this.x,this.y);
		this.bomb2 = new Bomb2(this.x,this.y);


		this.bombP1 = [this.bomb,this.bomb,this.bomb,this.bomb,this.bomb];
		this.bombP2 = [this.bomb2,this.bomb2,this.bomb2,this.bomb2,this.bomb2];
		

	}

	Game.prototype.setPlayers = function(frame) {

	    this.player1.isValid = false;
	    this.player1.hand = false;
	    this.player2.isValid = false;
	    this.player2.hand = false;
	     
	    frame.hands.forEach((function(hand) {
	      if (hand.id === this.player1.id) {
	        this.player1.hand    = hand;
	        this.player1.isValid = true;
	      }
	      else if (hand.id === this.player2.id) {
	        this.player2.hand    = hand;
	        this.player2.isValid = true;
	      }
	    }).bind(this));
	     
	    if (!this.player1.isValid && frame.hands[0] && frame.hands[0].id !== this.player2.id) {
	      this.player1.id   = frame.hands[0].id;
	      this.player1.hand = frame.hands[0];
	    }
	    else if (!this.player1.isValid && frame.hands[1] && frame.hands[1].id !== this.player2.id) {
	      this.player1.id   = frame.hands[1].id;
	      this.player1.hand = frame.hands[1];
	    }
	     
	    if (!this.player2.isValid && frame.hands[0] && frame.hands[0].id !== this.player1.id) {
	      this.player2.id   = frame.hands[0].id;
	      this.player2.hand = frame.hands[0];
	    }
	    else if (!this.player2.isValid && frame.hands[1] && frame.hands[1].id !== this.player1.id) {
	      this.player2.id   = frame.hands[1].id;
	      this.player2.hand = frame.hands[1];
	    }
	};

	Game.prototype.update = function(frame) {


		// refactor !!!
		// ------------------------------------

      	if (!this.player1.isValid && !this.player2.isValid) {
      		console.warn('Needs at least 1 player to start game...');
      		return false;
      	}

      	// TODO : Updater le score uniquement en cas de changement (sinon on perd des perfs)
       
        this.player1.update(frame);
        this.player2.update(frame);
        this.ball.update(frame);
        this.bomb1.update(frame);
        this.bomb2.update(frame);

        // -------------------
        // Collision detection
        // -------------------

        if ((this.ball.x - this.ball.radius) <= (this.player1.x + this.player1.width)) {
          if ((this.ball.y - this.ball.radius) > this.player1.y && (this.ball.y - this.ball.radius) < (this.player1.y + this.player1.height)) {
        	// Sound
        	$("#hit").get(0).currentTime = 0;
        	$("#hit").get(0).play();


            // Calcular angulos
            var relativeIntersectY = this.player1.y + this.player1.height/2 - this.ball.y;
            var normalizedRelativeIntersectionY = relativeIntersectY / (this.player1.height/2);
            this.ball.angle = normalizedRelativeIntersectionY * (Math.PI/4);

            this.ball.x_speed *= -1;

            // Level up
            this.ball.x_speed += 1;
        	this.ball.y_speed += 1;
          } else {
          	// Sound
        	$("#lose").get(0).currentTime = 0;
        	$("#lose").get(0).play();

        	//score
          	this.scoreP2 = this.scoreP2 + 1;

        	//update and animate score
        	$("#pp2")
        			.animate({ opacity: 1}, 500 )
        			.animate({ opacity: 0.5 }, 500 )
        			.text(this.scoreP2);
        	this.ball.x = window.innerWidth/2;
        	this.ball.y = window.innerHeight/2;
	  		this.ball.x_speed = Math.random() * -4 - 4;
	  		this.ball.y_speed = Math.random() * 4 + 4;
	  		this.player1.height = 150;
	  		this.player2.height = 150;


          }
        }
        else if((this.ball.x + this.ball.radius) >= (canvas.el.width - this.player2.width)) {
          if ((this.ball.y - this.ball.radius) > this.player2.y && (this.ball.y - this.ball.radius) < (this.player2.y + this.player2.height)) {
        	// Sound
        	$("#hit").get(0).currentTime = 0;
        	$("#hit").get(0).play();

            // Calcular angulos
            var relativeIntersectY = this.player2.y + this.player2.height/2 - this.ball.y;
            var normalizedRelativeIntersectionY = relativeIntersectY / (this.player2.height/2);
            this.ball.angle = normalizedRelativeIntersectionY * (Math.PI/4);

            this.ball.x_speed *= -1;

        	// Level up !
        	this.ball.x_speed -= 1;
        	this.ball.y_speed -= 1;
          }else{
          	// Sound
        	$("#lose").get(0).currentTime = 0;
        	$("#lose").get(0).play();

        	//score
        	this.scoreP1 = this.scoreP1 + 1;

        	//update and animate score
        	$("#pp1")
        			.animate({ opacity: 1}, 500 )
        			.animate({ opacity: 0.5 }, 500 )
        			.text(this.scoreP1);
        	this.ball.x = window.innerWidth/2;
        	this.ball.y = window.innerHeight/2;
	  		this.ball.x_speed = Math.random() * 4 + 4;
	  		this.ball.y_speed = Math.random() * 4 + 4;
	  		this.player1.height = 150;
	  		this.player2.height = 150;
        	}
        }

        // -------------------
        // Collision detection bomb 
        // -------------------

        if ((this.bomb2.x - this.bomb2.radius) <= (this.player1.x + this.player1.width)) {
          	if ((this.bomb2.y - this.bomb2.radius) > this.player1.y && (this.bomb2.y - this.bomb2.radius) < (this.player1.y + this.player1.height)) {
	          	// Sound
	        	$("#hit2").get(0).currentTime = 0;
	        	$("#hit2").get(0).play();
	        	this.player1.height += -20;
	            this.bomb2.x = 0;
	        	this.bomb2.y = -100;
           
          	}else{
	        	this.bomb2.x = 0;
	        	this.bomb2.y = -100;
	  		
        	}
        }

       	if((this.bomb1.x + this.bomb1.radius) >= (canvas.el.width - this.player2.width)) {
          	if ((this.bomb1.y - this.bomb1.radius) > this.player2.y && (this.bomb1.y - this.bomb1.radius) < (this.player2.y + this.player2.height)) {
	        	// Sound
	        	$("#hit2").get(0).currentTime = 0;
	        	$("#hit2").get(0).play();
	        	this.player2.height += -20;
	            this.bomb1.x = 0;
	        	this.bomb1.y = -100;
           
          	}else{
	        	this.bomb1.x = 0;
	        	this.bomb1.y = -100;
	  		}
        }
        

        //game.shots(frame);

	};

	Game.prototype.render = function(frame) {

		this.player1.render(frame);
		this.player2.render(frame);
		this.ball.render();
		this.bomb1.render();
		this.bomb2.render();

	};

	Game.prototype.shots = function(frame) {
		var bombtable1 = this.bomb1;
		var bombtable2 = this.bomb2;
		var player1Y = this.player1.y;
		var player1H = this.player1.height/2;
		var player1W = this.player1.x + this.player1.width;
		var player2Y = this.player2.y;
		var player2H = this.player2.height/2;
		var player2W = this.player2.x + this.player2.width;
		var playerId = this.player1.id;

		//console.log(this.player1);

		if(frame.valid && frame.gestures.length > 0){
          frame.gestures.forEach(function(gesture, hand){
          	if (gesture.handIds[0] === playerId) {
          		switch (gesture.type){
              		case "keyTap":
                  	console.log("keyTap player 1");
                  	//console.log(bombtable);
                  	//console.log(bombtable1[i].x);
                  	//for (var i = 0; i < bombtable1.length; i++) {

                  		bombtable1.x = player1W;
                  		bombtable1.y = (player1Y + player1H);
       
                  		//console.log(bombtable1[i]);
       
                  		//console.log(bombtable1[0].x_speed);

                  	//	break;
                  	//};
                  	//break;
            	}
          	}else{
          		switch (gesture.type){
              		case "keyTap":
                  	console.log("keyTap player 2");
                  	//console.log(bombtable);
                  	//for (var i = 0; i < bombtable2.length; i++) {

                  		bombtable2.x = player2W;
                  		bombtable2.y = (player2Y + player2H);
       
                  		//console.log(bombtable2[0].x_speed);


                  	//	break;
                  	//};
                  	//break;
            	}
          	}
            
          });
        };

	}

	return Game;

});