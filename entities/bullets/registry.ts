// src/entities/bullets/registry.ts
import { BaseBullet, BulletTypeRegistry } from '../../types/Bullet.ts';
import { BaseCell } from '../../types/Cell.ts';
import { BattleState } from '../../types/BattleState.ts';

// Import bullet types and functions
import {
	BASIC_BULLET,
	createBasicBullet,
	handleBulletCellCollision,
	renderBasicBullet,
	updateBasicBullet,
} from './basic';

// Bullet type registry
export const bulletTypes: Record<string, BulletTypeRegistry> = {
	[BASIC_BULLET]: {
		create: createBasicBullet,
		update: updateBasicBullet as (bullet: BaseBullet, battleState: BattleState) => void,
		render: renderBasicBullet as (ctx: CanvasRenderingContext2D, bullet: BaseBullet) => void,
		onCollision: handleBulletCellCollision as (
			bullet: BaseBullet,
			cell: BaseCell,
			shipId: string,
			battleState: BattleState
		) => void,
	},
};

// Function to update any bullet
export function updateBullet(bullet: BaseBullet, battleState: BattleState): void {
	const bulletType = bulletTypes[bullet.type];
	if (!bulletType) {
		throw new Error(`Unknown bullet type: ${bullet.type}`);
	}
	bulletType.update(bullet, battleState);
}

// Function to render any bullet
export function renderBullet(ctx: CanvasRenderingContext2D, bullet: BaseBullet): void {
	const bulletType = bulletTypes[bullet.type];
	if (!bulletType) {
		throw new Error(`Unknown bullet type: ${bullet.type}`);
	}
	bulletType.render(ctx, bullet);
}

// Function to handle bullet collision with a cell
export function handleBulletCollision(
	bullet: BaseBullet,
	cell: BaseCell,
	shipId: string,
	battleState: BattleState
): void {
	const bulletType = bulletTypes[bullet.type];
	if (!bulletType || !bulletType.onCollision) {
		return; // Skip if no collision handler
	}
	bulletType.onCollision(bullet, cell, shipId, battleState);
}
