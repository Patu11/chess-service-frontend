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
		const body = {
			email: user.email,
			username: user.username,
			password: user.password,
			comments: []
		};
		return this.http.post<User>(this.userUrl + "/signup", body);
	}

	getUser(username: string) {
		const headers = new HttpHeaders().set("username", username);
		return this.http.get<User>(this.userUrl, {'headers': headers});
	}

}
