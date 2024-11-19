import express, { Express } from 'express'
import { sberQrRouter } from './routers/sber-qr.js';
import { Server } from 'http';

export class PaymentsApp {
    app: Express;
    server: Server;
    port: number;

    constructor(port = 8888) {
        this.app = express();
        this.port = port;
    }

    private useRouters() {
        this.app.use('/sber',  sberQrRouter);
    }

    public async start() {
        this.useRouters();
        this.server = this.app.listen(this.port);

        console.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}