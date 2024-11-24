import { Request, Response, NextFunction } from 'express'; 
import { IEndpoint } from '../types/IEndpoint.js';
import { BaseController } from './base-controller.js';
import { SberQrLogic } from '../library/logic/sber/sber-qr-logic.js';
import { IController } from '../types/ISberQrController.js';

export class SberQrController extends BaseController implements IController {
    private sberQrLogic: SberQrLogic;
    private endpoints: IEndpoint[];

    constructor () {
        super();

        this.sberQrLogic = new SberQrLogic();
        this.endpoints = [
            { method: 'GET', path: '/token', func: this.token }
        ]

        this.init();
    }

    private init() {
        this.bindEndpoints(this.endpoints)
    }

    private token(req: Request, res: Response, next: NextFunction) {
        this.sberQrLogic.getToken()
            .then(data => res.json(data))
    }
}