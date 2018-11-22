import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<h1>Welcome</h1><br>
               <nav>
                   <a routerLink="/home">Home</a>
               </nav>
               <router-outlet></router-outlet>
            `
})
export class AppComponent {}
