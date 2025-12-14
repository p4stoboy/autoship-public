// src/entities/cells/basic-gun/damage.ts
import { GunCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';
import { createGunExplosion } from './particles';


export function damageGunCell(
	baseCell: BaseCell,
	amount: number,
	shipId: string,
	battleState: BattleState,
): void {
	const cell = baseCell as GunCell;
	// Skip if already destroyed
	if (cell.destroyed) return;

	// Apply damage
	cell.health -= amount;
	cell.damaged = true;

	// Gun-specific damage effects
	// Damaged guns have slower fire rate
	const healthRatio = cell.health / cell.maxHealth;
	cell.fireRate     = Math.floor(cell.fireRate * (1 + (1 - healthRatio) * 0.5));

	// Check if destroyed
	if (cell.health <= 0) {
		destroyGunCell(cell, shipId, battleState);
	}
}

export function destroyGunCell(cell: GunCell, shipId: string, battleState: BattleState): void {
	// Mark as destroyed
	cell.destroyed = true;
	cell.health    = 0;

	// Create explosion particles
	const ship = battleState.ships[shipId];
	if (ship) {
		createGunExplosion(cell, ship, battleState);

		// Remove from ship's body
		const index = ship.body.findIndex(c => c.id === cell.id);
		if (index !== -1) {
			ship.body.splice(index, 1);
		}
	}
}
