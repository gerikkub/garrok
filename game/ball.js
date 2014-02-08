function Ball(initX,initY){

	this.initX = initX;
	this.initY = initY;

	this.x = initX;
	this.y = initY;

	this.Vx = 0;	//Velocity in the x direction
	this.Vy = 0;

	this.Fx = 0;	//Sum of the forces in the x direction
	this.Fy = 0; 

	this.update = function(){

		//Assuming mass of the ball is 1. Vx += Fx
		this.Vx += this.Fx;
		this.Vy += this.Fy;

		//console.log("Fx: " + this.Fx + " Fy: " + this.Fy);

		this.Fx = 0;
		this.Fy = 0;

		this.x += this.Vx;
		this.y += this.Vy;

	}

	this.draw = function(ctx){
		ctx.fillRect(this.x,this.y,5,5);
	}

	this.addForce = function(Fx,Fy){
		this.Fx = Fx;
		this.Fy = Fy;
	}

}