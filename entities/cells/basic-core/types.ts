// src/entities/cells/basic-core/types.ts
import { BaseCell } from '../../../types/Cell';


export const BASIC_CORE = 'Basic Core';

export const domProps = {
	color: '#f39c12',
	cost:  0,
	type:  BASIC_CORE,
};

export interface CoreCell extends BaseCell {
	// Core-specific properties (if any)
	// e.g., basic-core power, basic-core size, etc.
}
