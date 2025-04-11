// src/entities/bullets/basic/update.ts
import { BasicBullet } from './types';
import { BattleState } from '../../../types/BattleState.ts';
import { handleBulletBoundary } from '../boundary.ts';


export function updateBasicBullet(
	bullet: BasicBullet,
	_battleState: BattleState,
): void {
	// Skip destroyed bullets
	if (bullet.destroyed) return;

	// Update position
	bullet.pos.x += bullet.vel.x;
	bullet.pos.y += bullet.vel.y;

	// Decrement TTL
	bullet.ttl--;

	// Check if expired
	if (bullet.ttl <= 0) {
		bullet.destroyed = true;
		return;
	}

	// Handle boundary wrapping
	handleBulletBoundary(bullet);
}