// src/entities/cells/hull/collision.ts
import { HullCell } from './types';
import { BaseCell } from '../../../types/Cell.ts';
import { BattleState } from '../../../types/BattleState.ts';


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