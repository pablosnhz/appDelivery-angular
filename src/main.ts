import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// esto
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
defineComponents(IgcRatingComponent);
// afuera

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
