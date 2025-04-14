// src/entities/cells/basic-core/damage.ts
import { CoreCell } from './types';
import { BattleState } from '../../../types/BattleState';
import { createCoreExplosion } from './particles';


export function damageCoreCell(
	cell: CoreCell,
	amount: number,
	shipId: string,
	battleState: BattleState,
): void {
	// Skip if already destroyed
	if (cell.destroyed) return;

	// Core cells take reduced damage
	const reducedAmount = Math.max(1, Math.floor(amount * 0.5));

	// Apply damage
	cell.health -= reducedAmount;
	cell.damaged = true;

	// Check if destroyed
	if (cell.health <= 0) {
		destroyCoreCell(cell, shipId, battleState);
	}
}

export function destroyCoreCell(cell: CoreCell, shipId: string, battleState: BattleState): void {
	// Mark as destroyed
	cell.destroyed = true;
	cell.health    = 0;

	// Create explosion particles
	const ship = battleState.ships[shipId];
	if (ship) {
		createCoreExplosion(cell, ship, battleState);

		// Mark ship as basic-core-destroyed
		ship.coreDestroyed = true;
	}
}
