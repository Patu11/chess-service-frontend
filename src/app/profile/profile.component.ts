import {Component, Input, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../model/User";
import {ProfileService} from "../services/profile.service";
import {Profile} from "../model/Profile";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

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
	usernameEmpty: boolean = false;
	owner: boolean = false;

	constructor(private profileService: ProfileService, private route: ActivatedRoute) {
		this.profile = new Profile(-1, new User('', '', '', [], [], new Set(), []), []);
	}


	ngOnChanges(changes: SimpleChanges) {
		if (changes['username']) {
			this.usernameEmpty = !this.username;
		}
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.link = params['username'];
			if (this.link) {
				this.usernameEmpty = false;
				this.profileService.getProfile(this.link).subscribe(
					(response) => {
						response.comments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
						this.profile = response;
						let username = sessionStorage.getItem('USER_USERNAME');
						this.owner = username === this.profile.user.username;
					},
					(error) => {
						console.log(error);
					}
				);
			} else {
				this.usernameEmpty = true;
			}
		});
	}
}
