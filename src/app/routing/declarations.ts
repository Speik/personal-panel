import { Routes } from '@angular/router';

import { GuestsComponent } from '../pages/guests/guests.component';
import { SkillsComponent } from '../pages/skills/skills.component';
import { JourneyComponent } from '../pages/journey/journey.component';
import { CertificatesComponent } from '../pages/certificates/certificates.component';
import { MessagesComponent } from '../pages/messages/messages.component';
import { CvComponent } from '../pages/cv/cv.component';
import { LoginComponent } from '../pages/login/login.component';
import { UsersComponent } from '../pages/users/users.component';
import { StorageComponent } from '../pages/storage/storage.component';

const BASE_APP_TITLE = 'Personal Panel';

const APP_ROUTES: Routes = [
  {
    path: 'guests',
    component: GuestsComponent,
    title: 'Guests',
    data: { icon: 'eye' },
  },
  {
    path: 'messages',
    component: MessagesComponent,
    title: 'Messages',
    data: { icon: 'comments' },
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    data: { icon: 'lock', implicit: true },
  },
  {
    path: 'skills',
    component: SkillsComponent,
    title: 'Skills',
    data: { icon: 'bolt' },
  },
  {
    path: 'journey',
    component: JourneyComponent,
    title: 'Journey',
    data: { icon: 'code' },
  },
  {
    path: 'certificates',
    component: CertificatesComponent,
    title: 'Certificates',
    data: { icon: 'verified' },
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users',
    data: { icon: 'users' },
  },
  {
    path: 'cv',
    component: CvComponent,
    title: 'CV',
    data: { icon: 'file-pdf' },
  },
  {
    path: 'storage',
    component: StorageComponent,
    title: 'Storage',
    data: { icon: 'folder' },
  },
];

export { APP_ROUTES, BASE_APP_TITLE };
