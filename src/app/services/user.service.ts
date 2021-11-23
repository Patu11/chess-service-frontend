import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/User";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	userUrl: string = 'http://localhost:8080/users'

	constructor(private http: HttpClient) {
	}

	createUser(user: User) {
		return this.http.post<User>(this.userUrl, user);
	}

	getUser(username: string) {
		const headers = new HttpHeaders().set("username", username);
		return this.http.get<User>(this.userUrl, {'headers': headers});
	}

}
