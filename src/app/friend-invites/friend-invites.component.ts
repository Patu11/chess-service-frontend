import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/User";
import {Friend} from "../model/Friend";
import {FriendService} from "../services/friend.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-friend-invites',
	templateUrl: './friend-invites.component.html',
	styleUrls: ['./friend-invites.component.css']
})
export class FriendInvitesComponent implements OnInit {

	@Input()
	user: User = new User('', '', '', [], []);

	constructor(private friendService: FriendService) {
	}

	onAccept(friend: Friend) {
		this.friendService.acceptFriendship(friend.user1, friend.user2).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);
	}

	onDecline(friend: Friend) {
		this.friendService.declineFriendship(friend.user1, friend.user2).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(error)
			}
		);
	}

	ngOnInit(): void {
	}

}
