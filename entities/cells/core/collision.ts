// src/entities/cells/core/collision.ts
import { CoreCell } from './types';
import { BaseCell } from '../../../types/Cell.ts';
import { BattleState } from '../../../types/BattleState.ts';


export function handleCoreCollision(
	_cell: CoreCell,
	_otherCell: BaseCell,
	_shipId: string,
	_otherShipId: string,
	_battleState: BattleState,
): void {
	// Core cells might have special collision behavior
	// For example, they could emit shield particles when hit

	// For now, just a basic implementation
	// Advanced collision effects could be added here
}