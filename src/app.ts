import express, { Express } from 'express';
import { Server } from 'http';
import { SberQrController } from './controllers/sber-qr-controller.js';

export class PaymentsApp {
    app: Express;
    server: Server;
    port: number;

    sberQrController: SberQrController;

    constructor(port = 8888) {
        this.app = express();
        this.port = port;
        this.sberQrController = new SberQrController();
    }

    private useRouters() {
        this.app.use('/sber',  this.sberQrController.router);
    }

    public async start() {
        this.useRouters();
        this.server = this.app.listen(this.port);

        console.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}