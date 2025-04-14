// src/entities/cells/basic-gun/types.ts
import { BaseCell } from '../../../types/Cell';


export const BASIC_GUN = 'Basic Gun';

export const domProps = {
	color: '#e74c3c',
	cost:  2,
	type:  BASIC_GUN,
};

export interface GunCell extends BaseCell {
	dir: number; // Direction the basic-gun is pointing
	damage: number; // Damage per bullet
	bulletSpeed: number; // Speed of bullets
	fireRate: number; // Frames between shots
	cooldown: number; // Frames until the basic-gun can fire again
	bulletTTL?: number; // Time to live for bullets (in frames)
	bulletSize: number; // Size of the bullet
}
