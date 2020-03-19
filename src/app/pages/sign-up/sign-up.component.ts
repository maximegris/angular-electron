import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    // public accountTypeRadioButtons: any[] = [{
    //     value: 'Officer',
    //     disabled: false
    // }, {
    //     value: 'Admin',
    //     disabled: false
    // }];
    // public shiftList: any[] = [
    //     { id: 1, name: '12am-8am' },
    //     { id: 2, name: '8am-4pm' },
    //     { id: 3, name: '10am-6pm' },
    //     { id: 4, name: '4pm-12am' }
    // ];
    // public dayList: any[] = [
    //     { id: 1, name: 'Monday' },
    //     { id: 2, name: 'Tuesday' },
    //     { id: 3, name: 'Wednesday' },
    //     { id: 4, name: 'Thursday' },
    //     { id: 5, name: 'Friday' },
    //     { id: 6, name: 'Saturday' },
    //     { id: 7, name: 'Sunday' }
    // ];
    public signUpForm: FormGroup;
    public hidePassword: boolean = false;
    public hideConfirmPassword: boolean = false;

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit() {
        this.setupForm();
    }

    public setupForm() {
        this.signUpForm = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            dob: new FormControl(''),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            mobilePhone: new FormControl('', [
                Validators.required,

            ]),
            password: new FormControl('', [
                Validators.required,
            ]),
            confirm: new FormControl('', [
                Validators.required,
            ]),
        });
    }

    public isFormInvalid(field: string) {
        return (this.signUpForm.get(field).invalid && this.signUpForm.get(field).touched);
    }

    public singUp() {
        const newUser: User = {
            uid: '',
            firstName: this.signUpForm.get('firstName').value,
            lastName: this.signUpForm.get('lastName').value,
            dob: this.signUpForm.get('dob').value,
            email: this.signUpForm.get('email').value,
            mobilePhone: this.signUpForm.get('mobilePhone').value,
            userVerified: false,
            photoURL: ''
        };

        this.authService.signUp(newUser, this.signUpForm.get('password').value);
    }
}
