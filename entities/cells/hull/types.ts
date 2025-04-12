// src/entities/cells/hull/types.ts
import { BaseCell } from '../../../types/Cell';

export const HULL = 'hull';

export interface HullCell extends BaseCell {
	type: typeof HULL;
	// Hull-specific properties (if any)
}
