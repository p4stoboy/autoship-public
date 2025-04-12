// src/entities/cells/gun/types.ts
import { BaseCell } from '../../../types/Cell';

export const GUN = 'gun';

export interface GunCell extends BaseCell {
	type: typeof GUN;
	dir: number; // Direction the gun is pointing
	damage: number; // Damage per bullet
	bulletSpeed: number; // Speed of bullets
	fireRate: number; // Frames between shots
	cooldown: number; // Frames until the gun can fire again
	bulletTTL?: number; // Time to live for bullets (in frames)
	bulletSize: number; // Size of the bullet
}
