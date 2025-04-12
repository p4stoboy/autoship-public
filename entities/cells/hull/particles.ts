// src/entities/cells/hull/particles.ts
import { HullCell } from './types';
import { Ship } from '../../../types/Ship';
import { BattleState } from '../../../types/BattleState';
import { getCellWorldPosition } from '../../ship/util';


export function createHullExplosion(cell: HullCell, ship: Ship, battleState: BattleState): void {
	const worldPos = getCellWorldPosition(ship, cell, true);
	const r        = battleState.rng;

	// Create particles
	const count = 10;

	for (let i = 0; i < count; i++) {
		const angle = r.next() * Math.PI * 2;
		const speed = r.nextFloat(0.5, 3);

		battleState.particles.push({
																 id:    `particle-${battleState.frame}-${r.randomString(4)}`,
																 pos:   { ...worldPos },
																 vel:   {
																	 x: Math.cos(angle) * speed,
																	 y: Math.sin(angle) * speed,
																 },
																 color: cell.color,
																 size:  r.nextFloat(0.8, 1.6),
																 ttl:   r.nextInt(15, 30),
																 t:     0,
															 });
	}
}
