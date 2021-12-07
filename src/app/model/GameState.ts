export class GameState {
	public boardState?: string[][];


	constructor() {

	}


	public setBoardState(value: string[][]) {
		this.boardState = value;
	}

}
