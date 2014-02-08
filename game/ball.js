function Ball(initX,initY){

	this.initX = initX;
	this.initY = initY;

	this.r = 2;

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

//		console.log("Fx: " + this.Fx + " Fy: " + this.Fy);

		this.Fx = 0;
		this.Fy = 0;

		this.x += this.Vx;
		this.y += this.Vy;

	}

	this.draw = function(ctx){
		//this.$img.rotate(Math.atan2(-this.Vy,this.Vx));
		//ctx.drawImage(this.$img.get(0),this.x,this.y);
		ctx.fillRect(this.x,this.y,4,4);
	}

	this.addForce = function(Fx,Fy){
		this.Fx = Fx;
		this.Fy = Fy;
	}

	this.reset = function(){
		this.Vx = 0;
		this.Vy = 0;
		this.x = this.initX;
		this.y = this.initY;
	}

	this.collidesWith = function(obj){
		if(Math.sqrt(distSquared(this.x,this.y,obj.x,obj.y)) < 50){
			//console.log(Math.sqrt(distSquared(this.x,this.y,obj.x,obj.y)));
			console.log(obj.r);
		}
		if(distSquared(this.x,this.y,obj.x,obj.y) < Math.pow(obj.r + this.r,2)){
			return true;
		} else {
			return false;
		}
	}

}