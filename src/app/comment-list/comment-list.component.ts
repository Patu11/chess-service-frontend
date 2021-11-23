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

	content: string = '';

	constructor(private profileService: ProfileService) {
	}

	onAddComment() {
		if (this.content.length > 0) {
			let c = new Comment(this.content, new Date().toISOString().split('T')[0], "asd", 1);
			this.profileService.addComment(c, "asd").subscribe(
				(response) => {
					console.log(response);
				},
				(error => {
					console.log(error);
				}));
		}
	}

	ngOnInit(): void {
	}

}
