// src/types/Ship.ts
import { Vec2 } from './Physics';
import { BaseCell } from './Cell';

export interface ShipPhysicsProperties {
	totalMass: number;
	centerOfMass: Vec2;
	momentOfInertia: number;
}

export interface Ship {
	id: string;
	body: BaseCell[];
	bodyCount: number;

	pos: Vec2;
	vel: Vec2;
	rot: number;
	angVel: number;

	coreDestroyed: boolean;

	physicsProperties?: ShipPhysicsProperties;
}
