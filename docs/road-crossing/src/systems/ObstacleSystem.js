//import
import { Obstacle } from "../entities/Obstacle.js";
import { CollisionDetector } from "../utils/CollisionDetector.js";

export class ObstacleSystem {
    constructor() {
        this.obstacles = [];
    }

    reset() {
        this.obstacles = [];
    }

    generateObstacles() {
        this.obstacles = [];
        
        // Get road information
        const roadStart = width * 0.3;
        const laneWidth = (width * 0.4) / 3;
        
        // Get x-coordinates for lane dividers
        const firstDividerX = roadStart + laneWidth;
        const secondDividerX = roadStart + laneWidth * 2;
        
        // Adjust initial positions to account for doubled height
        // Position them so they're more centered in the play area
        
        // First lane divider - single obstacle
        this.obstacles.push(new Obstacle(firstDividerX - scaler.scale(10), height * 0.25, true, 1, 1.0));
        
        // Second lane divider - single obstacle
        this.obstacles.push(new Obstacle(secondDividerX - scaler.scale(10), height * 0.5, true, -1, 1.1));
        
        console.log("Generated obstacles: ", this.obstacles.length);
    }

    update() {
        // Update all obstacles
        for (const obstacle of this.obstacles) {
            obstacle.update();
        }
    }

    checkCollisions(player) {
        return CollisionDetector.handleObstacleCollisions(player, this.obstacles);
    }

    draw() {
        for (const obstacle of this.obstacles) {
            obstacle.draw();
        }
        noStroke(); // Reset after drawing obstacles
    }
}