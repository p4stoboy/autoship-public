// src/entities/cells/basic-hull/create.ts
import { giveRNG } from '../../../utils/determinism';
import { domProps, HullCell } from './types';


export function createHullCell(seed: number, rarity: number = 0): HullCell {
	const r = giveRNG(seed);

	const maxHealth = 20 * rarity;
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
