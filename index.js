const Ball = function(x, y, radius){
	this.color = randomColor();
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.position = Math.random()*Math.PI*2
	this.speed = 5

	this.updatePosition = function(width, height){
		this.x += Math.cos(this.position)*this.speed
		this.y += Math.sin(this.position)*this.speed

		if (this.x-this.radius < 0){
			this.x = this.radius
			this.position = Math.atan2(Math.sin(this.position), Math.cos(this.position)*  -1)
		}else if (this.x+this.radius > width){
			this.x = width - this.radius
			this.position = Math.atan2(Math.sin(this.position), Math.cos(this.position)*  -1)
		}
		if (this.y-this.radius < 0){
			this.y = this.radius
			this.position = Math.atan2(Math.sin(this.position)*  -1, Math.cos(this.position))
		}else if (this.y+this.radius > height){
			this.y = height - this.radius
			this.position = Math.atan2(Math.sin(this.position)*  -1, Math.cos(this.position))
		}
	}

	this.changeX = function(){
		this.position = Math.atan2(Math.sin(this.position), Math.cos(this.position)*  -1)
	}
	this.changeY = function(){
		this.position = Math.atan2(Math.sin(this.position)*  -1, Math.cos(this.position))
	}
}
var context = document.querySelector("canvas").getContext("2d");
balls = []
for (var i = 0; i < 15; i++) {
	balls.push(new Ball(randomX(), randomY(), randomRadius()))
}
function randomX(){
	var x = Math.random()*document.documentElement.clientWidth/2
	return x
}
function randomY(){
	var y = Math.random()*document.documentElement.clientHeight/2
	return y
}
function randomRadius(){
	var r = Math.floor(Math.random()*10)+20
	return 20
}
function randomColor(){
	var hex = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
	return hex
}
function detectCollision(ball1, ball2){
	var bothRadius = ball1.radius+ball2.radius
	var x1 = ball1.x + ball1.radius
	var x2 = ball2.x + ball2.radius
	var y1 = ball1.y + ball1.radius
	var y2 = ball2.y + ball2.radius

	var distance = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
	if (distance <= (Math.pow(bothRadius,2))){
		ball1.changeY();
		ball2.changeX();
	}else{
	}
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function game(){
	window.requestAnimationFrame(game);

	var width = document.documentElement.clientWidth/2
	var height = document.documentElement.clientHeight/2

	context.canvas.height = height;
	context.canvas.width = width;

	for (ball in balls) {
		balls[ball].updatePosition(width, height)
		context.fillStyle = balls[ball].color;
		context.beginPath();
		context.arc(balls[ball].x, balls[ball].y, balls[ball].radius, 0, Math.PI*2)
		context.fill()
	}
	for (ball in balls){
		for (ball2 in balls){
			if (ball != ball2){
				detectCollision(balls[ball], balls[ball2])
			}
		}
	}

}
game();