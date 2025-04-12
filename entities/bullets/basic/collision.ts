// src/entities/bullets/basic/collision.ts
import { BasicBullet } from './types';
import { BaseCell } from '../../../types/Cell.ts';
import { BattleState } from '../../../types/BattleState.ts';
import { createBulletImpactParticles } from './particles';
import { damageCell } from '../../cells/registry.ts';

export function handleBulletCellCollision(
	bullet: BasicBullet,
	cell: BaseCell,
	shipId: string,
	battleState: BattleState
): void {
	if (bullet.shipId === shipId) {
		// Bullet belongs to the same ship, ignore collision
		return;
	}
	damageCell(cell, bullet.damage, shipId, battleState);
	// Mark bullet as destroyed
	bullet.destroyed = true;

	// Create impact particles
	createBulletImpactParticles(bullet, cell, battleState);
}
