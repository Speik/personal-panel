import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
