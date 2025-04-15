// packages/shared/src/utils/ship-utils.ts
import { BaseCell, CORE_TYPES } from '../types/Cell';
import { SHIP_SIZE } from '../types/Constants';
import { Ship } from '../types/Ship';
import { createCell } from '../entities/cells/registry';
import { BASIC_CORE } from '../entities/cells/basic-core/types';
import { giveRNG } from './determinism';


/**
 * Check if a cell is a core cell
 */
export function isCore(cell: BaseCell): boolean {
	return CORE_TYPES.includes(cell.type);
}

/**
 * Validate a ship defined by an array of cells
 */
export function validateShip(cells: BaseCell[]): { valid: boolean; message: string } {
	if (!cells || cells.length === 0) {
		return {
			valid:   false,
			message: 'Ship has no cells',
		};
	}

	// Check for core cell
	if (!hasCore(cells)) {
		return {
			valid:   false,
			message: 'Ship must have a core cell',
		};
	}

	// Check if all cells are connected
	if (!areCellsConnected(cells)) {
		return {
			valid:   false,
			message: 'All cells must be connected',
		};
	}

	return {
		valid:   true,
		message: 'Ship is valid',
	};
}

/**
 * Check if a core is present in the cells
 */
export function hasCore(cells: BaseCell[]): boolean {
	return cells.some(cell => isCore(cell));
}

/**
 * Check if all cells in the ship are connected
 * Uses a flood fill algorithm starting from the core
 */
export function areCellsConnected(cells: BaseCell[]): boolean {
	if (cells.length <= 1) return true;

	// Find the core cell
	const coreCell = cells.find(cell => isCore(cell));
	if (!coreCell) return false;

	// Run a flood fill from the core
	const visited                   = new Set<string>();
	const queue: [number, number][] = [[coreCell.pos.x, coreCell.pos.y]];

	while (queue.length > 0) {
		const [x, y] = queue.shift()!;
		const key    = `${x},${y}`;

		if (visited.has(key)) continue;
		visited.add(key);

		// Check all four adjacent cells
		const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		for (const [dx, dy] of directions) {
			const nx = x + dx;
			const ny = y + dy;

			// Check if there's a cell at this position
			const adjacentCell = cells.find(cell => cell.pos.x === nx && cell.pos.y === ny);
			if (adjacentCell) {
				queue.push([nx, ny]);
			}
		}
	}

	// Check if we visited all cells
	return visited.size === cells.length;
}

/**
 * Create a core cell for a new ship
 */
export function createCoreCell(seed: number): BaseCell {
	const coreCell  = createCell(BASIC_CORE, seed);
	coreCell.pos    = { x: 2, y: 2 }; // Center of 5x5 grid
	coreCell.rarity = 0; // Core is always common
	return coreCell;
}

/**
 * Get a clean copy of ship cells for transmission
 * Avoids circular references and removes unnecessary data
 */
export function sanitizeShipCells(cells: BaseCell[]): BaseCell[] {
	if (!cells || cells.length === 0) return [];
	return JSON.parse(JSON.stringify(cells));
}

/**
 * Find empty positions in a grid - works with any grid model that has a getCell method
 */
export function findEmptyPositions(grid: { getCell: (x: number, y: number) => BaseCell | null }): {
	x: number,
	y: number
}[] {
	const positions = [];

	for (let y = 0; y < SHIP_SIZE; y++) {
		for (let x = 0; x < SHIP_SIZE; x++) {
			// Skip the core position (2,2)
			if ((x !== 2 || y !== 2) && !grid.getCell(x, y)) {
				positions.push({ x, y });
			}
		}
	}

	return positions;
}

/**
 * Auto-place cells in a grid
 * @returns The number of cells successfully placed
 */
export function autoPlaceCells(
	grid: { placeCell: (cell: BaseCell, x: number, y: number) => boolean },
	cells: BaseCell[],
): number {
	// Find empty positions using a custom implementation since we can't directly use the grid
	const emptyPositions: { x: number, y: number }[] = [];

	for (let y = 0; y < SHIP_SIZE; y++) {
		for (let x = 0; x < SHIP_SIZE; x++) {
			// Skip the core position (2,2)
			if (x === 2 && y === 2) continue;

			// Check if position is empty by trying to place a cell
			const position = { x, y };
			emptyPositions.push(position);
		}
	}

	let placedCount = 0;

	for (let i = 0; i < Math.min(cells.length, emptyPositions.length); i++) {
		const cell = cells[i];
		const pos  = emptyPositions[i];

		// Make a deep copy to avoid modifying the original
		const cellCopy = JSON.parse(JSON.stringify(cell));
		cellCopy.pos   = { x: pos.x, y: pos.y };

		if (grid.placeCell(cellCopy, pos.x, pos.y)) {
			placedCount++;
		}
	}

	return placedCount;
}

/**
 * Check if a position has an adjacent cell in the given ship
 */
export function hasAdjacentCell(ship: Ship, x: number, y: number): boolean {
	const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

	for (const [dx, dy] of directions) {
		const nx = x + dx;
		const ny = y + dy;

		// Check if position is out of bounds
		if (nx < 0 || nx >= SHIP_SIZE || ny < 0 || ny >= SHIP_SIZE) continue;

		// Check if there's a cell at this position
		if (ship.body.some(cell => cell.pos.x === nx && cell.pos.y === ny)) {
			return true;
		}
	}

	return false;
}

/**
 * Count different cell types in a ship
 */
export function countCellTypes(cells: BaseCell[]): Record<string, number> {
	return cells.reduce((counts, cell) => {
		counts[cell.type] = (counts[cell.type] || 0) + 1;
		return counts;
	}, {} as Record<string, number>);
}

/**
 * Initialize a ship grid with a core cell (works with any grid model with placeCell method)
 */
export function initializeShipWithCore(grid: { placeCell: (cell: BaseCell, x: number, y: number) => boolean }): void {
	const seed     = giveRNG(Date.now()).giveSeed();
	const coreCell = createCoreCell(seed);
	grid.placeCell(coreCell, 2, 2); // Center of 5x5 grid
}