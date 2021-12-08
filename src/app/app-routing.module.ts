import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {BoardComponent} from "./chessview/board/board.component";
import {GameComponent} from "./game/game.component";

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'profile/:username', component: ProfileComponent},
	{path: 'home', component: HomePageComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'game', component: GameComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
