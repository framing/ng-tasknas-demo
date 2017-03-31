import { server } from '@biznas/ng-core/server';
import { config } from './biz.config';

import { AppModule } from './app/app.module';

server(config).init(AppModule).listen();
