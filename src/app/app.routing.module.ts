import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: 'home', canLoad: [AuthGuardService], canActivate: [AuthGuardService],
            loadChildren: './home/home.module#HomeModule' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
