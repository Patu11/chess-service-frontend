import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'profile/:username', component: ProfileComponent},
	{path: 'home', component: MainComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
