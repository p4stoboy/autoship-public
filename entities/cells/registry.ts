// src/entities/cells/registry.ts
import { BaseCell, CellTypeRegistry } from '../../types/Cell';
import { BattleState } from '../../types/BattleState';

// Import cell types and functions
import {
	BASIC_CORE,
	createCoreCell,
	damageCoreCell,
	handleCoreCollision,
	renderCoreCell,
	updateCoreCell,
} from './basic-core';
import {
	BASIC_HULL,
	createHullCell,
	damageHullCell,
	handleHullCollision,
	renderHullCell,
	updateHullCell,
} from './basic-hull';
import {
	BASIC_THRUSTER,
	createThrusterCell,
	damageThrusterCell,
	handleThrusterCollision,
	renderThrusterCell,
	updateThrusterCell,
} from './basic-thruster';
import {
	BASIC_GUN,
	createGunCell,
	damageGunCell,
	handleGunCollision,
	renderGunCell,
	updateGunCell,
} from './basic-gun';


export const cellTypeNames = [
	BASIC_CORE,
	BASIC_HULL,
	BASIC_THRUSTER,
	BASIC_GUN,
];

export const cellTypes: Record<string, CellTypeRegistry> = {
	[BASIC_CORE]:     {
		create:      createCoreCell,
		update:      updateCoreCell,
		damage:      damageCoreCell,
		render:      renderCoreCell,
		onCollision: handleCoreCollision,
	},
	[BASIC_HULL]:     {
		create:      createHullCell,
		update:      updateHullCell,
		damage:      damageHullCell,
		render:      renderHullCell,
		onCollision: handleHullCollision,
	},
	[BASIC_THRUSTER]: {
		create:      createThrusterCell,
		update:      updateThrusterCell,
		damage:      damageThrusterCell,
		render:      renderThrusterCell,
		onCollision: handleThrusterCollision,
	},
	[BASIC_GUN]:      {
		create:      createGunCell,
		update:      updateGunCell,
		damage:      damageGunCell,
		render:      renderGunCell,
		onCollision: handleGunCollision,
	},
};

// Function to create any cell type
export function createCell(type: string, seed: number): BaseCell {
	const cellType = cellTypes[type];
	if (!cellType) {
		throw new Error(`Unknown cell type: ${type}`);
	}
	return cellType.create(seed);
}

// Function to update any cell
export function updateCell(cell: BaseCell, shipId: string, battleState: BattleState): void {
	const cellType = cellTypes[cell.type];
	if (!cellType) {
		throw new Error(`Unknown cell type: ${cell.type}`);
	}
	cellType.update(cell, shipId, battleState);
}

// Function to damage any cell
export function damageCell(
	cell: BaseCell,
	amount: number,
	shipId: string,
	battleState: BattleState,
): void {
	const cellType = cellTypes[cell.type];
	if (!cellType) {
		throw new Error(`Unknown cell type: ${cell.type}`);
	}
	cellType.damage(cell, amount, shipId, battleState);
}

// Function to render any cell
export function renderCell(ctx: CanvasRenderingContext2D, cell: BaseCell, shipRot: number): void {
	const cellType = cellTypes[cell.type];
	if (!cellType) {
		throw new Error(`Unknown cell type: ${cell.type}`);
	}
	cellType.render(ctx, cell, shipRot);
}

// Function to handle collision for any cell
export function handleCellCollision(
	cell: BaseCell,
	otherCell: BaseCell,
	shipId: string,
	otherShipId: string,
	battleState: BattleState,
): void {
	const cellType = cellTypes[cell.type];
	if (!cellType || !cellType.onCollision) {
		return; // Skip if no collision handler
	}
	cellType.onCollision(cell, otherCell, shipId, otherShipId, battleState);
}
