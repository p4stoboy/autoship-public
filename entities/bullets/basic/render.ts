// src/entities/bullets/basic/render.ts
import { BasicBullet } from './types';


export function renderBasicBullet(
	ctx: CanvasRenderingContext2D,
	bullet: BasicBullet,
): void {
	// Skip destroyed bullets
	if (bullet.destroyed) return;

	// // Draw bullet as a small circle
	ctx.fillStyle = bullet.color;
	ctx.fillRect(bullet.pos.x - bullet.size / 2, bullet.pos.y - bullet.size / 2, bullet.size, bullet.size);
	// ctx.beginPath();
	// ctx.arc(bullet.pos.x, bullet.pos.y, 1, 0, Math.PI * 2);
	// ctx.fill();
	//
	// // Optional: Add a glow effect
	// ctx.fillStyle = `rgba(255, 255, 200, 0.2)`;
	// ctx.beginPath();
	// ctx.arc(bullet.pos.x, bullet.pos.y, 2, 0, Math.PI * 2);
	// ctx.fill();
}