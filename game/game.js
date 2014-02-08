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

		var ballState = STATE_BALL_WAITING;

		var FPS = 30;
		setInterval(function() {
			
			if(ballState == STATE_BALL_WAITING){
				// Wait for the ball to be fired
				updateLevelBallNotActive(level,ball);
			} else {
				updateLevelBallActive(level,ball);
			}

			ctx.clearRect(0,0,640,480);
			drawLevel(ball,level,ctx);
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

	ball.update();
	for(var i = 0;i < lvl.numPlanets;i++){
		lvl.planets[i].update();
		if(detectCollision(ball,lvl.planets[i])){
			ball.reset();
			return BALL_DESTROYED;
		}
	}

	return BALL_FINE;

}

function drawLevel(ball,lvl,ctx){
	ball.draw(ctx);
	for(var i = 0;i < lvl.numPlanets;i++){
		lvl.planets[i].draw(ctx);
	}
	for(var i = 0;i < lvl.numWalls;i++){
		lvl.walls[i].draw(ctx);
	}
}

var ballState;

var STATE_BALL_WAITING = 0
var STATE_BALL_FIRED = 1;

