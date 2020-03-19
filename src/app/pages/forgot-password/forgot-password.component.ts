import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    public forgotPasswordForm: FormGroup;

    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.setupForm();
    }

    public setupForm() {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.[a-zA-Z]{2,15}$')
            ])
        });
    }

    public resetPassword() {
        this.authService.forgotPassword(this.forgotPasswordForm.value.email)
    }

    public isFormInvalid(field: string) {
        return (this.forgotPasswordForm.get(field).invalid && this.forgotPasswordForm.get(field).touched);
    }

}
