import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { nonAuthGuard } from './guards/non-auth/non-auth.guard';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { RegistrationComponent } from './components/registration/registration/registration.component';
import { ProductCardComponent } from './components/product-card/product-card/product-card.component';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { SearchProductDialogComponent } from './components/search-product-dialog/search-product-dialog/search-product-dialog.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'main',
        component: MainPageComponent,
        canActivate: [authGuard],  
    },
    {
        path: 'products',
        component: ProductCardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard]
    },
    {
        path: 'calendar/search',
        component: SearchProductDialogComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [nonAuthGuard]
    }
];
