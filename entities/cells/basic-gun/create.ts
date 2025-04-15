// src/entities/cells/basic-gun/create.ts
import { giveRNG } from '../../../utils/determinism';
import { domProps, GunCell } from './types';
import { rarityWeights } from '../../../types/Constants';


export function createGunCell(seed: number): GunCell {
	const r = giveRNG(seed);

	const rarity = r.weightedRandom(rarityWeights);
	// Calculate properties based on rarity
	const rVal   = rarity + 1;

	// Calculate properties based on rarity
	const maxHealth = 3 * rVal;
	const mass      = 1;

	// Gun-specific properties
	const dir         = r.next(); // Random direction between 0 and 1
	const damage      = Math.round(r.nextFloat(rVal / 2, rVal));
	const bulletSpeed = Math.round(rVal * r.nextFloat(0.5, 1));

	// Higher rarity = faster firing rate
	const fireRate = Math.round(60 / (rVal * r.nextFloat(0.5, 1)));

	// Start with cooldown so guns don't fire immediately
	const cooldown = fireRate;

	return {
		id: `gun-${r.randomString(8)}`,
		...domProps,
		seed,
		pos: { x: -1, y: -1 },
		rarity,

		// Base properties
		mass,
		maxHealth,
		health: maxHealth,

		// Gun-specific properties
		dir,
		damage,
		bulletSpeed,
		bulletSize: 2,
		fireRate,
		cooldown,
		bulletTTL:  120, // Default TTL

		// Flags
		damaged:   false,
		destroyed: false,
	};
}
