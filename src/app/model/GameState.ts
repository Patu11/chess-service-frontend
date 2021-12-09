export class GameState {
	public boardState?: string[][];
	public currentTurn?: string;
	public winner?: string;

	constructor() {

	}

	public setWinner(winner: string) {
		this.winner = winner;
	}

	public setCurrentTurn(user: string) {
		this.currentTurn = user;
	}

	public setBoardState(value: string[][]) {
		this.boardState = value;
	}

}
