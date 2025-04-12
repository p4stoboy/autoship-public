// src/entities/cells/hull/update.ts
import { HullCell } from './types';
import { BattleState } from '../../../types/BattleState';

export function updateHullCell(cell: HullCell, _shipId: string, _battleState: BattleState): void {
	// Hull cells don't have any special update behavior
	// Skip if destroyed
	if (cell.destroyed) return;

	// Hull-specific update logic (if any)
}
