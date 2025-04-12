// src/entities/cells/thruster/update.ts
import { ThrusterCell } from './types';
import { BattleState } from '../../../types/BattleState';
import { applyThrusterForce } from './physics';
import { createThrusterParticles } from './particles';


export function updateThrusterCell(
	cell: ThrusterCell,
	shipId: string,
	battleState: BattleState,
): void {
	// Skip if destroyed
	if (cell.destroyed) return;
	// Check if thruster should be firing this frame
	const isActive = true; //battleState.frame % cell.period < cell.active;
	cell.firing    = isActive;

	if (isActive) {
		// Apply force to the ship
		const ship = battleState.ships[shipId];
		applyThrusterForce(cell, ship);

		// Create thruster particles
		if (battleState.frame % 2 === 0) {
			// Create particles every other frame
			createThrusterParticles(cell, ship, battleState);
		}
	}
}
