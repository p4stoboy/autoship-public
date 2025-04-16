// src/entities/cells/basic-hull/update.ts
import { HullCell } from './types';
import { BattleState } from '../../../types/BattleState';


export function updateHullCell(cell: HullCell, _shipId: string, _battleState: BattleState): void {
	// Hull cells don't have any special update behavior
	// Skip if destroyed
	if (cell.destroyed) return;
	cell.damaged = false;
	// Hull-specific update logic (if any)
}
