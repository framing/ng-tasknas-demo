import './polyfills';
import 'zone.js/dist/zone-node';

import { platformServer, renderModule } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

import * as compression from 'compression';
import * as express from 'express';

const fs = require('fs');
const path = require('path');

const templateCache: any = {};
const ROOT = process.cwd();
const routes = ['/'];

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppRootComponent } from '@framing/ng-tasknas-framers/src/app/components/app-root.component';

@NgModule({
  imports: [
	  ServerModule,
	  AppModule
  ],
  bootstrap: [
    AppRootComponent,
  ],
})
export class AppServerModule {}

export class BizServer {

  public app: any;

  public server: any;

  // ========================================
  // constructor
  // ========================================

  public constructor() {
    this.init();
  }

  // ========================================
  // public methods
  // ========================================

  public start(): BizServer {
    this.app.get('*', (req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json');
      let pojo = { status: 404, message: 'No Content' };
      let json = JSON.stringify(pojo, null, 2);
      res.status(404).send(json);
    });

    this.server = this.app.listen(process.env.PORT || 8888, () => {
      console.log(`Listening on: http://localhost:${this.server.address().port}`);
    });

    return this;
  }

  // ========================================
  // private methods
  // ========================================

  private init(): void {
    enableProdMode();

    this.app = express();

    this.app.engine('html', ngExpressEngine({
      baseUrl: 'http://localhost:4200',
      bootstrap: [AppServerModule]
    }));
    this.app.set('view engine', 'html');
    this.app.set('views', path.join(ROOT, 'src'))

    this.app.use(compression());

    // Serve static files
    this.app.use(express.static(path.join(ROOT, 'public')));
    this.app.use('/public', express.static(path.join(ROOT, 'public')));
    this.app.use('/client', express.static(path.join(ROOT, 'dist', 'client')));

    for (let route of routes) {
      this.app.get(route, (req: any, res: any) => { res.render('index', { req }); });
    }
  }
}

export function ngExpressEngine(setupOptions: any) {
	return function(filePath: string, options: any, callback: Function){
		if(!templateCache[filePath]){
			let file = fs.readFileSync(filePath);
			templateCache[filePath] = file.toString();
		}
		renderModule(setupOptions.bootstrap[0], {
			document: templateCache[filePath],
			url: options.req.url
		})
		.then(string => {
			callback(null, string);
		});
	}
}

new BizServer().start();
