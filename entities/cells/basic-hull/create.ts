// src/entities/cells/basic-hull/create.ts
import { giveRNG } from '../../../utils/determinism';
import { domProps, HullCell } from './types';
import { rarityWeights } from '../../../types/Constants';


export function createHullCell(seed: number): HullCell {
	const r = giveRNG(seed);

	const rarity = r.weightedRandom(rarityWeights);
	// Calculate properties based on rarity
	const rVal   = rarity + 1;

	const maxHealth = 20 * rVal;
	const mass      = 2;

	return {
		id: `hull-${r.randomString(8)}`,
		...domProps,
		seed,
		pos: { x: -1, y: -1 }, // To be set when placed in ship
		rarity,

		// Properties
		mass,
		maxHealth,
		health: maxHealth,

		// Flags
		damaged:   false,
		destroyed: false,
	};
}
