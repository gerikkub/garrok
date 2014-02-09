var ballState;

var STATE_BALL_WAITING = 0
var STATE_BALL_FIRED = 1;

var currentLevel;

function Game(){
	this.currentLevel = 0;

	this.levels = new Array();
	this.numLevels = 0;

	this.addLevel = function(lvl){
		this.levels[this.numLevels] = lvl;
		this.numLevels++;
	}

	this.runLevel = function(lvlnum){

		currentLevel = lvlnum;

		levelComplete = false;

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
		});

		var FPS = 30;
		var setIntervalID = setInterval(function() {
			
			if(ballState == STATE_BALL_WAITING){
				// Wait for the ball to be fired

				updateLevelBallNotActive(level,ball);
			} else {
				switch(updateLevelBallActive(level,ball,ufo)){
					case BALL_DESTROYED:
						ballState = STATE_BALL_WAITING;
						break;
					case BALL_WIN:
						clearInterval(setIntervalID);
						startNextLevel(currentLevel + 1);
						break;
				}
			}

			ctx.clearRect(0,0,640,480);
			drawLevel(ball,level,ufo,ctx);
		}, 1000/FPS);

	}


}

/*function detectCollision(ball,planet){
	//console.log(Math.abs(ball.x - planet.x) + " " + Math.abs(ball.y - planet.y));
	//console.log(distSquared(ball.x,ball.y,planet.x,planet.y) - Math.pow(planet.r + ball.r,2));
	if(distSquared(ball.x,ball.y,planet.x,planet.y) < Math.pow(planet.r + ball.r,2)){
		return true;
	} else {
		return false;
	}
}*/

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
var BALL_WIN = 2;

function updateLevelBallActive(lvl,ball,ufo){

	//console.log(lvl.numPlanets);
	for(var i = 0;i < lvl.numPlanets;i++){
		lvl.planets[i].update();
		console.log(i);
		lvl.planets[i].applyGravity(ball);
		if(ball.collidesWith(lvl.planets[i])){
			ball.reset();
			return BALL_DESTROYED;
		}
		if(ball.collidesWith(ufo)){
			return BALL_WIN;
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


