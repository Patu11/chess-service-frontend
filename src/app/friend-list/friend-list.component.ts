import {Component, Input, OnInit} from '@angular/core';
import {Friend} from "../model/Friend";
import {FriendService} from "../services/friend.service";
import {GameService} from "../services/game.service";
import {GameModel} from "../model/GameModel";

@Component({
	selector: 'app-friend-list',
	templateUrl: './friend-list.component.html',
	styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

	@Input()
	friends!: Friend[];

	@Input()
	owner: boolean = false;

	@Input()
	codes: string[] = [];

	constructor(private friendService: FriendService, private gameService: GameService) {
	}

	onInviteFriend(friend: Friend) {
		let code = this.generateCode();
		while (this.codes.some(cod => cod === code)) {
			code = this.generateCode();
		}
		let host = sessionStorage.getItem('USER_USERNAME');
		const state: string = 'rp****PR:np****PN:bp****PB:qp****PQ:kp****PK:bp****PB:np****PN:rp****PR';
		let model: GameModel = new GameModel(code, host!, friend.user2, state, '', host!, false, false, false);
		this.gameService.createGame(model).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	onRemoveFriend(friend: Friend) {
		this.friendService.deleteFriendship(friend.user1, friend.user2).subscribe(
			response => {
				this.friends.forEach((item, index) => {
					if (item.user2 === friend.user2) this.friends.splice(index, 1);
				});
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit(): void {
		this.friends = this.friends.filter(f => f.status);
	}

	generateCode(): string {
		const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const LOWER = 'abcdefghijklmnopqrstuvwxyz';
		const NUMBERS = '0123456789';
		const ALPHA = UPPER + LOWER + NUMBERS;
		const LENGTH = 6;

		let code = '';

		for (let i = 0; i < LENGTH; i++) {
			code += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
		}
		return code;
	}

}
