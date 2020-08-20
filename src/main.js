import Snake from './snake';
import Wall from './wall';
import WallCircle from './walls/wallCircle';
import FoodManager from './foodManager';
import * as menu from './menu';
import * as levelChange from './walls/levelChanger';
import backgroundSrc from '../src/walls/background.jpg';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width - 239;
export const ch = canvas.height;

let failed = false;
let screenReady2 = false;
let screenReady3 = false;
let snake = new Snake(50, 50);

let background = new Image();
background.src = backgroundSrc;

let wallsRectObject = new Wall();
let wallsCircleObject = new WallCircle();

let wallsRect = wallsRectObject.addWallsRect();
let wallsCircle = wallsCircleObject.addWallsCircle();

let fm = new FoodManager(24, snake, wallsRectObject.wallsRect, wallsCircleObject.wallsCircle);

export const gameLoop = () => {
  if (menu.showMenu === true) {
    //menu.rattle.play();
    menu.mainMenu();
    return;
  }
  ctx.drawImage(background, 0, 0);
  snake.move();
  snake.tailMove();
  wallsCircleObject.drawWalls();
  wallsRectObject.drawWalls();
  fm.manageFood();
  navbarDataUpdate();
  snake.draw();
  if (snake.onHit(wallsRectObject, wallsCircleObject)) {
    gameOver();
    return;
  }

  if (snake.tailLength >= 30 && screenReady2 === false && screenReady3 === false) {
    levelChange.screenLevel2();
    return;
  }

  if (snake.tailLength >= 40 && screenReady2 === true && screenReady3 === false) {
    levelChange.screenLevel3();
    return;
  }

  if (snake.tailLength >= 50 && screenReady3 === true) {
    levelChange.screenEndOfGame();
    return;
  }


  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

//wyświetla ekran konca gry
const gameOver = () => {
  //Game over
  let fontHeight = 50;
  ctx.font = 50 + 'px Visitor';
  let textGameOVer = 'Game Over';
  let textGameOverSize = ctx.measureText(textGameOVer);
  ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
  //Press Space to restart
  ctx.font = '20px Visitor';
  let textPressSpace = 'Press Space to restart';
  let textPressSpaceSize = ctx.measureText(textPressSpace);
  ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);

  failed = true;
};

//restartuje gre
export const gameRestart = () => {
  failed = false;
  levelChange.setReady2(false);
  levelChange.setReady3(false);
  levelChange.setWin(false);
  screenReady2 = false;
  screenReady3 = false;
  //restart obiektów
  ctx.clearRect(0, 0, cw, ch);
  snake = new Snake(50, 50);
  wallsCircleObject = new WallCircle();
  wallsRectObject = new Wall();
  wallsCircle = wallsCircleObject.addWallsCircle();
  wallsRect = wallsRectObject.addWallsRect();
  fm = new FoodManager(24, snake, wallsRect, wallsCircle);
  background = new Image();
  background.src = backgroundSrc;
  menu.rattle.play();
  //restart petli gry
  requestAnimationFrame(gameLoop);
};

const level2 = () => {
  snake = new Snake(50, 50);
  ctx.clearRect(0, 0, cw, ch);
  wallsCircleObject = new WallCircle();
  wallsRectObject = new Wall();
  wallsCircle = wallsCircleObject.addWallsCircle_level2();
  wallsRect = wallsRectObject.addWallsRect_level2();
  fm = new FoodManager(24, snake, wallsRect, wallsCircle);
  background = new Image();
  background.src = backgroundSrc;
  screenReady2 = true;
  menu.rattle.play();
  //restart petli gry
  requestAnimationFrame(gameLoop);
};

const level3 = () => {
  //ready3 = false;
  ctx.clearRect(0, 0, cw, ch);
  snake = new Snake(50, 50);
  wallsCircleObject = new WallCircle();
  wallsRectObject = new Wall();
  wallsCircle = wallsCircleObject.addWallsCircle_level3();
  wallsRect = wallsRectObject.addWallsRect_level3();
  fm = new FoodManager(24, snake, wallsRect, wallsCircle);
  background = new Image();
  background.src = backgroundSrc;
  screenReady3 = true;
  menu.rattle.play();
  //restart petli gry
  requestAnimationFrame(gameLoop);
};

canvas.addEventListener('mousemove', menu.checkPosition);
canvas.addEventListener('mouseup', menu.checkClick);

document.addEventListener('keypress', ({ keyCode }) => {
  console.log(keyCode);
  //Wyłączenie klawiszy gdy menu jest aktywne
  if (menu.showMenu === false){
  if ((keyCode === 65 || keyCode == 97) && snake.direction != 'RIGHT' && snake.prevDirection !== null) {
    snake.setDirection(snake.direction); 
    snake.setDirection('LEFT');
  }
  if ((keyCode === 68 || keyCode == 100) && snake.direction != 'LEFT') {
    snake.setprevDirection(snake.direction);
    snake.prevDirection === null ? snake.prevDirection = '' : {};
    snake.setDirection('RIGHT');
  }
  if ((keyCode === 87 || keyCode == 119) && snake.direction != 'DOWN'&& snake.prevDirection !== null) {
    snake.setprevDirection(snake.direction); 
    snake.setDirection('UP');
  }
  if ((keyCode === 83 || keyCode == 115) && snake.direction != 'UP') {
    snake.setprevDirection(snake.direction);
    snake.prevDirection === null ? snake.prevDirection = '' : {};
    snake.setDirection('DOWN');
  }
  
  //Klawisz "K" do wydłużania węża
  if (keyCode === 107 || keyCode === 75) snake.expandSnake();
  //Klawisz "M" do włączania dźwięków
  if (keyCode === 109 || keyCode === 77) {
     menu.playMusic();
  }
}
  //klawisz "R" do wyłączania menu głównego
  if (keyCode === 82 || keyCode === 114) {
    menu.setShowMenu(false);
    gameRestart();
  }
  // Spacja resetuje gre, jeżeli przegrana
  if (keyCode === 32) {
    if (failed) gameRestart();
    if (levelChange.ready2) level2();
    if (levelChange.ready3) level3();
    if (levelChange.win) gameRestart();
  }
}
);

function navbarDataUpdate() {
  document.getElementById('name').innerHTML = `${menu.playerName}`;
  document.getElementById('score-span').innerHTML = `${snake.tailLength}`;
  document.getElementById('multiplier-span').innerHTML = `${fm.multiplier}`;
}

//menu.mainMenu();
requestAnimationFrame(gameLoop);