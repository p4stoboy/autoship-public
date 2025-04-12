// src/entities/cells/thruster/particles.ts
import { ThrusterCell } from './types';
import { Ship } from '../../../types/Ship.ts';
import { BattleState } from '../../../types/BattleState.ts';
import { dv } from '../../../utils/determinism';
import { getCellWorldPosition } from '../../ship/util.ts';

export function createThrusterParticles(
	cell: ThrusterCell,
	ship: Ship,
	battleState: BattleState
): void {
	// Skip if not firing
	if (!cell.firing) return;

	const r = battleState.rng;

	// Get thruster world position
	const thrusterPos = getCellWorldPosition(ship, cell, true);

	// Calculate opposite direction of thruster (where exhaust goes)
	const exhaustDir = cell.dir * Math.PI * 2 + ship.rot * Math.PI * 2;
	const numParticles = r.nextInt(1, 5);
	// Create velocity with randomness
	for (let i = 0; i < numParticles; i++) {
		const speed = r.nextFloat(2, 5);
		const angle = exhaustDir + r.nextFloat(-0.1, 0.1);

		const velocity = {
			x: Math.cos(angle) * speed,
			y: Math.sin(angle) * speed,
		};

		// Add ship velocity component to particle velocity
		const finalVel = dv.add(velocity, dv.multiply(ship.vel, -1));

		// Create the particle
		battleState.particles.push({
			id: `particle-${battleState.frame}-${r.randomString(4)}`,
			pos: { ...thrusterPos },
			vel: finalVel,
			color: cell.color,
			size: 0.5,
			ttl: r.nextInt(30, 60),
			t: 0,
		});
	}
}

export function createThrusterExplosion(
	cell: ThrusterCell,
	ship: Ship,
	battleState: BattleState
): void {
	const worldPos = getCellWorldPosition(ship, cell, true);
	const r = battleState.rng;

	// Create particles
	const count = 15;

	for (let i = 0; i < count; i++) {
		const angle = r.next() * Math.PI * 2;
		const speed = r.nextFloat(0.5, 3);

		battleState.particles.push({
			id: `particle-${battleState.frame}-${r.randomString(4)}`,
			pos: { ...worldPos },
			vel: {
				x: Math.cos(angle) * speed,
				y: Math.sin(angle) * speed,
			},
			color: cell.color,
			size: r.nextFloat(0.8, 1.6),
			ttl: r.nextInt(15, 60),
			t: 0,
		});
	}
}
