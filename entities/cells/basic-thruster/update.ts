// src/entities/cells/basic-thruster/update.ts
import { ThrusterCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';
import { applyThrusterForce } from './physics';
import { createThrusterParticles } from './particles';


export function updateThrusterCell(
	baseCell: BaseCell,
	shipId: string,
	battleState: BattleState,
): void {
	const cell = baseCell as ThrusterCell;
	// Skip if destroyed
	if (cell.destroyed) return;
	cell.damaged   = false;
	// Check if basic-thruster should be firing this frame
	const isActive = true; //battleState.frame % cell.period < cell.active;
	cell.firing    = isActive;

	if (isActive) {
		// Apply force to the ship
		const ship = battleState.ships[shipId];
		applyThrusterForce(cell, ship);

		// Create basic-thruster particles
		if (battleState.frame % 2 === 0) {
			// Create particles every other frame
			createThrusterParticles(cell, ship, battleState);
		}
	}
}
