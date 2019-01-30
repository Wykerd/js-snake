
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
  let v = game.snake[0].velocity;
  let arrS = game.snake[0].array;

  //First check:
  //Simple algorithm to turn automatically
  if (posPlayer.x > posPellet.x){
    if (v.x !== 1) game.snake[0].velocity = new Point(-1, 0);
  } else if (posPlayer.x < posPellet.x){
    if (v.x !== -1) game.snake[0].velocity = new Point(1, 0);
  }

  if (posPlayer.y > posPellet.y){
    if (v.y !== 1) game.snake[0].velocity = new Point(0, -1);
  } else if (posPlayer.y < posPellet.y){
    if (v.y !== -1) game.snake[0].velocity = new Point(0, 1);
  }



  //Get new velocity in shortend variable
  let ov = v;
  v = game.snake[0].velocity;



  this.bestY = function(){
    console.log('calculating best y velocity');
    let res = {
      up: (grid.height + 1) * (grid.width + 1) + 1,
      down: (grid.height + 1) * (grid.width + 1)
    };
    for (var i = 1; i < arrS.length; i++) {
      if (arrS[i].x === arrS[0].x){
        if (arrS[i].x > arrS[0].x) res.down = i
        else if (arrS[i].x < arrS[0].x) res.up = i
      }
    }
    if (res.up > res.down && ov.y !== 1) return new Point(0, -1)
    else if (res.up < res.down && ov.y !== -1) return new Point(0, 1)
    else {return ov;console.log('YOTEEEEEEEEEEEE')}
  }

  if (v.y === 0) { //Moving in x direction
    for (var i = 1; i < arrS.length; i++) {
      if (v.x < 0) {
        if (arrS[i].x < arrS[0].x && posPellet.x < arrS[0].x && arrS[0].x - arrS[i].x < 6 && arrS[0].x - arrS[i].x > -1 && arrS[0].y === arrS[i].y) {
          console.log('oh no v.x < 0');
          game.snake[0].velocity = this.bestY();
          return;
        }
      } else if (v.x > 0) {
        if (arrS[i].x > arrS[0].x && posPellet.x > arrS[0].x && arrS[i].x - arrS[0].x < 6 && arrS[i].x - arrS[0].x > -1 && arrS[0].y === arrS[i].y) {
          console.log('oh no v.x > 0');
          game.snake[0].velocity = this.bestY();
          return;
        }
      }
    }
  }

  this.bestX = function(){
    console.log('calculating best x velocity');
    let res = {
      left: (grid.height + 1) * (grid.width + 1) + 1, //Unreachable numbers
      right: (grid.height + 1) * (grid.width + 1)
    };
    for (var i = 1; i < arrS.length; i++) {
      if (arrS[i].y === arrS[0].y){
        if (arrS[i].y > arrS[0].y) res.right = i
        else if (arrS[i].y < arrS[0].y) res.left = i
      }
    }
    if (res.left > res.right && ov.x !== 1) return new Point(-1, 0)
    else if (res.left < res.right && ov.x !== -1) return new Point(1, 0)
    else {return ov;console.log('REEEEEEEEEEE')};
  }

  if (v.x === 0) { //Moving in y direction
    for (var i = 1; i < arrS.length; i++) {
      if (v.y < 0) {
        if (arrS[i].y < arrS[0].y && posPellet.y < arrS[0].y && arrS[0].y - arrS[i].y < 6 && arrS[0].y - arrS[i].y > -1 && arrS[0].x === arrS[i].x) {
          console.log('oh no v.y < 0');
          game.snake[0].velocity = this.bestX();
          return;
        }
      } else if (v.y > 0) {
        if (arrS[i].y > arrS[0].y && posPellet.y > arrS[0].y && arrS[i].y - arrS[0].y < 6 && arrS[i].y - arrS[0].y > -1 && arrS[0].x === arrS[i].x) {
          console.log('oh no v.y > 0');
          game.snake[0].velocity = this.bestX();
          return;
        }
      }
    }
  }

  v = game.snake[0].velocity;

  /*for (var i = 1; i < arrS.length; i++) {
    if (v.y === 0) {

    }
  }*/

}
