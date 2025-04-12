// src/entities/cells/core/particles.ts
import { CoreCell } from './types';
import { Ship } from '../../../types/Ship';
import { BattleState } from '../../../types/BattleState';
import { getCellWorldPosition } from '../../ship/util';


export function createCoreExplosion(cell: CoreCell, ship: Ship, battleState: BattleState): void {
	const worldPos = getCellWorldPosition(ship, cell, true);
	const r        = battleState.rng;

	// Create a more dramatic explosion for core destruction
	// More particles, larger size, longer lifetime
	const count = 30;

	for (let i = 0; i < count; i++) {
		const angle = r.next() * Math.PI * 2;
		const speed = r.nextFloat(0.5, 4);

		battleState.particles.push({
																 id:    `particle-${battleState.frame}-${r.randomString(4)}`,
																 pos:   { ...worldPos },
																 vel:   {
																	 x: Math.cos(angle) * speed,
																	 y: Math.sin(angle) * speed,
																 },
																 color: cell.color,
																 size:  r.nextFloat(1.5, 3.0),
																 ttl:   r.nextInt(30, 60),
																 t:     0,
															 });
	}
}
