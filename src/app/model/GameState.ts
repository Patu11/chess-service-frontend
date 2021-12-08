export class GameState {
	public boardState?: string[][];
	public currentTurn?: string;

	constructor() {

	}

	public setCurrentTurn(user: string) {
		this.currentTurn = user;
	}

	public setBoardState(value: string[][]) {
		this.boardState = value;
	}

}
