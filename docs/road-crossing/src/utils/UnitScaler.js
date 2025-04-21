export class UnitScaler {
    constructor(referenceWidth = 1000, referenceHeight = 750) {
        this.referenceWidth = referenceWidth;
        this.referenceHeight = referenceHeight;
        this.unit = 1; // default value, will be updated in resize()
        this.centerX = 0;
        this.centerY = 0;
    }

    resize(canvasWidth, canvasHeight) {
        // calculate the scaling unit based on the reference size
        this.unit = Math.min(
            canvasWidth / this.referenceWidth,
            canvasHeight / this.referenceHeight
        );

        // update the center point of canvas
        this.centerX = canvasWidth / 2;
        this.centerY = canvasHeight / 2;

        return this.unit;
    }
    
    // zoom in/out a value
    scale(value) {
      return value * this.unit;
    }

    // get a proper font size to ensure the minimum readability
    getFontSize(size) {
        return Math.max(this.scale(size), 10); // at least 10px
    }
    
    // // zoom in/out X coordinate
    // scaleX(x) {
    //     return x * this.unit;
    // }
    
    // // zoom in/out Y coordinate
    // scaleY(y) {
    //     return y * this.unit;
    // }
    
    // // get scaled rectangle (x, y, width, height)
    // getRect(x, y, width, height) {
    //     return {
    //         x: this.scaleX(x),
    //         y: this.scaleY(y),
    //         width: this.scale(width),
    //         height: this.scale(height)
    //     };
    // }
    
    // // center align element's X coordinate
    // centerXPos(width) {
    //     return this.centerX - (this.scale(width) / 2);
    // }
    
    // // center align element's Y coordinate
    // centerYPos(height) {
    //     return this.centerY - (this.scale(height) / 2);
    // }
}
