import express, { Express } from 'express';
import { Server } from 'http';
import { SberQrController } from './controllers/sber-qr-controller.js';
import { injectable, inject } from 'inversify';
import { ServiceId } from './types/consts/service-id.js';

@injectable()
export class PaymentsApp {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(ServiceId.SberQrController) private sberQrController: SberQrController,
    ) {
        this.app = express();
        this.port = 8888;
        this.sberQrController = sberQrController;
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