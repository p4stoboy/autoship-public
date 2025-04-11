// src/entities/cells/thruster/damage.ts
import { ThrusterCell } from './types';
import { BattleState } from '../../../types/BattleState.ts';
import { createThrusterExplosion } from './particles';


export function damageThrusterCell(
	cell: ThrusterCell,
	amount: number,
	shipId: string,
	battleState: BattleState,
): void {
	// Skip if already destroyed
	if (cell.destroyed) return;

	// Apply damage
	cell.health -= amount;
	cell.damaged = true;

	// Reduce thruster power based on damage
	const healthRatio = cell.health / cell.maxHealth;
	cell.power        = cell.power * Math.max(0.2, healthRatio);

	// Check if destroyed
	if (cell.health <= 0) {
		destroyThrusterCell(cell, shipId, battleState);
	}
}

export function destroyThrusterCell(
	cell: ThrusterCell,
	shipId: string,
	battleState: BattleState,
): void {
	// Mark as destroyed
	cell.destroyed = true;
	cell.health    = 0;

	// Create explosion particles
	const ship = battleState.ships[shipId];
	if (ship) {
		createThrusterExplosion(cell, ship, battleState);

		// Remove from ship's body
		const index = ship.body.findIndex(c => c.id === cell.id);
		if (index !== -1) {
			ship.body.splice(index, 1);
		}
	}
}