import { getDeliveryZone } from "../config/Constants.js";

export class Item {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.relativeX = x / width; // store relative position
        this.relativeY = y / height;
        this.value = value || floor(random(10, 50));
        this.designSize = 25; // default size for item in ideal design
        
        // Calculate weight based on value (between 1 and 5)
        // Higher value items are heavier
        this.weight = map(this.value, 10, 50, 1, 5);
        this.weight = constrain(this.weight, 1, 5);
    }

    draw() {
        // fixed size for item, with scaler to adjust based on canvas size
        const displaySize = scaler.scale(this.designSize);
        
        image(assetManager.getImage("cargoUncollected"), this.x, this.y, displaySize, displaySize);

        fill(0); // set text color to black
        textSize(scaler.getFontSize(12)); // set font size based on canvas size
        text(this.value, this.x, this.y);
        textAlign(CENTER, TOP); // text alignment to center top of the item image
    }

    static drawDelivered(items) {
        for (let i = 0; i < items.length; i++) {
            // Get delivery area position
            const deliveryZone = getDeliveryZone();
            // Stacked display above the drop zone
            const displayX = deliveryZone.x + scaler.scale(10);
            const displayY = deliveryZone.y + scaler.scale(5) - i * scaler.scale(18);
            const displaySize = scaler.scale(25);
            
            image(assetManager.getImage("cargoUncollected"), displayX, displayY, displaySize, displaySize);
        }
    }

    update() {
        // Update position based on relative coordinates
        this.x = width * this.relativeX;
        this.y = height * this.relativeY;
        
        // fill(0); // set text color to black
        // textSize(scaler.getFontSize(12)); // set font size based on canvas size
        // text(this.value, this.x, this.y);
        // textAlign(CENTER, TOP); // text alignment to center top of the item image
    }
}