/* ====================== */
/*      Definitions!      */
/* ====================== */

const tps = 10; //frames per second. AKA number of times the timer executes per second!
const spawnlength = 3;
const grid = {
  width: 31,
  height: 31,
};

const color = {
  p1h: "#44891A",
  p1t: "#A3CE27",
  pellet: "#BE2633"
}

const keybinds = {
  up: 87,
  down: 83,
  left: 65,
  right: 68
}

/* ====================== */
/*        Classes!        */
/* ====================== */

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
      this.velocity = new Point(-1, 0);
    }
  } else {
    for (var i = 0; i < initLength; i++) {
      this.array.push(new Point(spawn.x - i, spawn.y));
      this.velocity = new Point(1, 0);
    }
  }
  this.initLength = initLength;

  this.reset = function(){
    this.array = this.array.slice(0, this.initLength);
  } //Cut off the array to the initial length
}

function Game(canvas, tps, snake, options){
  //Constructor
  this.tps = tps;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.snake = snake;
  this.options = options;
  options.pvp ? this.options.pvp = options.pvp : this.options.pvp = true;

  //Generate Pellet
  this.generatePellet = function(){
    this.pellet = new Point(Math.floor(Math.random() * 32), Math.floor(Math.random() * 32));
  }

  this.generatePellet();

  this.draw = function(){
    //Draw to the canvas
    //First Clear the background!
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        this.snake.array[i].x * cell.x, this.snake.array[i].y * cell.y,
        cell.x, cell.y
      );
    }

    //Draw head
    this.ctx.fillStyle = color.p1h; //Green

    this.ctx.fillRect(
      this.snake.array[0].x * cell.x, this.snake.array[0].y * cell.y,
      cell.x, cell.y
    );

    this.ctx.fillStyle = color.pellet;
    //draw the Pellet
    this.ctx.fillRect(
      this.pellet.x * cell.x, this.pellet.y * cell.y,
      cell.x, cell.y
    );
  }

  //Refresh method that moves the game forward!
  this.tick = function(){


    //Shift the array!

    let lastIndex = this.snake.array[this.snake.array.length - 1];

    for (var i = snake.array.length - 1; i > 0; i--) {
      this.snake.array[i] = this.snake.array[i - 1];
    }

    //Check for pellet collision
    if (this.snake.array[0].x == this.pellet.x && this.snake.array[0].y == this.pellet.y){
      this.snake.array.push(lastIndex);
      this.generatePellet();
    }

    let newPos = new Point(
      this.snake.array[0].x + this.snake.velocity.x,
      this.snake.array[0].y + this.snake.velocity.y
    );

    //Check for x overflow
    if (newPos.x < 0) newPos.x = grid.width
    else if (newPos.x > 31) newPos.x = 0;

    //Check for y overflow
    if (newPos.y < 0) newPos.y = grid.height
    else if (newPos.y > 31) newPos.y = 0;

    //Set new snake.array[0]
    this.snake.array[0] = newPos;

    //check tail collision
    for (var i = 0; i < this.snake.array.length; i++) {
      if (i > 0 && this.snake.array[0].x === snake.array[i].x && this.snake.array[0].y === this.snake.array[i].y) {
        this.snake.reset();
      }
    }
  }
}

/* ====================== */
/*      Interaction!      */
/* ====================== */

window.onload = function(){
  var game = new Game(document.getElementById('canvas'), tps, new Snake(3, new Point(1, 2)), {});

  setInterval(function(){
    game.tick();
    game.draw();
  }, 1000 / game.tps);

  document.addEventListener('keyup', changeDir);
  document.addEventListener('keydown', changeDir);
  function changeDir(e){
    switch (e.keyCode) {
      case keybinds.up:
        game.snake.velocity.y === 1 ? true : game.snake.velocity = new Point(0, -1);
        break;
      case keybinds.down:
        game.snake.velocity.y === -1 ? true : game.snake.velocity = new Point(0, 1);
        break;
      case keybinds.left:
        game.snake.velocity.x === 1 ? true : game.snake.velocity = new Point(-1, 0);
        break;
      case keybinds.right:
        game.snake.velocity.x === -1 ? true : game.snake.velocity = new Point(1, 0);
        break;
      default:

    }
  }
}
