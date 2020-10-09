import { INestApplication, Logger } from "@nestjs/common";
export const bootstrap_Dmcat = (app: INestApplication) => {


    //┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
    //╎                 socket io 
    //╎
    //╎
    //└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
    let server = app.getHttpServer()
    // console.log(server);
    let io = require('socket.io')(server)
    // io.origins("*");
    io.origins('*:*')
    global['io'] = io
    let nsp = io.of('dmcat')
    nsp.on('connection', (socket: any) => {
        Logger.log('/dmcat.io ws connected', "dmcat.io")
        socket.on('join', (data: any) => {
        })
    })
    // console.log(nsp);
    io.on('connection', function (socket: any) {
        Logger.log('/ ws connected', "dmcat.io")
    })
    
    //┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
    //╎                 strapi proxy
    //╎
    //╎
    //└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘

    const { createProxyMiddleware } = require('http-proxy-middleware');
    /**
     * @return {Boolean}
     */
    const filter = function (pathname, req) {
        let is_proxy = true;
        let hook_url_arr = ['/content-manager/explorer/application::dm.dm', '/dmcat']
        for (const path_ of hook_url_arr) {
            if (pathname.includes(path_)) {
                is_proxy = false
                Logger.log(`hook=>${pathname} => dmcat`);
                break
            }
        }
        if (is_proxy)// goto strapi   target: `http://c-stg.liangle.com`
            Logger.log(
                `proxy=>${process.env.STRAPI_PORT}${pathname}`,
            );
        return is_proxy;
    };
    // app.getHttpServer()

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
}