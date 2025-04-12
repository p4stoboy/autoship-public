// Definition for our RNG type
import { MAX_INT32 } from '../types/Constants';


export interface RNG {
	next: () => number;
	nextInt: (min: number, max: number) => number;
	nextFloat: (min: number, max: number) => number;
	giveSeed: () => number;
	choose: <T>(array: T[]) => T;
	weightedRandom: (weights: number[]) => number;
	randomString: (length?: number, chars?: string) => string;
	getState: () => number;
}

// xor baby
export const giveRNG = (seed: number = Date.now()): RNG => {
	let state = seed;

	const next = (): number => {
		state ^= state << 13;
		state ^= state >> 17;
		state ^= state << 5;
		// float between 0 and 1
		return Math.abs(state) / 2147483647;
	};

	const nextInt = (min: number, max: number): number => {
		return Math.floor(next() * (max - min + 1)) + min;
	};

	const nextFloat = (min: number, max: number): number => {
		return next() * (max - min) + min;
	};

	const giveSeed = () => Math.abs(nextInt(0, MAX_INT32));

	const choose = <T>(array: T[]): T => {
		return array[nextInt(0, array.length - 1)];
	};

	// Weighted random selection function
	// Returns an index from 0 to weights.length-1
	// Higher weights = higher probability
	const weightedRandom = (weights: number[]): number => {
		// Calculate sum of all weights
		const sum = weights.reduce((acc, weight) => acc + weight, 0);

		// Get a random value between 0 and sum
		const rnd = nextFloat(0, sum);

		// Find the index corresponding to the random value
		let cumulative = 0;
		for (let i = 0; i < weights.length; i++) {
			cumulative += weights[i];
			if (rnd < cumulative) {
				return i;
			}
		}

		// Fallback (should never happen if weights are positive)
		return weights.length - 1;
	};

	const randomString = (
		length: number = 8,
		chars: string  = 'abcdefghijklmnopqrstuvwxyz0123456789',
	): string => {
		let result = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = nextInt(0, chars.length - 1);
			result += chars.charAt(randomIndex);
		}
		return result;
	};

	return {
		next,
		nextInt,
		nextFloat,
		giveSeed,
		choose,
		weightedRandom,
		randomString,
		getState: () => state,
	};
};

// Deterministic vector operations with fixed precision
export const dv = {
	fixPrecision: (value: number, precision = 1000): number => {
		return Math.round(value * precision) / precision;
	},

	vec2: (x: number, y: number, precision = 1000) => {
		return {
			x: dv.fixPrecision(x, precision),
			y: dv.fixPrecision(y, precision),
		};
	},

	add: (a: { x: number; y: number }, b: { x: number; y: number }, precision = 1000) => {
		return {
			x: dv.fixPrecision(a.x + b.x, precision),
			y: dv.fixPrecision(a.y + b.y, precision),
		};
	},

	subtract: (a: { x: number; y: number }, b: { x: number; y: number }, precision = 1000) => {
		return {
			x: dv.fixPrecision(a.x - b.x, precision),
			y: dv.fixPrecision(a.y - b.y, precision),
		};
	},

	multiply: (vector: { x: number; y: number }, scalar: number, precision = 1000) => {
		return {
			x: dv.fixPrecision(vector.x * scalar, precision),
			y: dv.fixPrecision(vector.y * scalar, precision),
		};
	},

	normalize: (vector: { x: number; y: number }, precision = 1000) => {
		const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
		if (length === 0) return { x: 0, y: 0 };
		return {
			x: dv.fixPrecision(vector.x / length, precision),
			y: dv.fixPrecision(vector.y / length, precision),
		};
	},

	distance: (a: { x: number; y: number }, b: { x: number; y: number }, precision = 1000) => {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		return dv.fixPrecision(Math.sqrt(dx * dx + dy * dy), precision);
	},

	rotate: (vector: { x: number; y: number }, angle: number, precision = 1000) => {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return {
			x: dv.fixPrecision(vector.x * cos - vector.y * sin, precision),
			y: dv.fixPrecision(vector.x * sin + vector.y * cos, precision),
		};
	},

	dot: (a: { x: number; y: number }, b: { x: number; y: number }, precision = 1000) => {
		return dv.fixPrecision(a.x * b.x + a.y * b.y, precision);
	},

	cross: (scalar: number, vector: { x: number; y: number }, precision = 1000) => {
		return {
			x: dv.fixPrecision(-scalar * vector.y, precision),
			y: dv.fixPrecision(scalar * vector.x, precision),
		};
	},

	magnitude: (vector: { x: number; y: number }, precision = 1000) => {
		return dv.fixPrecision(Math.sqrt(vector.x * vector.x + vector.y * vector.y), precision);
	},
};
