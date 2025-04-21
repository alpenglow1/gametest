import { getDeliveryZone } from "../config/Constants.js";

export class CollisionDetector {
  // Check collision between player and car / obstacle
  static checkPlayerRectCollision(player, rect) {
    // use relative coordinates for collision detection
    const playerRelativeX = player.x / width;
    const playerRelativeY = player.y / height;
    const playerRelativeWidth = player.width / width;
    const playerRelativeHeight = player.height / height;
    
    const rectRelativeX = rect.x / width;
    const rectRelativeY = rect.y / height;
    const rectRelativeWidth = rect.width / width;
    const rectRelativeHeight = rect.height / height;
    
    return (
      playerRelativeX < rectRelativeX + rectRelativeWidth && // player left edge < car right edge
      playerRelativeX + playerRelativeWidth > rectRelativeX && // player right edge > car left edge
      playerRelativeY + (playerRelativeHeight / 3) < rectRelativeY + rectRelativeHeight && // player 2 third top edge < car bottom edge
      playerRelativeY + playerRelativeHeight > rectRelativeY // player bottom edge > car top edge
    );
  }

  // Check if player is in picking distance of an item
  static checkPlayerItemProximity(player, item) {
    // use relative coordinates for picking distance detection
    const itemSize = scaler.scale(item.designSize);
    const playerRelativeX = player.x / width;
    const playerRelativeY = player.y / height;
    const playerRelativeWidth = player.width / width;
    const playerRelativeHeight = player.height / height;
    
    return (
      item.relativeX < playerRelativeX + playerRelativeWidth &&
      item.relativeX + (itemSize / width) > playerRelativeX &&
      item.relativeY < playerRelativeY + playerRelativeHeight &&
      item.relativeY + (itemSize / height) > playerRelativeY
    );
  }

  // Check if player is in delivery zone
  static isInDeliveryZone(player) {
    const deliveryZone = getDeliveryZone();
    // logic changed to similar with checkPlayerRectCollision()
    return (
      player.x < deliveryZone.x + deliveryZone.size &&
      player.x + player.width > deliveryZone.x &&
      player.y < deliveryZone.y + deliveryZone.size &&
      player.y + player.height > deliveryZone.y
    );
  }

  // Check for collision between player and all cars
  static checkCarCollisions(player, cars) {
    for (const laneType in cars) {
      for (const car of cars[laneType]) {
        if (this.checkPlayerRectCollision(player, car)) {
          return true;
        }
      }
    }
    return false;
  }

  // Check for collision between player and obstacles
  static handleObstacleCollisions(player, obstacles) {
    for (const obstacle of obstacles) {
      if (this.checkPlayerRectCollision(player, obstacle)) {
        // if collision, push player to the side with less horizontal penetration
        // calculate relative position between player and obstacle
        const playerRight = player.x + player.width;
        const obstacleRight = obstacle.x + obstacle.width;
        // calculate horizontal penetration distance between player and obstacle
        const leftPenetration = obstacleRight - player.x; // player.x is the left edge of player
        const rightPenetration = playerRight - obstacle.x; // obstacle.x is the right edge of obstacle
        // push player to the side with less penetration
        if (leftPenetration < rightPenetration) {
          player.x = obstacleRight; // push player to the right side of obstacle
        } else {
          player.x = obstacle.x - player.width; // push player to the left side of obstacle
        }

        // update relative position of player
        player.relativeX = player.x / width;
        player.relativeY = player.y / height;

        return true;
      }
    }
    return false;
  }
}
