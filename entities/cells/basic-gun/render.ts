// src/entities/cells/basic-gun/render.ts
import { GunCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { SHIP_CELL_SIZE } from '../../../types/Constants';
import { darkenColor } from '../../../utils/color';


export function renderGunCell(
	ctx: CanvasRenderingContext2D,
	baseCell: BaseCell,
	_shipRot: number,
): void {
	const cell = baseCell as GunCell;
	const { cellSize } = { cellSize: SHIP_CELL_SIZE }; // Default cell size

	// Calculate health percentage
	const healthPercent = cell.health / cell.maxHealth;

	// Adjust color based on health
	const color = healthPercent < 1 ? darkenColor(cell.color, 1 - healthPercent) : cell.color;

	// Draw basic-gun cell
	ctx.fillStyle = color;

	// Draw base shape
	ctx.fillRect(-cellSize * 0.35, -cellSize * 0.35, cellSize * 0.7, cellSize * 0.7);

	// // Add a stroke
	// ctx.strokeStyle = '#000000';
	// ctx.lineWidth   = 1;
	// ctx.strokeRect(
	// 	-cellSize * 0.35,
	// 	-cellSize * 0.35,
	// 	cellSize * 0.7,
	// 	cellSize * 0.7,
	// );
	//
	// // Draw direction indicator (basic-gun barrel)
	// const gunAngle = cell.dir * 2 * Math.PI;
	// ctx.fillStyle  = '#555555';
	//
	// // Draw a rectangle pointing in the firing direction
	// ctx.save();
	// ctx.rotate(gunAngle);
	// ctx.fillRect(
	// 	0,
	// 	-cellSize * 0.1,
	// 	cellSize * 0.4,
	// 	cellSize * 0.2,
	// );
	// ctx.restore();

	// Draw cooldown indicator
	if (cell.cooldown > 0) {
		const cooldownPercentage = cell.cooldown / cell.fireRate;
		ctx.fillStyle            = `rgba(0, 0, 0, ${cooldownPercentage * 0.5})`;
		ctx.beginPath();
		ctx.arc(0, 0, cellSize * 0.2, 0, Math.PI * 2 * cooldownPercentage);
		ctx.lineTo(0, 0);
		ctx.fill();
	}
}
