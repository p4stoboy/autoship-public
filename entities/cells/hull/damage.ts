// src/entities/cells/hull/damage.ts
import { HullCell } from './types';
import { BattleState } from '../../../types/BattleState.ts';
import { createHullExplosion } from './particles.ts';


export function damageHullCell(
	cell: HullCell,
	amount: number,
	shipId: string,
	battleState: BattleState,
): void {
	// Skip if already destroyed
	if (cell.destroyed) return;

	// Apply damage
	cell.health -= amount;
	cell.damaged = true;

	// Check if destroyed
	if (cell.health <= 0) {
		destroyHullCell(cell, shipId, battleState);
	}
}

export function destroyHullCell(
	cell: HullCell,
	shipId: string,
	battleState: BattleState,
): void {
	// Mark as destroyed
	cell.destroyed = true;
	cell.health    = 0;

	// Create explosion particles
	const ship = battleState.ships[shipId];
	if (ship) {
		createHullExplosion(cell, ship, battleState);

		// Remove from ship's body
		const index = ship.body.findIndex(c => c.id === cell.id);
		if (index !== -1) {
			ship.body.splice(index, 1);
		}
	}
}