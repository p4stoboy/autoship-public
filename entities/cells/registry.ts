// src/entities/cells/registry.ts
import { BaseCell, CellTypeRegistry } from '../../types/Cell';
import { BattleState } from '../../types/BattleState';

// Import cell types and functions
import {
	CORE,
	createCoreCell,
	damageCoreCell,
	handleCoreCollision,
	renderCoreCell,
	updateCoreCell,
} from './core';
import {
	createHullCell,
	damageHullCell,
	handleHullCollision,
	HULL,
	renderHullCell,
	updateHullCell,
} from './hull';
import {
	createThrusterCell,
	damageThrusterCell,
	handleThrusterCollision,
	renderThrusterCell,
	THRUSTER,
	updateThrusterCell,
} from './thruster';
import {
	createGunCell,
	damageGunCell,
	GUN,
	handleGunCollision,
	renderGunCell,
	updateGunCell,
} from './gun';

// Cell type registry
export const cellTypes: Record<string, CellTypeRegistry> = {
	[CORE]: {
		create: createCoreCell as (seed: number, rarity: number) => BaseCell,
		update: updateCoreCell as (cell: BaseCell, shipId: string, battleState: BattleState) => void,
		damage: damageCoreCell as (
			cell: BaseCell,
			amount: number,
			shipId: string,
			battleState: BattleState
		) => void,
		render: renderCoreCell as (
			ctx: CanvasRenderingContext2D,
			cell: BaseCell,
			shipRot: number
		) => void,
		onCollision: handleCoreCollision as (
			cell: BaseCell,
			otherCell: BaseCell,
			shipId: string,
			otherShipId: string,
			battleState: BattleState
		) => void,
	},
	[HULL]: {
		create: createHullCell as (seed: number, rarity: number) => BaseCell,
		update: updateHullCell as (cell: BaseCell, shipId: string, battleState: BattleState) => void,
		damage: damageHullCell as (
			cell: BaseCell,
			amount: number,
			shipId: string,
			battleState: BattleState
		) => void,
		render: renderHullCell as (
			ctx: CanvasRenderingContext2D,
			cell: BaseCell,
			shipRot: number
		) => void,
		onCollision: handleHullCollision as (
			cell: BaseCell,
			otherCell: BaseCell,
			shipId: string,
			otherShipId: string,
			battleState: BattleState
		) => void,
	},
	[THRUSTER]: {
		create: createThrusterCell as (seed: number, rarity: number) => BaseCell,
		update: updateThrusterCell as (
			cell: BaseCell,
			shipId: string,
			battleState: BattleState
		) => void,
		damage: damageThrusterCell as (
			cell: BaseCell,
			amount: number,
			shipId: string,
			battleState: BattleState
		) => void,
		render: renderThrusterCell as (
			ctx: CanvasRenderingContext2D,
			cell: BaseCell,
			shipRot: number
		) => void,
		onCollision: handleThrusterCollision as (
			cell: BaseCell,
			otherCell: BaseCell,
			shipId: string,
			otherShipId: string,
			battleState: BattleState
		) => void,
	},
	[GUN]: {
		create: createGunCell as (seed: number, rarity: number) => BaseCell,
		update: updateGunCell as (cell: BaseCell, shipId: string, battleState: BattleState) => void,
		damage: damageGunCell as (
			cell: BaseCell,
			amount: number,
			shipId: string,
			battleState: BattleState
		) => void,
		render: renderGunCell as (
			ctx: CanvasRenderingContext2D,
			cell: BaseCell,
			shipRot: number
		) => void,
		onCollision: handleGunCollision as (
			cell: BaseCell,
			otherCell: BaseCell,
			shipId: string,
			otherShipId: string,
			battleState: BattleState
		) => void,
	},
};

// Function to create any cell type
export function createCell(type: string, seed: number, rarity: number = 1): BaseCell {
	const cellType = cellTypes[type];
	if (!cellType) {
		throw new Error(`Unknown cell type: ${type}`);
	}
	return cellType.create(seed, rarity);
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
	battleState: BattleState
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
	battleState: BattleState
): void {
	const cellType = cellTypes[cell.type];
	if (!cellType || !cellType.onCollision) {
		return; // Skip if no collision handler
	}
	cellType.onCollision(cell, otherCell, shipId, otherShipId, battleState);
}
