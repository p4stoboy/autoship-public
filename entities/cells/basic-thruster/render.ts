// src/entities/cells/basic-thruster/render.ts
import { ThrusterCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { SHIP_CELL_SIZE } from '../../../types/Constants';
import { darkenColor } from '../../../utils/color';


export function renderThrusterCell(
	ctx: CanvasRenderingContext2D,
	baseCell: BaseCell,
	_shipRot: number,
): void {
	const cell = baseCell as ThrusterCell;
	const { cellSize } = { cellSize: SHIP_CELL_SIZE }; // Default cell size

	// Calculate health percentage
	const healthPercent = cell.health / cell.maxHealth;

	// Adjust color based on health
	const color = healthPercent < 1 ? darkenColor(cell.color, 1 - healthPercent) : cell.color;

	// Draw basic-thruster cell
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

	// // Draw direction indicator (small triangle)
	// const thrusterAngle = cell.dir * 2 * Math.PI;
	// ctx.fillStyle       = cell.firing ? '#ffcc00' : '#888888';
	//
	// // Draw a triangle pointing in the direction of thrust
	// ctx.beginPath();
	// ctx.moveTo(
	// 	Math.cos(thrusterAngle) * cellSize * 0.2,
	// 	Math.sin(thrusterAngle) * cellSize * 0.2,
	// );
	// ctx.lineTo(
	// 	Math.cos(thrusterAngle + Math.PI * 2 / 3) * cellSize * 0.2,
	// 	Math.sin(thrusterAngle + Math.PI * 2 / 3) * cellSize * 0.2,
	// );
	// ctx.lineTo(
	// 	Math.cos(thrusterAngle + Math.PI * 4 / 3) * cellSize * 0.2,
	// 	Math.sin(thrusterAngle + Math.PI * 4 / 3) * cellSize * 0.2,
	// );
	// ctx.closePath();
	// ctx.fill();
}
