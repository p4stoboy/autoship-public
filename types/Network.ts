import { BaseCell } from './Cell';


export interface MatchmakingRequest {
	id: string;            // User ID
	name: string;
	shipId: string;
	shipName: string;
	ship: BaseCell[];   // Ship cells for battle
}

// Internal battle properties used for reconstruction
export interface BattleProperties {
	player1: MatchmakingRequest;
	player2: MatchmakingRequest;
	battleSeed: number;
	rightSidePlayerId: string;
}

export interface PlayerResults {
	rewardAmount: number;
	cellsDestroyed: string[];  // Cell IDs destroyed by this player
	coreDestroyed: boolean;    // Did this player lose their core
	newCurrency: number;
	stats: {                   // Updated player stats
		cellsDestroyed: number;
		coresDestroyed: number;
		coresLost: number;
		cellsLost: number;
		noContestCount: number;
	};
}

// Response sent to clients after battle
export interface BattleResponse {
	winnerId: string | null;
	isDraw: boolean;
	frames: number;
	battleProps: BattleProperties;  // For battle reconstruction
	player1: PlayerResults;
	player2: PlayerResults;
}