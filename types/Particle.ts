// src/types/Particle.ts
import { Vec2 } from './Physics';

export interface Particle {
	id: string;
	pos: Vec2;
	vel: Vec2;
	color: string;
	size: number;
	ttl: number; // Time to live (in frames)
	t: number; // Current age (in frames)
}
