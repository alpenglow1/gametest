// Game constants and configuration
export const GameStates = {
    MENU: 'menu',
    CHARACTER_SELECT: "character_select", 
    PLAYING: 'playing',
    PAUSED: 'paused',
    LEVEL_COMPLETE: 'levelComplete',
    GAME_OVER: 'gameOver',
    LEVEL_SELECT: 'levelSelect',
    HELP: 'help',
    AUDIO: 'audio',
    SETTINGS: 'settings' // Add settings state
};

// Keys configuration for both arrow keys and WASD
export const GameKeys = {
    LEFT: [37, 65],  // LEFT_ARROW, 'A'
    RIGHT: [39, 68], // RIGHT_ARROW, 'D'
    UP: [38, 87],    // UP_ARROW, 'W'
    DOWN: [40, 83]   // DOWN_ARROW, 'S'
};

// Function to get lane configurations based on canvas size
export function getLaneConfiguration() {
    // Calculate lanes based on proportions
    // Road is approx 40% of screen width
    const roadWidth = scaler.scale(400);
    const roadStart = scaler.scale(300);
    const laneWidth = roadWidth / 3;
    
    return {
        SLOW: { x: roadStart, width: laneWidth },
        MEDIUM: { x: roadStart + laneWidth, width: laneWidth },
        FAST: { x: roadStart + laneWidth * 2, width: laneWidth }
    };
}

// Dynamically calculate game areas dimensions
export function getGameAreas() {
    return {
        warehouse: {
            start: 0,
            width: scaler.scale(300)
        },
        road: {
            start: scaler.scale(300),
            width: scaler.scale(400)
        },
        delivery: {
            start: scaler.scale(700),
            width: scaler.scale(300)
        }
    };
}

// Pause menu buttons - will be positioned dynamically in UI
export const PauseButtons = {
    resume: { text: "Continue Game" },
    restart: { text: "Restart" },
    menu: { text: "Return to Main Menu" },
    settings: { text: "Settings" }
};

// Function to get delivery Zone
export function getDeliveryZone() {
    const deliveryZoneX = scaler.scale(800);
    const deliveryZoneY = scaler.scale(350);
    const deliveryZoneSize = scaler.scale(45);
    // const deliveryZoneX = width * 0.7 + (width * 0.3) / 2; // same as player start position
    // const deliveryZoneY = height / 2;
    // const deliveryZoneSize = 45; // temp value, should be set based on delivery spot size
    const color = [255, 255, 0, 128]; // temp value, should be set based on delivery spot color
    return {
        x: deliveryZoneX,
        y: deliveryZoneY,
        size: deliveryZoneSize,
        color: color
    };
}

// Group car types by categories
export const CAR_CATEGORIES = {
    // Slow lane vehicles
    SLOW_LANE: [
      "n-blueBus", 
      "n-darkBluesedan", 
      "n-whiteAmbulance", 
      "n-yellowBus"
    ],
    
    // Medium lane vehicles
    MEDIUM_LANE: [
      "s-darkBlueVan", 
      "s-whiteSaloonWindow", 
    ],
    
    // Fast lane vehicles
    FAST_LANE: [
      "s-greySaloon", 
      "s-whiteSaloon", 
      "s-redPoliceCar", 
      "s-yellowPoliceCar", 
      "s-redFireEngine"
    ]
};

// All car types in a flat array (for convenience)
export const ALL_CAR_TYPES = [
    ...CAR_CATEGORIES.SLOW_LANE,
    ...CAR_CATEGORIES.MEDIUM_LANE,
    ...CAR_CATEGORIES.FAST_LANE
  ];
  
  // Define dimensions for each car type
  export const CAR_PROPERTIES = {
    // Slow lane vehicles - large
    "n-blueBus": { width: 60, height: 125 },
    "n-darkBluesedan": { width: 60, height: 80 },
    "n-whiteAmbulance": { width: 60, height: 130 },
    "n-yellowBus": { width: 60, height: 150 },
    
    // Medium lane vehicles - medium size
    "s-darkBlueVan": { width: 50, height: 75 },
    
    // Fast lane vehicles - small
    "s-greySaloon": { width: 45, height: 70 },
    "s-whiteSaloon": { width: 45, height: 70 },
    "s-whiteSaloonWindow": { width: 45, height: 70 },
    "s-redPoliceCar": { width: 45, height: 80 },
    "s-yellowPoliceCar": { width: 45, height: 80 },
    "s-redFireEngine": { width: 45, height: 95 }
};