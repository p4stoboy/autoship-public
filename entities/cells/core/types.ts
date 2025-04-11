// src/entities/cells/core/types.ts
import { BaseCell } from '../../../types/Cell.ts';


export const CORE = 'core';

export interface CoreCell extends BaseCell {
	type: typeof CORE;
	// Core-specific properties (if any)
	// e.g., core power, core size, etc.
}
