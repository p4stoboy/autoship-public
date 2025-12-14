// src/types/cell.ts
import { Vec2 } from './Physics';
import { BattleState } from './BattleState';


export const RARITY_NAMES: string[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

export const CORE_TYPES: string[] = ['Basic Core'];

export const DB_SHIP_CELL_PROPS: string[] = [
	'dir',
];

export type CellDomProps = {
	color: string;
	cost: number;
	type: string;
	description?: string;
}

export interface BaseCell {
	id: string;
	description?: string;
	type: string;
	seed: number;
	pos: Vec2;
	rarity: number;
	cost: number;

	// Basic properties
	mass: number;
	color: string;
	maxHealth: number;
	health: number;

	// State flags
	damaged: boolean;
	destroyed: boolean;
}

export type CellCreateFn = (seed: number) => BaseCell;
export type CellUpdateFn = (cell: BaseCell, shipId: string, battleState: BattleState) => void;
export type CellDamageFn = (cell: BaseCell, amount: number, shipId: string, battleState: BattleState) => void;
export type CellRenderFn = (ctx: CanvasRenderingContext2D, cell: BaseCell, shipRot: number) => void;
export type CellCollisionFn = (
	cell: BaseCell,
	otherCell: BaseCell,
	shipId: string,
	otherShipId: string,
	battleState: BattleState,
) => void;

export interface CellTypeRegistry {
	create: CellCreateFn;
	update: CellUpdateFn;
	damage: CellDamageFn;
	render: CellRenderFn;
	onCollision: CellCollisionFn;
}
