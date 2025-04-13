// src/entities/cells/thruster/create.ts
import { giveRNG } from '../../../utils/determinism';
import { THRUSTER, ThrusterCell } from './types';


export function createThrusterCell(seed: number, rarity: number = 0): ThrusterCell {
	const r = giveRNG(seed);

	// Calculate properties based on rarity
	const maxHealth = 6 * rarity;
	const mass      = 1;

	// Thruster-specific properties
	const dir    = r.choose([0, 0.25, 0.5, 0.75]);
	const power  = parseFloat((rarity * r.nextFloat(0.1, 0.2)).toFixed(2));
	const period = Math.round(rarity * r.nextFloat(10, 20));
	const active = Math.round(rarity * r.nextFloat(1, 10 / rarity));

	return {
		id:   `thruster-${r.randomString(8)}`,
		type: THRUSTER,
		seed,
		pos:  { x: -1, y: -1 },
		rarity,
		cost: 1,

		// Base properties
		mass,
		maxHealth,
		health: maxHealth,
		color:  '#22dd22', // Thruster color

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
