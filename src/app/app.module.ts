import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';

import { PrimaryHttpInterceptor } from './http/http.interceptor';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { CvComponent } from './pages/cv/cv.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    SkillsComponent,
    JourneyComponent,
    CertificatesComponent,
    MessagesComponent,
    CvComponent,
    PageTitleComponent,
    LoginComponent,
    NotificationsComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    DividerModule,
    ButtonModule,
    SkeletonModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    MessageModule,
    ConfirmPopupModule,
    InputNumberModule,
    PasswordModule,
    AvatarModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PrimaryHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
