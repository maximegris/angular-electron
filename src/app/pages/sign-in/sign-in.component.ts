import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public singInForm: FormGroup;
    public hide: boolean = true;

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit() {
        this.setupForm();
    }

    public setupForm() {
        this.singInForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.[a-zA-Z]{2,15}$')
            ]),
            password: new FormControl('', [
                Validators.required,
            ])
        });

    }

    public isFormInvalid(field: string) {
        return (this.singInForm.get(field).invalid && this.singInForm.get(field).touched);
    }

    public logIn() {
        this.authService.signIn(this.singInForm.get('email').value, this.singInForm.get('password').value)
    }
}
