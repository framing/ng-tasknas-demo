import { client } from '@biznas/ng-core/client';
import { config } from './biz.config';

import { AppModule } from './app/app.module';

/**
 * Client Angular boostrapping handled by @biznas/ng-core
 * Based on best practices
 *
 * @see https://github.com/biznas/ng-biznas/blob/master/modules/%40biznas/ng-core/src/biz/client.ts
 */
client(config).bootstrap(AppModule);
