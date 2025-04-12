// src/entities/cells/hull/render.ts
import { HullCell } from './types';
import { SHIP_CELL_SIZE } from '../../../types/Constants';
import { darkenColor } from '../../../utils/color';


export function renderHullCell(
	ctx: CanvasRenderingContext2D,
	cell: HullCell,
	_shipRot: number,
): void {
	const { cellSize } = { cellSize: SHIP_CELL_SIZE }; // Default cell size

	// Calculate health percentage
	const healthPercent = cell.health / cell.maxHealth;

	// Adjust color based on health
	const color = healthPercent < 1 ? darkenColor(cell.color, 1 - healthPercent) : cell.color;

	// Draw hull cell
	ctx.fillStyle = color;
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
}
