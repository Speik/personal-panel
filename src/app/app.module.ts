import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';

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
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';

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
import { StorageComponent } from './pages/storage/storage.component';

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
    StorageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
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
    CalendarModule,
    ChipsModule,
    InputTextareaModule,
    ChipModule,
    FileUploadModule,
    TooltipModule,
    DropdownModule,
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
