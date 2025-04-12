// src/entities/cells/core/render.ts
import { CoreCell } from './types';
import { SHIP_CELL_SIZE } from '../../../types/Constants';

export function renderCoreCell(
	ctx: CanvasRenderingContext2D,
	cell: CoreCell,
	_shipRot: number
): void {
	const { cellSize } = { cellSize: SHIP_CELL_SIZE }; // Default cell size

	// Draw core cell
	// Note: Position is relative to ship center and will be transformed by the ship renderer

	// Draw core as a larger, glowing cell
	ctx.fillStyle = cell.color;

	// Calculate health percentage
	const healthPercent = cell.health / cell.maxHealth;

	// Base size on health (shrinks slightly when damaged)
	const sizeMultiplier = 0.8 * (0.8 + 0.2 * healthPercent);

	// Draw core
	ctx.fillRect(
		(-cellSize * sizeMultiplier) / 2,
		(-cellSize * sizeMultiplier) / 2,
		cellSize * sizeMultiplier,
		cellSize * sizeMultiplier
	);

	// // Add a stroke
	// ctx.strokeStyle = '#000000';
	// ctx.lineWidth   = 1;
	// ctx.strokeRect(
	// 	-cellSize * sizeMultiplier / 2,
	// 	-cellSize * sizeMultiplier / 2,
	// 	cellSize * sizeMultiplier,
	// 	cellSize * sizeMultiplier,
	// );

	// Add a glow effect
	// if (healthPercent > 0.5) {
	// 	ctx.fillStyle = `rgba(255, 255, 200, ${(healthPercent - 0.5) * 0.5})`;
	// 	ctx.beginPath();
	// 	ctx.arc(0, 0, cellSize * 0.7, 0, Math.PI * 2);
	// 	ctx.fill();
	// }
}
