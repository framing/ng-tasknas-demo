import { server } from '@biznas/ng-core/server';
import { config } from './biz.config';

import { AppModule } from './app/app.module';

/**
 * Express Angular Universal server handled by @biznas/ng-core
 * Based on best practices
 *
 * @see https://github.com/biznas/ng-biznas/blob/master/modules/%40biznas/ng-core/src/biz/server.ts
 */
server(config).init(AppModule).listen();
