// src/entities/cells/basic-core/create.ts
import { giveRNG } from '../../../utils/determinism';
import { CoreCell, domProps } from './types';
import { rarityWeights } from '../../../types/Constants';


export function createCoreCell(seed: number): CoreCell {
	const r = giveRNG(seed);

	const rarity = r.weightedRandom(rarityWeights);
	// Calculate properties based on rarity
	const rVal   = rarity + 1;

	const maxHealth = 20 * rVal;
	const mass      = 5;

	return {
		id: `core-${r.randomString(8)}`,
		...domProps,
		seed,
		pos: { x: -1, y: -1 }, // To be set when placed in ship
		rarity,

		// Properties
		mass,
		maxHealth,
		health: maxHealth,

		// Optional properties
		// Add any basic-core-specific properties here

		// Flags
		damaged:   false,
		destroyed: false,
	};
}
