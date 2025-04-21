export class Button {
  constructor(x, y, w, h, label, isActive = true) {
    // store coordinates and size in ideal design
    this.designX = x;
    this.designY = y;
    this.designWidth = w;
    this.designHeight = h;
    this.label = label;
    this.isActive = isActive;

    // initialize cached values
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.needUpdate = true;
  }

  // check if the button location and size need to be updated
  update() {
    if (this.needUpdate) {
      this.x = window.scaler.scale(this.designX);
      this.y = window.scaler.scale(this.designY);
      this.w = window.scaler.scale(this.designWidth);
      this.h = window.scaler.scale(this.designHeight);
      this.needUpdate = false;
    }
  }

  draw(isSelected = false) {
    // update the button location and size if needed
    this.update();

    // if button is not active, draw it as disabled, otherwise fill it yellow  as active
    fill(isSelected ? [255, 255, 0] : this.isActive ? 255 : 150); // yellow if selected
    rect(this.x, this.y, this.w, this.h);

    // text color
    fill(isSelected ? 0 : this.isActive ? 0 : 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(scaler.getFontSize(20));
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  isClicked(mx, my) {
    // update the button location and size if needed
    this.update();

    return (
      this.isActive &&
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    );
  }

  // set the button size and location needed to be updated
  markForUpdate() {
    this.needUpdate = true;
  }
}
