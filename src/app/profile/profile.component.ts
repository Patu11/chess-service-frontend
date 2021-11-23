import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/User";
import {ProfileService} from "../services/profile.service";
import {Profile} from "../model/Profile";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	@Input()
	username: string = '';

	profile: Profile | undefined;

	constructor(private profileService: ProfileService) {
	}

	ngOnInit(): void {
		this.profileService.getProfile(this.username).subscribe(
			(response) => {
				this.profile = response;
			},
			(error) => {
				console.log(error);
			}
		);
	}

}
