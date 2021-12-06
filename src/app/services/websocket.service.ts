import {EventEmitter, Injectable, Output} from '@angular/core';
import {Client} from "stompjs";
import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs'
import {GameState} from "../model/GameState";
import {Game} from "../model/chess/Game";
import {BehaviorSubject} from "rxjs";
import {Player} from "../model/chess/Player";

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {

	private websocketUrl: string = 'http://localhost:8080/app';

	private stompClient: Client;

	private connected: boolean = false;
	private subscribed: boolean = false;
	connectionStatus = new BehaviorSubject<boolean>(false);
	roomConnectionStatus = new BehaviorSubject<boolean>(false);
	private gameState: GameState = new GameState(new Game(new Player(true), new Player(false)));
	// gameStateStatus: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(this.gameState);
	gameStateStatus: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor() {
		const socket = new SockJS(this.websocketUrl);
		this.stompClient = Stomp.over(socket);
		this.stompClient.debug = () => {
		};

		this.stompClient.connect({}, (frame) => {
			this.connected = true;
			this.connectionStatus.next(this.connected);
		});
	}

	getGameState(roomCode: string) {
		return this.gameStateStatus.asObservable();
	}

	isConnected() {
		return this.connectionStatus.asObservable();
	}

	isConnectedToGame(roomCode: string) {
		return this.roomConnectionStatus.asObservable();
	}

	sendGameState(data: any, roomCode: string) {
		this.stompClient.send('/chess/send/' + roomCode, {}, JSON.stringify(data))
	}

	// sendGameState(gameState: GameState, roomCode: string) {
	// 	this.stompClient.send('/chess/send/' + roomCode, {}, JSON.stringify(gameState))
	// }

	connectToGame(roomCode: string) {
		if (!this.subscribed) {
			this.stompClient.subscribe('/game/' + roomCode, response => {
				this.subscribed = true;
				this.roomConnectionStatus.next(this.subscribed);
				// this.gameState = JSON.parse(JSON.stringify(response.body));
				// this.gameStateStatus.next(this.gameState);
				this.gameStateStatus.next(response.body);
			});
		}
	}

	disconnectFromGame(roomCode: string) {
		if (this.subscribed) {
			this.stompClient.unsubscribe('/game/' + roomCode);
			this.subscribed = false;
		}
	}


	closeConnection() {
		if (this.connected) {
			this.stompClient.disconnect(() => {
				this.connected = false;
				this.subscribed = false;
				this.connectionStatus.next(this.connected);
				this.roomConnectionStatus.next(this.subscribed);
			})
		}
	}

}
