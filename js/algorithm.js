
/* ====================== */
/*       Algorithm!       */
/* ====================== */
window.onload = function(){
  game = new Game(document.getElementById('canvas'), tps, [new Snake(3, new Point(0,0))], color);
  setInterval(function(){
    predictVelocity();
    game.tick();
    game.draw();
  }, 1000 / game.tps);
}

function predictVelocity(){
  let posPlayer = game.snake[0].array[0];
  let posPellet = game.pellet;

  if (posPlayer.x === posPellet.x) {
    if (posPlayer.y > posPellet.y) game.snake[0].velocity = new Point(0, -1);
    if (posPlayer.y < posPellet.y) game.snake[0].velocity.y = new Point(0, 1);
  }
}
