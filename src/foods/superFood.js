import AbstractFood from './abstractFood';
import superFoodImgSrc from '../../src/foods/img/goldenApple.png';

const superFoodImg = new Image();
superFoodImg.src = superFoodImgSrc;

//Super jedzenie - zwiększa maksymalną liczbę jedzenia na planszy

class SuperFood extends AbstractFood{
    constructor (x, y, size, snake, foodManager){
        super(x, y, size, snake, foodManager);

        this.img = superFoodImg;
        this.name = 'Super Food';
    }

    eatFood() {
       this.foodManager.maxFoodCount++;
    }
    
}

export default SuperFood;