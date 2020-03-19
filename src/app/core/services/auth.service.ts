import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any; // Save logged in user data
    currentUserDetails: User;

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
        /* Saving user data in localstorage when
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                console.log('capi....');
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));


                const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
                userRef.valueChanges().subscribe((user: User) => {
                    this.currentUserDetails = user;
                    console.log('Got user details...');
                    console.log(user);
                });

            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        }, error => {
            console.log(error);
        });
    }

    // Sign in with email/password
    signIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user.emailVerified) {
                    this.ngZone.run(() => {
                        this.router.navigate(['home']);
                    });
                } else {
                    this.router.navigate(['verify-email']);
                }
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Sign up with email/password
    signUp(newUser: User, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                this.sendVerificationMail();
                this.createUserData(result.user, newUser);
            }).catch((error) => {
                window.alert(error.message)
            });
    }

    // Send email verfificaiton when new user sign up
    sendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['verify-email']);
            });
    }

    // Reset Forggot password
    forgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Sign in with Google
    // GoogleAuth() {
    //     return this.AuthLogin(new auth.GoogleAuthProvider());
    // }

    // Auth logic to run auth providers
    // AuthLogin(provider) {
    //     return this.afAuth.auth.signInWithPopup(provider)
    //         .then((result) => {
    //             this.ngZone.run(() => {
    //                 this.router.navigate(['dashboard']);
    //             })
    //             this.SetUserData(result.user);
    //         }).catch((error) => {
    //             window.alert(error)
    //         })
    // }

    createUserData(fbUser, newUser: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${fbUser.uid}`);
        newUser.uid = fbUser.uid;
        return userRef.set(newUser, {
            merge: true
        });
    }

    // Sign out
    SignOut() {
        return this.afAuth.auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                this.router.navigate(['sign-in']);
            }).catch((err) => {
                console.log(err);
            })
    }

    getUserFullName() {
        return this.currentUserDetails.firstName + ' ' + this.currentUserDetails.lastName;
    }
}
