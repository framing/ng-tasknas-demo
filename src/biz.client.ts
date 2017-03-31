import { client } from '@biznas/ng-core/client';
import { config } from './biz.config';

import { AppModule } from './app/app.module';

client(config).bootstrap(AppModule);
