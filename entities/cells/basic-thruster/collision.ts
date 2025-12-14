// src/entities/cells/basic-thruster/collision.ts
import { BaseCell } from '../../../types/Cell';
import { BattleState } from '../../../types/BattleState';


export function handleThrusterCollision(
	_cell: BaseCell,
	_otherCell: BaseCell,
	_shipId: string,
	_otherShipId: string,
	_battleState: BattleState,
): void {
	// Thruster-specific collision behavior (if any)
}
