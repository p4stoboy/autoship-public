// src/types/cell.ts
import { Vec2 } from './Physics';
import { BattleState } from './BattleState';

export interface BaseCell {
	id: string;
	type: string;
	seed: number;
	pos: Vec2;
	rarity: number;

	// Basic properties
	mass: number;
	color: string;
	maxHealth: number;
	health: number;

	// State flags
	damaged: boolean;
	destroyed: boolean;
}

// Define the Cell Type Registry interface
export interface CellTypeRegistry {
	create: (seed: number, rarity: number) => BaseCell;
	update: (cell: BaseCell, shipId: string, battleState: BattleState) => void;
	damage: (cell: BaseCell, amount: number, shipId: string, battleState: BattleState) => void;
	render: (ctx: CanvasRenderingContext2D, cell: BaseCell, shipRot: number) => void;
	onCollision?: (
		cell: BaseCell,
		otherCell: BaseCell,
		shipId: string,
		otherShipId: string,
		battleState: BattleState
	) => void;
}
