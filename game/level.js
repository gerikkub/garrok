function Level(initX,initY,alienX,alienY){

	this.initX = initX;
	this.initY = initY;

	this.alienX = alienX;
	this.alienY = alienY;

	this.numPlanets = 0;
	this.planets = new Array();

	this.addPlanet = function(x,y,radius,gravity,dTheta,img,semiMajor,semiMinor,focusX,focusY,phi){
		var plan = new Planet(x,y,radius,gravity,dTheta,img);
		if(semiMajor > 0){
			plan.setPath(semiMajor,semiMinor,focusX,focusY,phi);
		}
		this.planets[this.numPlanets] = plan;
		this.numPlanets++;
	}

}