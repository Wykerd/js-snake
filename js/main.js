/* ====================== */
/*      Definitions!      */
/* ====================== */

var tps = 10; //frames per second. AKA number of times the timer executes per second!
const spawnlength = 3;
var grid = {
  width: 31,
  height: 31,
};

var game = {};

var speedUp = false;  //document.getElementById('speed-up').checked

var color = { //default color pallet
  player: [
    {
      h: "#44891A",
      t: "#A3CE27"
    },
    {
      h: '#005784',
      t: '#31A2F2'
    },
    {
      h: '#EB8931',
      t: '#F7E26B'
    },
    {
      h: '#493C2B',
      t: '#A46422'
    },
    {
      h: '#1B2632',
      t: '#2F484E'
    }
  ],
  pellet: "#BE2633"
}

var keybinds = [{
  up: 87, //W
  down: 83, //S
  left: 65, //A
  right: 68 //D
},
{
  up: 38, //Key Up
  down: 40, //key Down
  left: 37, //Key Left
  right: 39 //Key Right
},
{
  up: 104, //Numpad 8
  down: 98,//Numpad 2
  left: 100,//Numpad 4
  right: 102//Numpad 6
},
{
  up: 76, //L
  down: 18, //Alt
  left: 188,//< (,)
  right: 190 //> (.)
},
{
  up: 71, //G
  down: 66, //B
  left: 86, //V
  right: 78 //N
}];

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

function Game(canvas, tps, snakes, colorPallet){
  //Constructor
  this.tps = tps;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.snake = snakes; //Multiple snakes!
  this.colorPallet = colorPallet;

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
    for (var a = 0; a < this.snake.length; a++) {
      //Draw the snake
      var cell = new Point(
        Math.floor(this.canvas.width / grid.width),
        Math.floor(this.canvas.height / grid.height)
      );

      //Draw trail
      this.ctx.fillStyle = color.player[a].t; //Lime

      for (var i = 0; i < this.snake[a].array.length; i++) {
        this.ctx.fillRect(
          this.snake[a].array[i].x * cell.x, this.snake[a].array[i].y * cell.y,
          cell.x, cell.y
        );
      }

      //Draw head
      this.ctx.fillStyle = color.player[a].h; //Green

      this.ctx.fillRect(
        this.snake[a].array[0].x * cell.x, this.snake[a].array[0].y * cell.y,
        cell.x, cell.y
      );
    }

    this.ctx.fillStyle = color.pellet;
    //draw the Pellet
    this.ctx.fillRect(
      this.pellet.x * cell.x, this.pellet.y * cell.y,
      cell.x, cell.y
    );
  }

  //Refresh method that moves the game forward!
  this.tick = function(){
    for (var a = 0; a < this.snake.length; a++) { //Do for all snakes
      //Shift the array!
      let lastIndex = this.snake[a].array[this.snake[a].array.length - 1];

      for (var i = this.snake[a].array.length - 1; i > 0; i--) {
        this.snake[a].array[i] = this.snake[a].array[i - 1];
      }

      //Check for pellet collision
      if (this.snake[a].array[0].x == this.pellet.x && this.snake[a].array[0].y == this.pellet.y){
        this.snake[a].array.push(lastIndex);
        this.generatePellet();
      }

      let newPos = new Point(
        this.snake[a].array[0].x + this.snake[a].velocity.x,
        this.snake[a].array[0].y + this.snake[a].velocity.y
      );

      //Check for x overflow
      if (newPos.x < 0) newPos.x = grid.width
      else if (newPos.x > 31) newPos.x = 0;

      //Check for y overflow
      if (newPos.y < 0) newPos.y = grid.height
      else if (newPos.y > 31) newPos.y = 0;

      //Set new snake.array[0]
      this.snake[a].array[0] = newPos;

      //check tail collision
      for (var i = 0; i < this.snake[a].array.length; i++) {
        if (i > 0 && this.snake[a].array[0].x === this.snake[a].array[i].x && this.snake[a].array[0].y === this.snake[a].array[i].y) {
          this.snake[a].reset();
        }
      }
    }
  }
}

/* ====================== */
/*      Interaction!      */
/* ====================== */

// Movement / Controls
function changeDir(e){
  for (var i = 0; i < keybinds.length; i++) {
    switch (e.keyCode) {
      case keybinds[i].up:
        game.snake[i].velocity.y === 1 ? true : game.snake[i].velocity = new Point(0, -1);
        if (speedUp) {
          game.tick();
          game.draw();
        }
        break;
      case keybinds[i].down:
        game.snake[i].velocity.y === -1 ? true : game.snake[i].velocity = new Point(0, 1);
        if (speedUp) {
          game.tick();
          game.draw();
        }
        break;
      case keybinds[i].left:
        game.snake[i].velocity.x === 1 ? true : game.snake[i].velocity = new Point(-1, 0);
        if (speedUp) {
          game.tick();
          game.draw();
        }
        break;
      case keybinds[i].right:
        game.snake[i].velocity.x === -1 ? true : game.snake[i].velocity = new Point(1, 0);
        if (speedUp) {
          game.tick();
          game.draw();
        }
        break;
      default:
    }
  }
}

function startGame(snakes){
  game = new Game(document.getElementById('canvas'), tps, snakes, color);

  setInterval(function(){
    game.tick();
    game.draw();
  }, 1000 / game.tps);

  document.addEventListener('keyup', changeDir);
  document.addEventListener('keydown', changeDir);
}

/* ====================== */
/*           UI           */
/* ====================== */
window.onload = function(){
  document.getElementById('btn-single').onclick = function(){
    //[new Snake(3, new Point(1, 2)), new Snake(3, new Point(1, 5)), new Snake(3, new Point(1, 8)), new Snake(3, new Point(1, 11)), new Snake(3, new Point(1, 14))]
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    tps = parseInt(document.getElementById('tps').value);
    speedUp = document.getElementById('speed-up').checked;
    startGame([new Snake(3, new Point(1, 2))]);
  }
  document.getElementById('btn-multi').onclick = function(){
    //[new Snake(3, new Point(1, 2)), new Snake(3, new Point(1, 5)), new Snake(3, new Point(1, 8)), new Snake(3, new Point(1, 11)), new Snake(3, new Point(1, 14))]
    //get the values
    tps = parseInt(document.getElementById('tps').value);
    speedUp = document.getElementById('speed-up').checked;
    let menu = document.getElementById('menu');

    //Hide the components
    document.getElementById('common-settings').style.display = 'none';

    //Generate config UI
    let players = document.createElement('INPUT');
    players.setAttribute('type', 'number');
    players.setAttribute('min', '1');
    players.setAttribute('max', '5');
    players.setAttribute('value', '2');

    let next = document.createElement('INPUT');
    next.setAttribute('type', 'button');
    next.setAttribute('value', 'Done');

    //Confirm number entered
    next.onclick = function(){
      document.getElementById('canvas').style.display = 'block';
      document.getElementById('menu').style.display = 'none';
      let numPlayers = parseInt(players.value);
      if (numPlayers > 5 || numPlayers < 1) {
        alert('Invalid number - only values 1 to 5');
        numPlayers = 1;
      }
      let snakeArray = [];
      for (var i = 0; i < numPlayers; i++) {
        snakeArray.push(new Snake(3, new Point(1, 2*i)));
      }
      startGame(snakeArray);
    }

    menu.textContent = 'Enter number of players: ';
    //Append the UI Elements
    menu.appendChild(players);
    menu.appendChild(next);
  }

}
