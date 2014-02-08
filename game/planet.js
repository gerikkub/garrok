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

	applyGravity: function(ball){
		dx = ball.x - this.x;
		dy = bally.y - this.y;
		theta = Math.atan2(dx,-dy);
		r = Math.sqrt(dx*dx + dy*dy);
		cart = polarToCartesian(r,theta);
		ball.addForce(cart["x"],cart["y"]);
	}

	update: function(){
		this.Vx += this.Fx;
		this.Vy += this.Fy;

		this.Fx = 0;
		this.Fy = 0;

		this.x += this.Vx;
		this.y += this.Vy;

	}

	addForce: function(Fx,Fy){
		this.Fx += Fx;
		this.Fy += Fy;
	}

}

function polarToCartesian(r,theta){
	var ret["x"] = r*cos(theta);
	ret["y"] = -1*r*sin(theta);
	return ret;
}