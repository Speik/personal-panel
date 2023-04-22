import { RouterModule, TitleStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './declarations';
import { CustomTitleStrategy } from './custom-title-strategy';

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }],
})
export class AppRoutingModule {}
