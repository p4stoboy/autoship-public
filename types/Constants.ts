/**
 * Game constants
 */

// Arena dimensions (fixed abstract units)
export const ARENA_SIZE = 250;

// Ship dimensions
export const SHIP_SIZE = 5; // Grid size (5x5)
export const SHIP_CELL_SIZE = 10; // Physical size of each cell in abstract units

// Physics constants
export const MAX_SHIP_VELOCITY = 4;
export const MAX_ANGULAR_VELOCITY = 0.05;

export const ARENA_BACKGROUND_COLOR = '#000000'; // Background color of the arena

export const rarityWeights = [50, 30, 15, 5, 1];
export const rarities: Record<string, string> = {
	Common: '#ffffff',
	Uncommon: '#9ad65a',
	Rare: '#4287f5',
	Epic: '#9642f5',
	Legendary: '#f5a142',
};
