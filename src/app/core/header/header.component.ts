import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public router: Router,
        public authService: AuthService) { }

    ngOnInit() {
    }

    public onProfileClick() {
        this.router.navigate(['profile']);
    }

    public onLogOutClick() {
        this.authService.SignOut();
    }

    public onHomeClick() {
        this.router.navigate(['home']);
    }
}
