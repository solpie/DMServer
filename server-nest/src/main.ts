import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
const port = Number(process.env.PORT) || 3000;
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();

  //┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  //╎                 strapi proxy
  //╎
  //╎
  //└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  const { createProxyMiddleware } = require('http-proxy-middleware');
  /**
   * @return {Boolean}
   */
  const filter = function(pathname, req) {
    let is_proxy = true;

    // if (pathname.includes('/content-manager/explorer/application')) {
    if (pathname.includes('/content-manager/explorer/application::dm.dm') ||
    pathname.includes('/dmcat') ) {
      Logger.log(`hook=>${pathname} => dmcat`);
      is_proxy = false;
    }

    if (is_proxy)
      Logger.log(
        `proxy=>${process.env.STRAPI_PORT}${pathname}`,
      );
    return is_proxy;
  };

  app.use(
    '/',
    createProxyMiddleware(filter, {
      target: `http://c-stg.liangle.com`,
      // target: `http://localhost:${process.env.STRAPI_PORT}`,
      ws: true,
      pathRewrite: {
        '^/api/remove/path': '/path', // remove base path
        // '^/content-manager/explorer/application': '/dmcat', // remove base path
      },
      changeOrigin: true,
    }),
  );
  //┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  //╎                 app start
  //╎
  //╎
  //└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  await app.listen(port, '0.0.0.0');
  Logger.log(`server run on ${port}`, 'Bootstrap');
}
bootstrap();
