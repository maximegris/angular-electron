import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { PageNotFoundComponent } from './shared/components';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { ProfileComponent } from './pages/profile/profile.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { DiaryComponent } from './pages/diary/diary.component';

// Import canActivate guard services
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { UnauthenticatedGuard } from './core/guards/unauthenticated.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'diary',
        component: DiaryComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
