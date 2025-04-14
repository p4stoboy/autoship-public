// src/entities/cells/basic-hull/collision.ts
import { HullCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';


export function handleHullCollision(
	_cell: HullCell,
	_otherCell: BaseCell,
	_shipId: string,
	_otherShipId: string,
	_battleState: BattleState,
): void {
	// Hull cells could have collision-specific behavior
	// For now, nothing special happens
}
