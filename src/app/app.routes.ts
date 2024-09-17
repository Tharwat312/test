import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

export const routes: Routes = [
    {path: '', component: AuthLayoutComponent, canActivate:[loggedGuard],
        children:[
        {path:'', redirectTo:'login', pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
        {path:'forgotPassword', component:ForgetPasswordComponent},
    ]},
    {path: '', component: BlankLayoutComponent, canActivate:[authGuard],
        children:[
            {path:'', redirectTo:'home', pathMatch:'full'},
            {path:'home',component: HomeComponent},
            {path:'cart', component:CartComponent},
            {path:'brands', component:BrandsComponent},
            {path:'contactUs', component:ContactUsComponent},
            {path:'details/:id', component:DetailsComponent},
            {path:'allOrders', component:AllOrdersComponent},
            {path:'orders/:id', component:OrdersComponent},

        ]
    },
    {path: '**', component: NotfoundComponent},
];
