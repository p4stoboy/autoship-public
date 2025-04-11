// src/entities/cells/thruster/types.ts
import { BaseCell } from '../../../types/Cell.ts';


export const THRUSTER = 'thruster';

export interface ThrusterCell extends BaseCell {
	type: typeof THRUSTER;
	dir: number;      // Direction (0-1, where 0 is right, 0.25 is down, etc.)
	power: number;    // Thrust power
	active: number;   // Number of frames in period that thruster is active
	period: number;   // Total period length in frames
	firing: boolean;  // Whether thruster is currently firing
}