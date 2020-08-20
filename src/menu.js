import { ctx, cw, ch, canvas, gameLoop} from './main';
import bgImageSrc from '../src/menu-img/background.jpg';
import logoImageSrc from '../src/menu-img/logo.png';
import playImageSrc from '../src/menu-img/play.png';
import settingsImageSrc from '../src/menu-img/settings.png';
import creditsImageSrc from '../src/menu-img/credits.png';
import playActiveImageSrc from '../src/menu-img/play-active.png';
import settingsActiveImageSrc from '../src/menu-img/settings-active.png';
import creditsActiveImageSrc from '../src/menu-img/credits-active.png';
//import audioSrc from '../src/menu-img/audio.mp3';
//import rattlesnakeSrc from '../src/menu-img/rattlesnake.mp3';

let audio = new Audio(require('../src/menu-img/audio.mp3'));
//audioSrc = '../src/menu-img/audio.mp3';
//audio.src = audioSrc;
let playSound = false;

let rattle = new Audio(require('../src/menu-img/rattlesnake.mp3'));
//rattle.src = '../src/menu-img/rattlesnake.mp3'
//rattle.src = rattlesnakeSrc;

let mouseX;
let mouseY;

let playerName = 'Gamer';
let showMenu = true;
let bgImage = new Image();
let logoImage = new Image();
let playImage = new Image();
let settingsImage = new Image();
let creditsImage = new Image();
let playActiveImage = new Image();
let settingsActiveImage = new Image();
let creditsActiveImage = new Image();

bgImage.src = bgImageSrc;
logoImage.src = logoImageSrc;
playImage.src = playImageSrc;
settingsImage.src = settingsImageSrc;
creditsImage.src = creditsImageSrc;
playActiveImage.src = playActiveImageSrc;
settingsActiveImage.src = settingsActiveImageSrc;
creditsActiveImage.src = creditsActiveImageSrc;

let buttonX = [384, 298, 320];
let buttonY = [300, 380, 460];
let buttonWidth = [192, 364, 320];
let buttonHeight = [80, 80, 80];
let buttonActive = [false, false, false];

const mainMenu = () => {
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(bgImage, 0, 0);
  ctx.drawImage(logoImage, 400, 50);
  ctx.drawImage(playImage, buttonX[0], buttonY[0]);
  ctx.drawImage(settingsImage, buttonX[1], buttonY[1]);
  ctx.drawImage(creditsImage, buttonX[2], buttonY[2]);
  if (buttonActive[0]) ctx.drawImage(playActiveImage, buttonX[0], buttonY[0]);
  if (buttonActive[1]) ctx.drawImage(settingsActiveImage, buttonX[1], buttonY[1]);
  if (buttonActive[2]) ctx.drawImage(creditsActiveImage, buttonX[2], buttonY[2]);
  requestAnimationFrame(gameLoop);
  
};

const checkPosition = mouseEvent => {
  mouseX = mouseEvent.pageX - canvas.getBoundingClientRect().left;
  mouseY = mouseEvent.pageY - canvas.getBoundingClientRect().top;
  //Test pozycji myszy
  //console.log("X: " + mouseX + ", Y: " + mouseY);
  for (let i = 0; i < buttonX.length; i++) {
    if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
      if (mouseY > buttonY[i] + 20 && mouseY < buttonY[i] + buttonHeight[i] - 10) {
        buttonActive[i] = true;
      } else {
        buttonActive[i] = false;
      }
    } else {
      buttonActive[i] = false;
    }
  }
};

const checkClick = () => {
  for (let i = 0; i < buttonX.length; i++) {
    if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
      if (mouseY > buttonY[i] + 20 && mouseY < buttonY[i] + buttonHeight[i] - 10) {
        if (buttonActive[0]) {
          console.log('play');
          showMenu = false;
          canvas.removeEventListener('mousemove', checkPosition);
          canvas.removeEventListener('mouseup', checkClick);
        }
        if (buttonActive[1]) {
          console.log('settings');
          toggleModalSettings();
        }
        if (buttonActive[2]) {
          console.log('credits');
          toggleModalCredits();
        }
      }
    }
  }
};

 const playMusic = () => {
   playSound = !playSound;
   if (!playSound) audio.pause();
   if (playSound) audio.play();
 };

//okna modalne
let modalSettings = document.querySelector('.modalSettings');
let closeButtonSettings = document.querySelector('.close-button-settings');
let modalCredits = document.querySelector('.modalCredits');
let closeButtonCredits = document.querySelector('.close-button-credits');

const toggleModalSettings = () => {
  modalSettings.classList.toggle('show-modal');
  playerName = document.getElementById('playerName').value;
};

const toggleModalCredits = () => {
  modalCredits.classList.toggle('show-modal');
};

const windowOnClick = event => {
  if (event.target === modalSettings) {
    toggleModalSettings();
  }
  if (event.target === modalCredits) {
    toggleModalCredits();
  }
};

const setShowMenu = value => {
  showMenu = value;
};


closeButtonSettings.addEventListener('click', toggleModalSettings);
closeButtonCredits.addEventListener('click', toggleModalCredits);
window.addEventListener('click', windowOnClick);



export {mainMenu, checkPosition, checkClick, playMusic, setShowMenu, showMenu, playSound, playerName, rattle};
