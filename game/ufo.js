function UFO(initX,initY){
	this.x = initX;
	this.y = initY;

	this.img = new Image();
	this.img.src = "../assets/ufo.png";

	this.draw = function(ctx){
		ctx.drawImage(this.img,this.x,this.y,100,40);
	}
}