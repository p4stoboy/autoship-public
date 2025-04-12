// src/entities/cells/gun/collision.ts
import { GunCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';


export function handleGunCollision(
	cell: GunCell,
	_otherCell: BaseCell,
	_shipId: string,
	_otherShipId: string,
	battleState: BattleState,
): void {
	// Gun-specific collision behavior (if any)
	// Guns might have their aim disrupted by collisions

	// Add some random offset to gun direction
	const r  = battleState.rng;
	cell.dir = (cell.dir + r.nextFloat(-0.05, 0.05)) % 1.0;
	if (cell.dir < 0) cell.dir += 1.0;

	// Increase cooldown slightly when colliding
	cell.cooldown = Math.min(cell.fireRate, cell.cooldown + Math.floor(cell.fireRate * 0.2));
}
