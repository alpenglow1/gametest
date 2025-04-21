// Level configuration
export const LevelConfig = {
    1: {
        targetScore: 100,
        speedMultiplier: 1,
        hasObstacles: false,
        speeds: {
            slow: 2,
            medium: 4,
            fast: 6
        },
        carSpawnRates: {
            slow: 120, // Further increased to reduce frequency
            medium: 110,
            fast: 100
        },
        reverseLanes: {
            slow: true, // Make the slow lane reversed in level 1
            medium: false,
            fast: false
        }
    },
    2: {
        targetScore: 150,
        speedMultiplier: 1.2,
        hasObstacles: false,
        speeds: {
            slow: 4.8,
            medium: 2.4,
            fast: 7.2
        },
        carSpawnRates: {
            slow: 110, // Further increased to reduce frequency
            medium: 100,
            fast: 90
        },
        reverseLanes: {
            slow: false,
            medium: true, // Keep the medium lane reversed in level 2
            fast: false
        }
    },
    3: {
        targetScore: 150,
        speedMultiplier: 1.2,
        hasObstacles: true,
        speeds: {
            slow: 4.8,
            medium: 2.4,
            fast: 7.2
        },
        carSpawnRates: {
            slow: 100, // Further increased to reduce frequency
            medium: 90,
            fast: 80
        },
        reverseLanes: {
            slow: false,
            medium: true, // Keep the medium lane reversed in level 3
            fast: false
        }
    }
};