// src/entities/bullets/basic/particles.ts
import { BasicBullet } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';


export function createBulletImpactParticles(
	bullet: BasicBullet,
	_cell: BaseCell,
	battleState: BattleState,
): void {
	const r     = battleState.rng;
	const count = r.nextInt(5, 10);

	for (let i = 0; i < count; i++) {
		// Random direction, biased opposite to bullet direction
		const baseAngle = Math.atan2(bullet.vel.y, bullet.vel.x) + Math.PI;
		const angle     = baseAngle + r.nextFloat(-0.8, 0.8);

		// Random speed
		const speed = r.nextFloat(0.5, 2);

		const velocity = {
			x: Math.cos(angle) * speed,
			y: Math.sin(angle) * speed,
		};

		// Create the particle
		battleState.particles.push({
																 id:    `impact-${battleState.frame}-${r.randomString(4)}`,
																 pos:   { ...bullet.pos },
																 vel:   velocity,
																 color: bullet.color,
																 size:  r.nextFloat(0.8, 1.2),
																 ttl:   r.nextInt(10, 20),
																 t:     0,
															 });
	}
}
