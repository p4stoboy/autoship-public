// src/entities/cells/basic-gun/update.ts
import { GunCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';
import { dv } from '../../../utils/determinism';
import { getCellWorldPosition } from '../../../functions/ship/position';


export function updateGunCell(baseCell: BaseCell, shipId: string, battleState: BattleState): void {
	const cell = baseCell as GunCell;
	// Skip if destroyed
	if (cell.destroyed) return;

	// Reset damaged state
	cell.damaged = false;

	// Decrement cooldown
	if (cell.cooldown > 0) {
		cell.cooldown--;
	}

	// Fire when cooldown reaches zero
	if (cell.cooldown <= 0) {
		fireGun(cell, shipId, battleState);
		cell.cooldown = cell.fireRate;
	}
}

function fireGun(cell: GunCell, shipId: string, battleState: BattleState): void {
	const ship = battleState.ships[shipId];
	if (!ship) return;

	// Calculate bullet position (at the basic-gun cell position in world coordinates)
	const gunWorldPos = getCellWorldPosition(ship, cell, true);

	// Calculate bullet direction (basic-gun direction + ship rotation)
	const bulletDir = ship.rot + cell.dir * Math.PI * 2;

	// Calculate bullet velocity
	const bulletVel = dv.vec2(
		Math.cos(bulletDir) * cell.bulletSpeed,
		Math.sin(bulletDir) * cell.bulletSpeed,
	);

	// Add ship velocity to bullet velocity
	const finalVel = dv.add(bulletVel, ship.vel);

	// Generate unique ID for the bullet
	const uniqueId = `bullet-${shipId}-${battleState.frame}-${battleState.rng.randomString(4)}`;

	// Create the bullet and add it to battle state
	battleState.bullets.push({
														 id:        uniqueId,
														 type:      'basic',
														 shipId:    shipId,
														 pos:       { ...gunWorldPos },
														 vel:       finalVel,
														 dir:       bulletDir,
														 speed:     cell.bulletSpeed,
														 damage:    cell.damage,
														 size:      cell.bulletSize,
														 ttl:       cell.bulletTTL || 60, // Default TTL of 60 frames if not specified
														 color:     cell.color,
														 destroyed: false,
													 });
}
