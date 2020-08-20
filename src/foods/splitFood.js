import AbstractFood from './abstractFood';
import splitFoodImgSrc from '../../src/foods/img/pinkApple.png';

const splitFoodImg = new Image();
splitFoodImg.src = splitFoodImgSrc;

// Dzielące jedzenie - skraca węża o połowę (razem z punktami);

class SplitFood extends AbstractFood {
    constructor(x, y, size, snake, foodManager) {
        super(x, y, size, snake, foodManager);

        this.img = splitFoodImg;
        this.name = 'Split Food';
    }
    

    async eatFood() {
        this.splitSnake();
    }
}

export default SplitFood;