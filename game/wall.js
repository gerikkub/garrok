function Wall(x,y1,y2){

	this.x = x;
	this.y1 = y1;
	this.y2 = y2;

	var wallImg = new Image();
	wallImg.src = "../assets/asteroid_belt.png";

	this.draw = function(ctx){
		if(this.y2 < this.y1){
			console.log("ERROR: Y2 is less than Y1 in Wall");
		}
		var length = this.y2 - this.y1;
		var imgLength = wallImg.height;

		var currX = x;
		var currY = y1;
		var direction

		var walls = new Array();
		var i = 0;

		while(length > imgLength/2){
			//console.log("Drawing Wall");
			//console.log(length + " " + imgLength + " " + currY);
			//walls[i] = new Image();
			//walls[i].src = "../assets/asteroid_belt.png";

			//ctx.drawImage(walls[i],currX,currY);
			ctx.drawImage(wallImg,currX - wallImg.width/4,currY,wallImg.width/2,wallImg.height/2);

			//i++;
			length -= imgLength/2;
			currY += imgLength/2;

		}

		ctx.drawImage(wallImg,0,0,wallImg.width,length,currX - wallImg.width/4,currY,wallImg.width/2,length/2);

	}

}

function calcDistance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}