import { CAR_PROPERTIES } from "../config/Constants.js";

export class Car {
    constructor(x, y, speed, direction, carType) {
            this.x = x;
            this.y = y;
            this.speed = speed; // Use the lane speed directly
            this.carType = carType; // Car type must be provided
            
            // Get properties for this car type
            const properties = CAR_PROPERTIES[this.carType];
            this.width = properties.width;
            this.height = properties.height;
            
            this.direction = direction || 1; // 1 = down, -1 = up
        }
    
        // Other methods remain the same
        update() {
            this.y += this.speed * this.direction;
        }

    draw() {
    let carImg = assetManager.getImage(this.carType);
    image(carImg, this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        return (this.direction === 1 && this.y > height + this.height) || 
               (this.direction === -1 && this.y < -this.height);
    }
}