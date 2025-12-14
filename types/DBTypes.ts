// packages/shared/src/types/DBTypes.ts

// Database types
import { BaseCell, CellTypeRegistry, DB_SHIP_CELL_PROPS } from './Cell';


export interface DBCell {
	id: string;
	player_id: string;
	type: string;
	seed: number;
	is_active: boolean;
	ship_id: string | null;
	pos_x: number;
	pos_y: number;
	created_at: string;
}

export interface DBProfile {
	id: string;
	username: string;
	created_at: string;
	updated_at: string;
	currency: number;
	cells_destroyed: number;
	cores_destroyed: number;
	cores_lost: number;
	cells_lost: number;
	no_contest_count: number;
}

export interface DBShip {
	id: string;
	player_id: string;
	name: string;
	cells: Array<{
								 cell_id: string;
								 x: number;
								 y: number;
							 } & any>;
	created_at: string;
	updated_at: string;
}

// Mapping functions
export function mapDBCellToBaseCell(dbCell: DBCell, cellTypes: Record<string, CellTypeRegistry>): BaseCell {
	// Create a properly initialized cell using the registry
	const gameCell = cellTypes[dbCell.type].create(dbCell.seed);

	// Override with database properties
	gameCell.id = dbCell.id;

	// Create position vector
	gameCell.pos = {
		x: dbCell.pos_x !== undefined ? dbCell.pos_x : -1,
		y: dbCell.pos_y !== undefined ? dbCell.pos_y : -1,
	};

	return gameCell;
}

export function mapBaseCellToDBCell(cell: BaseCell, playerId: string, shipId: string | null = null): Partial<DBCell> {
	return {
		id:        cell.id,
		player_id: playerId,
		type:      cell.type,
		seed:      cell.seed,
		is_active: !cell.destroyed,
		ship_id:   shipId,
		pos_x:     cell.pos.x,
		pos_y:     cell.pos.y,
	};
}

export function mapCellToDBShip(cell: BaseCell): Record<string, any> {
	const props: Record<string, any> = {
		id: cell.id,
		x:  cell.pos.x,
		y:  cell.pos.y,
	};

	// Add any additional properties defined in DB_SHIP_CELL_PROPS if they exist on the cell
	for (const propName of DB_SHIP_CELL_PROPS) {
		if (propName in cell) {
			props[propName] = (cell as any)[propName];
		}
	}

	return props;
}

export function mapDBProfileToFrontend(profile: DBProfile) {
	return {
		id:       profile.id,
		username: profile.username,
		currency: profile.currency,
		stats:    {
			cellsDestroyed: profile.cells_destroyed,
			coresDestroyed: profile.cores_destroyed,
			coresLost:      profile.cores_lost,
			cellsLost:      profile.cells_lost,
			noContestCount: profile.no_contest_count,
		},
		created:  profile.created_at,
		updated:  profile.updated_at,
	};
}