// Function to create a basic bullet
import { Vec2 } from '../../../types/Physics.ts';
import { BattleState } from '../../../types/BattleState.ts';
import { BaseBullet } from '../../../types/Bullet.ts';
import { BASIC_BULLET } from './types.ts';

export function createBasicBullet(
	shipId: string,
	pos: Vec2,
	dir: number,
	speed: number,
	damage: number,
	battleState: BattleState
): BaseBullet {
	const r = battleState.rng;

	// Calculate velocity
	const vel = {
		x: Math.cos(dir) * speed,
		y: Math.sin(dir) * speed,
	};

	return {
		id: `bullet-${shipId}-${battleState.frame}-${r.randomString(4)}`,
		type: BASIC_BULLET,
		shipId,
		pos: { ...pos },
		vel,
		dir,
		speed,
		damage,
		ttl: 120, // Default 60 frames
		size: 1,
		color: '#e74c3c',
		destroyed: false,
	};
}
