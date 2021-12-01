import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/User";
import {Profile} from "../model/Profile";
import {Comment} from "../model/Comment";

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	profileUrl: string = 'http://localhost:8080/profiles'

	constructor(private http: HttpClient) {
	}

	getProfile(username: string) {
		const headers = new HttpHeaders().set("authorization", this.createBasicToken('user1@gmail.com', 'user1'));
		return this.http.get<Profile>(this.profileUrl + '/' + username, {'headers': headers});
	}

	addComment(comment: Comment, username: string) {
		// const headers = new HttpHeaders().set("username", username);
		const body = {
			content: comment.content,
			createdAt: comment.createdAt,
			author: comment.author,
			profileId: comment.profileId
		};
		return this.http.post<Comment>(this.profileUrl + "/addcomment", body);
	}

	createBasicToken(email: string, password: string) {
		return 'Basic ' + btoa(email + ':' + password);
	}
}
