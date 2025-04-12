// src/types/bullet.ts
import { Vec2 } from './Physics';
import { BattleState } from './BattleState';
import { BaseCell } from './Cell';

export interface BaseBullet {
	id: string;
	type: string;
	shipId: string; // ID of ship that fired the bullet

	pos: Vec2; // Position
	vel: Vec2; // Velocity
	dir: number; // Direction in radians
	speed: number; // Speed
	damage: number; // Damage amount
	ttl: number; // Time to live (in frames)
	size: number;
	color: string; // Bullet color

	// Flags
	destroyed: boolean;
}

// Define the Bullet Type Registry interface
export interface BulletTypeRegistry {
	create: (
		shipId: string,
		pos: Vec2,
		dir: number,
		speed: number,
		damage: number,
		battleState: BattleState
	) => BaseBullet;
	update: (bullet: BaseBullet, battleState: BattleState) => void;
	render: (ctx: CanvasRenderingContext2D, bullet: BaseBullet) => void;
	onCollision?: (
		bullet: BaseBullet,
		cell: BaseCell,
		shipId: string,
		battleState: BattleState
	) => void;
}
