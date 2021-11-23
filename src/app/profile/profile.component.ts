import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/User";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	@Input()
	username: string = '';

	user: User = new User("zxc", "angular", "asdasd", []);

	constructor(private userService: UserService) {
	}

	ngOnInit(): void {
		this.userService.getUser(this.username).subscribe(
			(response) => {
				this.user = response;
			},
			(error) => {
				console.log(error);
			}
		);
	}

}
