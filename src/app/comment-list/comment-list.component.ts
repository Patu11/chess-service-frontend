import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../model/Comment";
import {ProfileService} from "../services/profile.service";

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

	@Input()
	comments?: Comment[];

	@Input()
	profileId?: string;

	@Input()
	owner: boolean = false;

	content: string = '';
	error: boolean = false;
	errorMessage: string = '';

	constructor(private profileService: ProfileService) {
	}

	onAddComment() {
		let username = sessionStorage.getItem('USER_USERNAME');
		if (!username) {
			this.error = true;
			this.errorMessage = 'You must login to comment';
			return;
		}
		if (this.content.length > 0) {
			let c = new Comment(this.content, new Date().toISOString().split('T')[0], username, Number(this.profileId));
			this.profileService.addComment(c, "asd").subscribe(
				(response) => {
					console.log(response);
					this.comments?.push(c);
					this.content = '';
				},
				(error => {
					console.log(error);
					this.error = true;
				}));
		} else {
			this.error = true;
			this.errorMessage = 'The comment cannot be empty';
		}
	}

	ngOnInit(): void {
	}

}
