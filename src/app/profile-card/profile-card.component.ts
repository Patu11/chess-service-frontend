import {Component, Input, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {User} from "../model/User";
import {FriendService} from "../services/friend.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UserService} from "../services/user.service";

@Component({
	selector: 'app-profile-card',
	templateUrl: './profile-card.component.html',
	styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

	@Input()
	user: User = new User('', '', '', [], [], new Set(), []);
	public modalRef?: BsModalRef;
	addFriendButtonText: string = "Add friend";
	alreadySent: boolean = false;

	@Input()
	numberOfGames: number = 0;

	newPassword: string = '';
	confirmPassword: string = '';
	showPasswordStatus: boolean = false;
	passwordStatusMessage: string = '';
	newPasswordError: boolean = false;
	currentPassword: string = '';

	@Input()
	owner: boolean = false;

	constructor(private friendService: FriendService, private userService: UserService, private modalService: BsModalService) {
	}

	onEditProfile(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
		this.modalRef.onHide?.subscribe(
			() => {
				this.newPassword = '';
				this.confirmPassword = '';
				this.showPasswordStatus = false;
				this.passwordStatusMessage = '';
				this.newPasswordError = false;
			}
		);
	}

	onSavePassword() {
		let username = sessionStorage.getItem('USER_USERNAME');
		let currentPasswordStorage = sessionStorage.getItem('USER_PASSWORD');

		if (currentPasswordStorage && this.currentPassword === currentPasswordStorage && username && this.confirmPassword && this.newPassword && this.newPassword === this.confirmPassword) {
			this.userService.updatePassword(username, this.newPassword).subscribe(
				response => {
					// sessionStorage.setItem('USER_PASSWORD', this.newPassword);
					this.showPasswordStatus = true;
					this.newPasswordError = false;
					this.passwordStatusMessage = 'Passwords changed.'
					this.newPassword = '';
					this.confirmPassword = '';
					this.currentPassword = '';
				},
				error => {
					this.showPasswordStatus = true;
					this.newPasswordError = true;
					this.passwordStatusMessage = 'Passwords are not equal or empty.'
				}
			);
		} else {
			this.showPasswordStatus = true;
			this.newPasswordError = true;
			this.passwordStatusMessage = 'Passwords are not equal or empty.'
		}

	}

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
					// this.owner = username === this.user.username;
					this.friendService.checkFriendship(username, this.user.username).subscribe(
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
