import { getDeliveryZone } from "../config/Constants.js";

export class Player {
  // reference value in ideal design
  static designWidth = 30;
  static designHeight = 97 / 42 * Player.designWidth; // 970/420 is the aspect ratio of the player image
  static designBaseSpeed = 0.0035; // relative speed, based on the width of the screen

  constructor(x, y, playerOption = "option1") {
    //if no position available, set player at the right side of delivery area
    if (x !== null && y !== null) {
      this.relativeX = x / width;  // store relative position
      this.relativeY = y / height;
      this.x = x;
      this.y = y;
    } else {
      // default position at left of delivery zone
      const deliveryZone = getDeliveryZone();
      this.relativeX = (deliveryZone.x - scaler.scale(30)) / width;
      this.relativeY = deliveryZone.y / height;
      this.x = deliveryZone.x - scaler.scale(30);
      this.y = deliveryZone.y;
      // Respawn position is the same as the initial position
      this.respawnX = this.x;
      this.respawnY = this.y;
    }

    this.width = scaler.scale(Player.designWidth);
    this.height = scaler.scale(Player.designHeight);
    this.baseSpeed = Player.designBaseSpeed;
    this.speed = this.baseSpeed;
    this.score = 0;
    this.hasItem = false;
    this.currentItem = null;
    this.playerOption = playerOption || "option1"; // default character option1
    this.isFlipped = false; // if player is flipped
    this.isHit = false; // Whether hit by a car
    this.hitTime = 0; // Time when hit
    this.hitDuration = 300; // Duration of lying down (milliseconds)
    // Lying down image aspect ratio
    this.lyingWidth = this.height;
    this.lyingHeight = this.width;

    // Walking animation related
    this.animationFrame = 0; // Current animation frame
    this.walkingDelay = 200; // Walking animation frame switch delay (milliseconds)
    this.lastFrameTime = 0; // Last frame switch time
    this.isMoving = false; // Whether is moving
    this.lastX = this.x; // Last frame X coordinate (already scaled)
    this.lastY = this.y; // Last frame Y coordinate (already scaled)
  }

  reset() {
    const deliveryZone = getDeliveryZone();
    this.relativeX = (deliveryZone.x - scaler.scale(30)) / width;
    this.relativeY = deliveryZone.y / height;
    this.x = deliveryZone.x - scaler.scale(30);
    this.y = deliveryZone.y;
    this.respawnX = this.x;
    this.respawnY = this.y;

    this.speed = this.baseSpeed;
    this.score = 0;
    this.hasItem = false;
    this.currentItem = null;
    this.isHit = false;
    this.animationFrame = 0;
    this.lastFrameTime = 0;
  }

  resetPosition() {
    // record the respawn position
    const deliveryZone = getDeliveryZone();
    this.respawnX = deliveryZone.x - scaler.scale(30);
    this.respawnY = deliveryZone.y;

    // Set hit state and record hit time, but keep current position and direction
    this.isHit = true;
    this.hitTime = millis();
  }

  updateSizeAndPosition() {
    // Update player size based on scaling
    this.width = scaler.scale(Player.designWidth);
    this.height = scaler.scale(Player.designHeight);
    this.lyingWidth = this.height;
    this.lyingHeight = this.width;

    // Update position based on relative coordinates
    this.x = width * this.relativeX;
    this.y = height * this.relativeY;
  }

  update(keys) {
    // Save previous frame position to detect movement
    this.lastX = this.x;
    this.lastY = this.y;

    // Check if hit state is over
    if (this.isHit) {
      if (millis() - this.hitTime > this.hitDuration) {
        this.isHit = false;
        // After hit state ends, teleport to respawn point
        this.relativeX = this.respawnX / width;
        this.relativeY = this.respawnY / height;
        // Update position immediately so the walking animation can be played in respawn position rather than the hit position
        this.x = this.respawnX;
        this.y = this.respawnY;
      }
      this.isMoving = false; // Keep isMoving false during hit state
      return; // Can't move in hit state
    }

    // Check both arrow keys and WASD keys
    if (keys[LEFT_ARROW] || keys[65]) { // LEFT_ARROW or 'A'
      this.relativeX = Math.max(0, this.relativeX - this.speed);
      this.x = width * this.relativeX;
      this.isFlipped = false;
    }
    if (keys[RIGHT_ARROW] || keys[68]) { // RIGHT_ARROW or 'D'
      this.relativeX = Math.min(1 - this.width / width, this.relativeX + this.speed);
      this.x = width * this.relativeX;
      this.isFlipped = true;
    }
    if (keys[UP_ARROW] || keys[87]) { // UP_ARROW or 'W'
      this.relativeY = Math.max(0, this.relativeY - this.speed);
      this.y = height * this.relativeY;
    }
    if (keys[DOWN_ARROW] || keys[83]) { // DOWN_ARROW or 'S'
      this.relativeY = Math.min(1 - this.height / height, this.relativeY + this.speed);
      this.y = height * this.relativeY;
    }

    // Detect whether moving
    this.isMoving = (this.x !== this.lastX || this.y !== this.lastY);
    
    // Update animation frame
    if (this.isMoving) {
      const currentTime = millis();
      if (currentTime - this.lastFrameTime > this.walkingDelay) {
        this.animationFrame = (this.animationFrame + 1) % 2; // Toggle between 0 and 1
        this.lastFrameTime = currentTime;
      }
    } else {
      this.animationFrame = 0; // Reset to standing frame when not moving
    }
  }

  draw() {
    push(); // Save current drawing style

    if (this.isHit) {
      if (this.playerOption === "option1") {
        // Use inverted images and keep the aspect ratio
        const drawWidth = this.lyingWidth;
        const drawHeight = this.lyingHeight;
        
        // Drawing using CORNER mode, consistent with walking pictures

        imageMode(CORNER);
        
        if (this.isFlipped) {
          push();
          scale(-1, 1);
          image(
            assetManager.getImage("player1Lying"),
            -this.x - drawWidth, 
            this.y,
            drawWidth,
            drawHeight
          );
          pop();
        } else {

          image(
            assetManager.getImage("player1Lying"),
            this.x,
            this.y,
            drawWidth,
            drawHeight
          );
        }
      } else if (this.playerOption === "option2") {

        const lyingScale = this.width / 30; 
        const drawWidth = this.lyingWidth * lyingScale;
        const drawHeight = this.lyingHeight * lyingScale;
        
        imageMode(CORNER);
        
        if (this.isFlipped) {
          push();
          scale(-1, 1); 
          image(
            assetManager.getImage("player2Lying"),
            -this.x - drawWidth, 
            this.y,
            drawWidth,
            drawHeight
          );
          pop();
        } else {
          image(
            assetManager.getImage("player2Lying"),
            this.x,
            this.y,
            drawWidth,
            drawHeight
          );
        }
      }
    } else if (this.playerOption === "option1") {
      imageMode(CORNER); 
      
      // Get aspect ratio information for both image types
      const walkingRatio = assetManager.images["player1WalkingRatio"] || { ratio: 97/42 };
      const sideViewRatio = assetManager.images["player1SideViewRatio"] || { ratio: walkingRatio.ratio };
      
      // Choose different images based on whether player is holding an item
      if (this.hasItem) {
        if (this.isFlipped) {
          scale(-1, 1); // Horizontal Flip
          
          // Select different images according to the animation frame
          if (this.isMoving && this.animationFrame === 1) {
            image(
              assetManager.getImage("player1WalkingWithCargo"),
              -this.x - this.width, // flipped x coordinate
              this.y,
              this.width,
              this.height
            );
          } else {
            image(
              assetManager.getImage("player1WithCargo"),
              -this.x - this.width, // flipped x coordinate
              this.y,
              this.width,
              this.height
            );
          }
        } else {
          
          if (this.isMoving && this.animationFrame === 1) {
            image(
              assetManager.getImage("player1WalkingWithCargo"),
              this.x,
              this.y,
              this.width,
              this.height
            );
          } else {
            image(
              assetManager.getImage("player1WithCargo"),
              this.x,
              this.y,
              this.width,
              this.height
            );
          }
        }
      } else {
        // Walking animation when not carrying items
        if (this.isFlipped) {
          // Facing right - use right-facing image, alternating when moving
          if (this.isMoving) {
            // Alternate between two images based on animation frame
            if (this.animationFrame === 0) {
              // First frame - use right-facing image
              const drawHeight = this.height;
              const drawWidth = drawHeight * sideViewRatio.ratio;
              
              image(
                assetManager.getImage("player1SideView"),
                this.x,
                this.y,
                drawWidth,
                drawHeight
              );
            } else {
              // Second frame - use flipped left-facing walking image
              push();
              scale(-1, 1); // Horizontal flip
              
              const drawHeight = this.height;
              const drawWidth = drawHeight * walkingRatio.ratio;
              
              image(
                assetManager.getImage("player1Walking"),
                -this.x - drawWidth, 
                this.y,
                drawWidth,
                drawHeight
              );
              pop(); // Restore transformation
            }
          } else {
            // Static - use right-facing standing image
            const drawHeight = this.height;
            const drawWidth = drawHeight * sideViewRatio.ratio;
            
            image(
              assetManager.getImage("player1SideView"),
              this.x,
              this.y,
              drawWidth,
              drawHeight
            );
          }
        } else {
          // Facing left - alternate between walking image and flipped right-facing image
          if (this.isMoving) {
            // Alternate between two images based on animation frame
            if (this.animationFrame === 0) {
              // First frame - use walking image
              const drawHeight = this.height;
              const drawWidth = drawHeight * walkingRatio.ratio;
              
              image(
                assetManager.getImage("player1Walking"),
                this.x,
                this.y,
                drawWidth,
                drawHeight
              );
            } else {
              // Second frame - flip right-facing image
              push();
              scale(-1, 1); // Horizontal flip
              
              // Calculate size based on SideView image ratio
              const drawHeight = this.height;
              const drawWidth = drawHeight * sideViewRatio.ratio;
              
              image(
                assetManager.getImage("player1SideView"),
                -this.x - drawWidth, // Adjust the flip coordinates according to the actual width
                this.y,
                drawWidth,
                drawHeight
              );
              pop(); // Restore transformation to avoid affecting subsequent drawing
            }
          } else {
            // Static - use right-facing standing image, but flipped
            push();
            scale(-1, 1); // Horizontal flip
            
            const drawHeight = this.height;
            const drawWidth = drawHeight * sideViewRatio.ratio;
            
            image(
              assetManager.getImage("player1SideView"),
              -this.x - drawWidth, 
              this.y,
              drawWidth,
              drawHeight
            );
            pop(); // Restore transformation
          }
        }
      }
    } else if (this.playerOption === "option2") {
      imageMode(CORNER); 
      
      // Get aspect ratio information for both image types
      const walkingRatio = assetManager.images["player2WalkingRatio"] || { ratio: 97/42 };
      const sideViewRatio = assetManager.images["player2SideViewRatio"] || { ratio: walkingRatio.ratio };
      
      // Choose different images based on whether player is holding an item
      if (this.hasItem) {
        if (this.isFlipped) {
          scale(-1, 1); 
          
          
          if (this.isMoving && this.animationFrame === 1) {
            image(
              assetManager.getImage("player2WalkingWithCargo"),
              -this.x - this.width, // flipped x coordinate
              this.y,
              this.width,
              this.height
            );
          } else {
            image(
              assetManager.getImage("player2WithCargo"),
              -this.x - this.width, // flipped x coordinate
              this.y,
              this.width,
              this.height
            );
          }
        } else {
          
          if (this.isMoving && this.animationFrame === 1) {
            image(
              assetManager.getImage("player2WalkingWithCargo"),
              this.x,
              this.y,
              this.width,
              this.height
            );
          } else {
            image(
              assetManager.getImage("player2WithCargo"),
              this.x,
              this.y,
              this.width,
              this.height
            );
          }
        }
      } else {
        // Walking animation when not carrying items
        if (this.isFlipped) {
          // Facing right - use right-facing image, alternating when moving
          if (this.isMoving) {
            // Alternate between two images based on animation frame
            if (this.animationFrame === 0) {
              // First frame - use right-facing image
              const drawHeight = this.height;
              const drawWidth = drawHeight * sideViewRatio.ratio;
              
              image(
                assetManager.getImage("player2SideView"),
                this.x,
                this.y,
                drawWidth,
                drawHeight
              );
            } else {
              // Second frame - use flipped left-facing walking image
              push();
              scale(-1, 1); // Horizontal flip
              
              const drawHeight = this.height;
              const drawWidth = drawHeight * walkingRatio.ratio;
              
              image(
                assetManager.getImage("player2Walking"),
                -this.x - drawWidth, // 根据实际宽度调整翻转坐标
                this.y,
                drawWidth,
                drawHeight
              );
              pop(); // Restore transformation
            }
          } else {
            // Static - use right-facing standing image
            const drawHeight = this.height;
            const drawWidth = drawHeight * sideViewRatio.ratio;
            
            image(
              assetManager.getImage("player2SideView"),
              this.x,
              this.y,
              drawWidth,
              drawHeight
            );
          }
        } else {
          // Facing left - alternate between walking image and flipped right-facing image
          if (this.isMoving) {
            // Alternate between two images based on animation frame
            if (this.animationFrame === 0) {
              // First frame - use walking image
              const drawHeight = this.height;
              const drawWidth = drawHeight * walkingRatio.ratio;
              
              image(
                assetManager.getImage("player2Walking"),
                this.x,
                this.y,
                drawWidth,
                drawHeight
              );
            } else {
              // Second frame - flip right-facing image
              push();
              scale(-1, 1); // Horizontal flip
              
              // Calculate size based on SideView image ratio
              const drawHeight = this.height;
              const drawWidth = drawHeight * sideViewRatio.ratio;
              
              image(
                assetManager.getImage("player2SideView"),
                -this.x - drawWidth, 
                this.y,
                drawWidth,
                drawHeight
              );
              pop(); // Restore transformation to avoid affecting subsequent drawing
            }
          } else {
            // Static - use right-facing standing image, but flipped
            push();
            scale(-1, 1); // Horizontal flip
            
            const drawHeight = this.height;
            const drawWidth = drawHeight * sideViewRatio.ratio;
            
            image(
              assetManager.getImage("player2SideView"),
              -this.x - drawWidth, 
              this.y,
              drawWidth,
              drawHeight
            );
            pop(); // Restore transformation
          }
        }
      }
    }
    pop(); // restore drawing style
  }

  pickupItem(item) {
    this.hasItem = true;
    this.currentItem = item;
    // Adjust speed based on item weight - speed decreases as weight increases
    // With weight range 1-5, speed will be between 3.5 and 2.0
    this.speed = this.baseSpeed * (1 - item.weight * 0.1);
  }

  dropItem() {
    const droppedItem = this.currentItem;
    this.hasItem = false;
    this.currentItem = null;
    // Reset speed
    this.speed = this.baseSpeed;
    return droppedItem;
  }

  deliverItem() {
    const deliveredItem = this.currentItem;
    this.score += deliveredItem.value;
    this.hasItem = false;
    this.currentItem = null;
    // Reset speed
    this.speed = this.baseSpeed;
    return deliveredItem;
  }
}
