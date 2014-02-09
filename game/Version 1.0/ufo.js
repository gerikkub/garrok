function UFO(initX,initY){
	this.x = initX;
	this.y = initY;

	this.img = new Image();
	this.img.src = "../assets/ufo.png";

	console.log(this.img.width);
	this.r = 30;

	this.draw = function(ctx){
		ctx.drawImage(this.img,this.x - this.img.width/4,this.y - this.img.height/4,100,40);
	}
}