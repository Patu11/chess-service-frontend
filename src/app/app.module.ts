import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {SignupComponent} from './signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SquareComponent} from './chessview/square/square.component';
import {BoardComponent} from './chessview/board/board.component';
import {ProfileComponent} from './profile/profile.component';
import {CommentComponent} from './comment/comment.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {ProfileCardComponent} from './profile-card/profile-card.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {ModifyAccountComponent} from './modify-account/modify-account.component';
import {UserListComponent} from './user-list/user-list.component';
import {FriendInvitesComponent} from './friend-invites/friend-invites.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomePageComponent} from './home-page/home-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {GameComponent} from './game/game.component';
import {InvitesComponent} from './invites/invites.component';
import {TournamentListComponent} from './tournament-list/tournament-list.component';
import {AdminComponent} from './admin/admin.component';
import { TournamentComponent } from './tournament/tournament.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { TournamentPageComponent } from './tournament-page/tournament-page.component';
import { TournamentGameListComponent } from './tournament-game-list/tournament-game-list.component';
import { TournamentGameComponent } from './tournament-game/tournament-game.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		LoginComponent,
		SignupComponent,
		SquareComponent,
		BoardComponent,
		ProfileComponent,
		CommentComponent,
		CommentListComponent,
		ProfileCardComponent,
		FriendListComponent,
		ModifyAccountComponent,
		UserListComponent,
		FriendInvitesComponent,
		HomePageComponent,
		NavbarComponent,
		GameComponent,
		InvitesComponent,
		TournamentListComponent,
		AdminComponent,
  TournamentComponent,
  CreateTournamentComponent,
  TournamentPageComponent,
  TournamentGameListComponent,
  TournamentGameComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ModalModule.forRoot(),
		BsDropdownModule.forRoot(),
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
