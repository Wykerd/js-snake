/* ====================== */
/*      Definitions!      */
/* ====================== */

const fps = 60; //frames per second. AKA number of times the timer executes per second!
const spawnlength = 3;
const grid = {
  width: 31,
  height: 31,
};

const color = {
  p1h: "#44891A",
  p1t: "#A3CE27"
}

function Point(x, y){
  this.x = x;
  this.y = y;
}

//Returns an array of points where the snake is currently in.
function Snake(initLength, spawn){
  this.array = [];
  if (spawn.x < initLength) {
    for (var i = 0; i < initLength; i++) {
      this.array.push(new Point(spawn.x + i, spawn.y));
    }
  } else {
    for (var i = 0; i < initLength; i++) {
      this.array.push(new Point(spawn.x - i, spawn.y));
    }
  }
  this.initLength = initLength;

  this.reset = function(){
    this.array.slice(0, initLength + 1);
  } //Cut off the array to the initial length
}

function Game(canvas, fps, snake, options){
  //Constructor
  this.fps = fps;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.snake = snake;
  this.options = options;
  options.pvp ? this.options.pvp = options.pvp : this.options.pvp = true;

  this.restart = function(string){
    //Restart the game
  }

  this.draw = function(){
    //Draw to the canvas
    //First Clear the background!
    this.ctx.clearRect(0, 0, grid.width, grid.height);

    //Next draw to canvas
    //Draw the snake
    let cell = new Point(
      Math.floor(this.canvas.width / grid.width),
      Math.floor(this.canvas.height / grid.height)
    );

    //Draw trail
    this.ctx.fillStyle = color.p1t; //Lime

    for (var i = 0; i < snake.array.length; i++) {
      this.ctx.fillRect(
        snake.array[i].x * cell.x, snake.array[i].y * cell.y,
        cell.x, cell.y
      );
    }

    //Draw head
    this.ctx.fillStyle = color.p1h; //Green

    this.ctx.fillRect(
      snake.array[0].x * cell.x, snake.array[0].y * cell.y,
      cell.x, cell.y
    );

  }

  this.checkCollision = function(){
    //Check for snake collision with itself
    return ; //Returns a boolean whether to restart or not!
  }
}
