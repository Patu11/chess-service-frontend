import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/User";
import {Role} from "../model/Role";
import {SimpleToken} from "../model/SimpleToken";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	userUrl: string = 'http://localhost:8080/users'

	constructor(private http: HttpClient) {
	}

	login(email: string, password: string) {
		const headers = new HttpHeaders().set("authorization", this.createBasicToken(email, password));
		return this.http.get<SimpleToken>(this.userUrl + '/login', {'headers': headers})
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

	getUserByUsername(username: string) {
		return this.http.get<User>(this.userUrl + '/username/' + username);
	}

	getUserByEmail(email: string) {
		return this.http.get<User>(this.userUrl + '/email/' + email);
	}

	getUserRolesByEmail(email: string) {
		return this.http.get<Set<Role>>(this.userUrl + '/role/' + email);
	}

	getAllUsers() {
		return this.http.get<User[]>(this.userUrl + "/all");
	}

	createBasicToken(email: string, password: string) {
		return 'Basic ' + btoa(email + ':' + password);
	}

}
