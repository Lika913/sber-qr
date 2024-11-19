import express, { Request, Response } from 'express';
import { HttpMcSberClient } from '../library/clients/http-mc-sber-client.js' 

const sberQrRouter = express.Router();
const httpMcSberClient = new HttpMcSberClient();

sberQrRouter.get('/token', (req: Request, res: Response) => {
    httpMcSberClient.oauthV3('https://api.sberbank.ru/qr/order.create')
        .then(x => res.json(x))
})

export { sberQrRouter }