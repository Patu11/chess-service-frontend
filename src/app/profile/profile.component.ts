import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/User";
import {ProfileService} from "../services/profile.service";
import {Profile} from "../model/Profile";
import {Comment} from "../model/Comment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	@Input()
	username: string = '';
	link: string = '';
	profile: Profile | undefined;

	constructor(private profileService: ProfileService, private route: ActivatedRoute) {
		this.profile = new Profile(-1, new User('', '', '', [], []), []);
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.link = params['username'];

			this.profileService.getProfile(this.link).subscribe(
				(response) => {
					response.comments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
					this.profile = response;
				},
				(error) => {
					console.log(error);
				}
			);

		});

		// this.profileService.getProfile(this.username).subscribe(
		// 	(response) => {
		// 		response.comments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
		// 		this.profile = response;
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	}
		// );
	}

}
