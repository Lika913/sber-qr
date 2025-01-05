import { Request, Response, NextFunction } from 'express'; 
import { IEndpoint } from '../types/IEndpoint.js';
import { BaseController } from './base-controller.js';
import { SberQrLogic } from '../library/logic/sber/sber-qr-logic.js';
import { IController } from '../types/ISberQrController.js';
import { inject, injectable } from 'inversify';
import { ServiceId } from '../types/consts/service-id.js';

@injectable()
export class SberQrController extends BaseController implements IController {
    private endpoints: IEndpoint[];

    constructor (
        @inject(ServiceId.SberQrLogic) private sberQrLogic: SberQrLogic
    ) {
        super();

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