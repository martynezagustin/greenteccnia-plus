import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })),
  ]
})
  .catch((err) => console.error(err));
