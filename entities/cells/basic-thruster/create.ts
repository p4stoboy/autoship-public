// src/entities/cells/basic-thruster/create.ts
import { giveRNG } from '../../../utils/determinism';
import { domProps, ThrusterCell } from './types';
import { rarityWeights } from '../../../types/Constants';


export function createThrusterCell(seed: number): ThrusterCell {
	const r = giveRNG(seed);

	const rarity = r.weightedRandom(rarityWeights);
	// Calculate properties based on rarity
	const rVal   = rarity + 1;
	
	// Calculate properties based on rarity
	const maxHealth = 6 * rVal;
	const mass      = 1;

	// Thruster-specific properties
	const dir    = r.choose([0, 0.25, 0.5, 0.75]);
	const power  = parseFloat((rVal * r.nextFloat(0.1, 0.2)).toFixed(2));
	const period = Math.round(rVal * r.nextFloat(10, 20));
	const active = Math.round(rVal * r.nextFloat(1, 10 / rVal));

	return {
		id: `thruster-${r.randomString(8)}`,
		...domProps,
		seed,
		pos: { x: -1, y: -1 },
		rarity,

		// Base properties
		mass,
		maxHealth,
		health: maxHealth,

		// Thruster-specific properties
		dir,
		power,
		period,
		active,
		firing: false,

		// Flags
		damaged:   false,
		destroyed: false,
	};
}
