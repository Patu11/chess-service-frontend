export class GameState {
	public boardState?: string[][];
	public currentTurn?: string;
	public winner?: string;
	public draw?: string[];

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

	public setDraw(user1: string, user2: string) {
		this.draw = [];
		this.draw[0] = user1;
		this.draw[1] = user2;
	}

	// public setDraw(draw: string) {
	// 	this.draw = draw;
	// }

}
