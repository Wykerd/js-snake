
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
