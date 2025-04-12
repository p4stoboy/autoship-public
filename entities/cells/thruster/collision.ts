// src/entities/cells/thruster/collision.ts
import { ThrusterCell } from './types';
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';


export function handleThrusterCollision(
	_cell: ThrusterCell,
	_otherCell: BaseCell,
	_shipId: string,
	_otherShipId: string,
	_battleState: BattleState,
): void {
	// Thruster-specific collision behavior (if any)
}
