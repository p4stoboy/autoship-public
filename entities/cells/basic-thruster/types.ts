// src/entities/cells/basic-thruster/types.ts
import { BaseCell } from '../../../types/Cell';


export const BASIC_THRUSTER = 'Basic Thruster';

export const domProps = {
	color: '#22dd22',
	cost:  1,
	type:  BASIC_THRUSTER,
};

export interface ThrusterCell extends BaseCell {
	dir: number; // Direction (0-1, where 0 is right, 0.25 is down, etc.)
	power: number; // Thrust power
	active: number; // Number of frames in period that basic-thruster is active
	period: number; // Total period length in frames
	firing: boolean; // Whether basic-thruster is currently firing
}
