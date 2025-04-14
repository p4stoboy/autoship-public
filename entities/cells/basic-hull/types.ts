// src/entities/cells/basic-hull/types.ts
import { BaseCell } from '../../../types/Cell';


export const BASIC_HULL = 'Basic Hull';

export const domProps = {
	color: '#ffffff',
	cost:  1,
	type:  BASIC_HULL,
};

export interface HullCell extends BaseCell {
	// Hull-specific properties (if any)
}
