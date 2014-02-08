var ballState;

var STATE_BALL_WAITING = 0
var STATE_BALL_FIRED = 1;


function Game(){
	this.currentLevel = 0;

	this.levels = new Array();
	this.numLevels = 0;

	this.addLevel = function(lvl){
		this.levels[this.numLevels] = lvl;
		this.numLevels++;
	}

	this.runLevel = function(lvlnum){

		var ctx = document.getElementById("gameCanvas").getContext("2d");

		var level = this.levels[lvlnum];
		var ball = new Ball(level.initX,level.initY);
		console.log(level.ufoX + " " + level.ufoY);
		var ufo = new UFO(level.ufoX,level.ufoY);

		var ballState = STATE_BALL_WAITING;

		var aimAngle = 0;

		$('body').keydown(function(ev){
			if(ev.which == 38){ //UP
				aimAngle += 5*Math.PI/180;
				if(aimAngle > Math.PI / 2) aimAngle = Math.PI / 2;
			} else if(ev.which == 40){//DOWN
				aimAngle -= 5*Math.PI/180;
				if(aimAngle < -1*Math.PI / 2) aimAngle = -1*Math.PI / 2;
			} else if(ev.which == 32){//SPACE
				ballState = STATE_BALL_FIRED;
				ball.Vx = 5 * Math.cos(aimAngle);
				ball.Vy = -5 * Math.sin(aimAngle);
			}
		})

		var FPS = 30;
		setInterval(function() {
			
			if(ballState == STATE_BALL_WAITING){
				// Wait for the ball to be fired

				//console.log(aimAngle);


				updateLevelBallNotActive(level,ball);
			} else {
				if(updateLevelBallActive(level,ball) == BALL_DESTROYED){
					ballState = STATE_BALL_WAITING;
				}
			}

			ctx.clearRect(0,0,640,480);
			drawLevel(ball,level,ufo,ctx);
		}, 1000/FPS);

	}


}

function detectCollision(ball,planet){

	if(distSquared(ball.x,ball.y,planet.x,planet.y) < Math.pow(planet.radius + ball.radius,2)){
		return true;
	} else {
		return false;
	}
}

function distSquared(x1,y1,x2,y2){
	return Math.pow(x2-x1,2) + Math.pow(y2-y1,2);
}

function updateLevelBallNotActive(lvl){
	for(var i = 0;i < lvl.numPlanets;i++){
		lvl.planets[i].update();
	}
}

var BALL_FINE = 0;
var BALL_DESTROYED = 1;

function updateLevelBallActive(lvl,ball){

	
	for(var i = 0;i < lvl.numPlanets;i++){
		lvl.planets[i].update();
		lvl.planets[i].applyGravity(ball);
		if(detectCollision(ball,lvl.planets[i])){
			ball.reset();
			return BALL_DESTROYED;
		}
	}
	ball.update();

	return BALL_FINE;

}

function drawLevel(ball,lvl,ufo,ctx){
	ball.draw(ctx);
	for(var i = 0;i < lvl.numPlanets;i++){
		lvl.planets[i].draw(ctx);
	}
	for(var i = 0;i < lvl.numWalls;i++){
		lvl.walls[i].draw(ctx);
	}
	ufo.draw(ctx);
}


