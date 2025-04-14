// src/entities/cells/basic-core/update.ts
import { CoreCell } from './types';
import { BattleState } from '../../../types/BattleState';


export function updateCoreCell(cell: CoreCell, _shipId: string, _battleState: BattleState): void {
	// Skip if destroyed
	if (cell.destroyed) return;

	// Additional basic-core-specific logic
}
