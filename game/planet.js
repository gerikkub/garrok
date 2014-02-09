function Planet(x,y,radius,gravity,dTheta,image){
	this.x = x;
	this.y = y;
	this.r = radius;
	this.g = this.r * 1500;

	this.Vx = 0;
	this.Vy = 0;

	this.Fx = 0;
	this.Fy = 0;

	this.img = image;

	this.enableMovement = false;
	this.theta = 0;
	this.dTheta = dTheta;

	var img = new Image();
	switch(image){
		case 0:
			img.src = "../assets/g3_blueplanet.png";
			break;
		case 1:
			img.src = "../assets/g3_metalplanet.png";
			break;
		case 2:
		default:
			img.src = "../assets/comet.png";
	}
	

	this.applyGravity = function(ball){
		dx = this.x - ball.x;
		dy = this.y - ball.y;
		theta = Math.atan2(dx,dy) - Math.PI/2;

		r = this.g/(dx*dx + dy*dy);

		console.log(r);

		//console.log(dx + " " + dy);
		cart = polarToCartesian(r,theta);
		ball.addForce(cart["x"],cart["y"]);
	}

	this.setPath = function(semiMajorAxis,semiMinorAxis,focusX,focusY,phi){

		this.enableMovement = true;

		this.semiMajorAxis = semiMajorAxis;
		this.semiMinorAxis = semiMinorAxis;
		this.eccentricity = Math.sqrt((Math.pow(semiMajorAxis,2) - Math.pow(semiMinorAxis,2)) / Math.pow(semiMajorAxis,2));
		this.focusX = focusX;
		this.focusY = focusY;

		this.fociDistance = 2 * Math.sqrt(Math.pow(this.semiMajorAxis,2) - Math.pow(this.semiMinorAxis,2));

		this.phi = phi;


	}

	this.update = function(){

		if(this.enableMovement == true){

			var r = 2*(this.semiMajorAxis*(1 - Math.pow(this.eccentricity,2)))/(1+this.eccentricity*Math.cos(this.theta));

			pos = polarToCartesian(r,this.theta + this.phi);

			this.x = pos["x"] + this.focusX + 2*this.fociDistance*Math.cos(this.phi);
			this.y = pos["y"] + this.focusY - 2*this.fociDistance*Math.sin(this.phi);

			this.theta += dTheta;
			if(this.theta > 2*Math.PI) this.theta -= 2*Math.PI;

		}

	}

	this.draw = function(ctx){
		ctx.drawImage(img,this.x - this.r,this.y - this.r,this.r*2,this.r*2);
	}

}

function polarToCartesian(r,theta){
	var ret = new Array();
	ret["x"] = r*Math.cos(theta);
	ret["y"] = -1*r*Math.sin(theta);
	return ret;
}