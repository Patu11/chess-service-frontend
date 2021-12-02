import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../model/User";
import {FriendService} from "../services/friend.service";

@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

	@Input()
	user: User = new User('', '', '', [], [], new Set());
	addFriendButtonText: string = "Add friend";
	alreadySent: boolean = false;

	constructor(private friendService: FriendService) {
	}

	onEditProfile() {
		// let username = sessionStorage.getItem('USER_USERNAME');
		//
		// if (username && this.user.username) {
		// 	this.friendService.checkFriendShip(username, this.user.username).subscribe(
		// 		(response: any) => {
		// 			let test: boolean = response['friendshipExists'];
		// 			console.log(response['friendshipExists']);
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
		// }
	}

	//TODO fill data from localstorage
	onAddFriend() {
		if (!this.alreadySent) {
			let username = sessionStorage.getItem('USER_USERNAME');

			if (username && this.user.username) {
				this.friendService.createFriendship(username, this.user.username).subscribe(
					(response) => {
						console.log(response);
						this.alreadySent = true;
						this.addFriendButtonText = "Request sent"
					},
					(error) => {
						console.log(error);
					}
				);
			}
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['user']) {
			if (this.user.username.length != 0) {
				let username = sessionStorage.getItem('USER_USERNAME');

				if (username && this.user.username) {
					this.friendService.checkFriendShip(username, this.user.username).subscribe(
						(response: any) => {
							this.alreadySent = response['friendshipExists'];
							this.addFriendButtonText = this.alreadySent ? 'Request sent' : 'Add friend';

						},
						error => {
							console.log(error);
						}
					);
				}
			}
		}
	}

	ngOnInit(): void {
	}

}
