import { ctx, cw, ch, canvas} from '../main';
import * as menu from '../menu';

let win = false;
let ready2 = false;
let ready3 = false;

const setReady2 = (value) => {
    ready2 = value;
}

const setReady3 = (value) => {
    ready3 = value;
}

const setWin = (value) => {
    win = value;
}



const screenLevel2 = () => {
    //Level 2
    let fontHeight = 50;
    ctx.font = 50 + 'px Visitor';
    let textGameOVer = 'Level 2!';
    let textGameOverSize = ctx.measureText(textGameOVer);
    ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
    //Press Space to move to next level
    ctx.font = '20px Visitor';
    let textPressSpace = 'Press Space to start';
    let textPressSpaceSize = ctx.measureText(textPressSpace);
    ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);
    ready2 = true;
  };
  
  const screenLevel3 = () => {
    ready2 = false;
    //Level 3
    let fontHeight = 50;
    ctx.font = 50 + 'px Visitor';
    let textGameOVer = 'Level 3!';
    let textGameOverSize = ctx.measureText(textGameOVer);
    ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
    //Press Space to move to next level
    ctx.font = '20px Visitor';
    let textPressSpace = 'Press Space to start';
    let textPressSpaceSize = ctx.measureText(textPressSpace);
    ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);
  
    ready3 = true;
  };
  
  const screenEndOfGame = () => {
    ready3 = false;
    //Game over
    let fontHeight = 50;
    ctx.font = 45 + 'px Visitor';
    let textGameOVer = 'End of the game! Thanks for playing!';
    let textGameOverSize = ctx.measureText(textGameOVer);
    ctx.fillText(textGameOVer, cw / 2 - textGameOverSize.width / 2, ch / 2);
    //Press Space to restart
    ctx.font = '20px Visitor';
    let textPressSpace = 'Press Space to play again';
    let textPressSpaceSize = ctx.measureText(textPressSpace);
    ctx.fillText(textPressSpace, cw / 2 - textPressSpaceSize.width / 2, ch / 2 + fontHeight / 1.5);
    win = true;
    canvas.addEventListener('mousemove', menu.checkPosition);
    canvas.addEventListener('mouseup', menu.checkClick);
    menu.setShowMenu(true);         //menu nie jest wywoływane bo powoduje problem
  };


export {setReady2, setReady3, setWin, screenLevel2, screenLevel3, screenEndOfGame, win, ready2, ready3};