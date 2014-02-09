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

	this.aimAngle = 0;

	this.img = new Image();
	this.img.src = "../assets/rocket.png";

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
		if((this.Vx != 0) && (this.Vy != 0)){
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(Math.atan2(this.Vy,this.Vx) + Math.PI/2);
			//ctx.fillRect(0,0,4,4);
			ctx.drawImage(this.img,-25,-40,50,80);
			ctx.restore();
		} else {
			console.log(this.aimAngle);
			ctx.save()
			ctx.translate(this.x,this.y);
			ctx.rotate(0 - this.aimAngle + Math.PI/2);
			ctx.drawImage(this.img,-25,-40,50,80);
			ctx.restore();
		}
		//ctx.fillRect(this.x,this.y,4,4);
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

	this.launch = function(){

		this.Vx = 5 * Math.cos(this.aimAngle);
		this.Vy = -5 * Math.sin(this.aimAngle);
	}

}