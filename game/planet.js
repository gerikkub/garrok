function Planet(x,y,radius,gravity,image){
	this.x = x;
	this.y = y;
	this.r = radius;
	this.g = gravity;

	this.Vx = 0;
	this.Vy = 0;

	this.Fx = 0;
	this.Fy = 0;

	this.img = image;

	this.applyGravity = function(ball){
		dx = this.x - ball.x;
		dy = this.y - ball.y;
		theta = Math.atan2(dx,dy) - Math.PI/2;

		r = this.g/(dx*dx + dy*dy);

		//console.log(dx + " " + dy);
		cart = polarToCartesian(r,theta);
		ball.addForce(cart["x"],cart["y"]);
	}

	this.update = function(){
		this.Vx += this.Fx;
		this.Vy += this.Fy;

		this.Fx = 0;
		this.Fy = 0;

		this.x += this.Vx;
		this.y += this.Vy;

	}

	this.addForce = function(Fx,Fy){
		this.Fx += Fx;
		this.Fy += Fy;
	}

}

function polarToCartesian(r,theta){
	var ret = new Array();
	ret["x"] = r*Math.cos(theta);
	ret["y"] = -1*r*Math.sin(theta);
	return ret;
}