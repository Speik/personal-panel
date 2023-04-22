import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RippleModule } from 'primeng/ripple';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    SplitterModule,
    DividerModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
