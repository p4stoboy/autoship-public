// src/types/BattleState.ts
import { Ship } from './Ship';
import { BaseBullet } from './Bullet';
import { Particle } from './Particle';
import { RNG } from '../utils/determinism';
import { BattleRenderConfig } from './RenderConfig';


export interface BattleState {
	seed: number;
	rng: RNG;
	ships: Record<string, Ship>;
	bullets: BaseBullet[];
	particles: Particle[];
	frame: number;
	winner?: string;
	isNoContest?: boolean;
	renderConfig?: BattleRenderConfig;
	debugFlags?: {
		showCenterOfMass: boolean;
		showVelocityVectors: boolean;
		showCollisionBoxes: boolean;
	};
}
