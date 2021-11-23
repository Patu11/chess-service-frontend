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
		const headers = new HttpHeaders().set("username", username);
		return this.http.get<Profile>(this.profileUrl, {'headers': headers});
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
}
