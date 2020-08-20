import AbstractFood from './abstractFood';
import weakeningFoodImgSrc from '../../src/foods/img/rottenApple.png';

const weakeningFoodImg = new Image();
weakeningFoodImg.src = weakeningFoodImgSrc;

//Osłabiające jedzenie - po zjedzeniu przez 10 sekund ruch jest nieregularny

class WeakeningFood extends AbstractFood {
    constructor(x, y, size, snake, foodManager) {
        super(x, y, size, snake, foodManager);

        this.img = weakeningFoodImg;
        this.name = 'Weakening Food';
    }
    

    async eatFood() {
        this.irregularMove();
    }
}

export default WeakeningFood;