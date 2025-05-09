/**
 * Game constants
 */

export const MAX_INT32 = 2147483647 - 1;

// Arena dimensions (fixed abstract units)
export const ARENA_SIZE        = 250;
export const MAX_BATTLE_FRAMES = 3600; // 1 minute at 60fps

export const WIN_REWARD  = 20;
export const LOSE_REWARD = 5;
export const DRAW_REWARD = 10;


export const GHOST_PLAYER_ID = '00000000-0000-0000-0000-000000000000';
export const GHOST_SHIP_ID   = '00000000-0000-0000-0000-000000000000';


// Ship dimensions
export const SHIP_SIZE      = 5; // Grid size (5x5)
export const SHIP_CELL_SIZE = 10; // Physical size of each cell in abstract units

export const MIN_SHIP_CELLS = 4;
export const MAX_SHIP_CELLS = 16;

// Physics constants
export const MAX_SHIP_VELOCITY    = 4;
export const MAX_ANGULAR_VELOCITY = 0.05;

export const ARENA_BACKGROUND_COLOR = '#000000'; // Background color of the arena

export const rarityWeights                    = [50, 30, 15, 5, 1];
export const rarities: Record<string, string> = {
	Common:    '#ffffff',
	Uncommon:  '#9ad65a',
	Rare:      '#4287f5',
	Epic:      '#9642f5',
	Legendary: '#f5a142',
};

export const BASE_SERVER_URL = 'https://match.autoship.space'; // Replace with your actual server URL
