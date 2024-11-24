import { HttpMcSberClient } from "../../clients/http-mc-sber-client.js";

export class SberQrLogic {
    httpMcSberClient: HttpMcSberClient;

    constructor() {
        this.httpMcSberClient = new HttpMcSberClient();
    }

    async getToken() {
        console.log('какая-то бизнес логика');
        //...

        return await this.httpMcSberClient.oauthV3('https://api.sberbank.ru/qr/order.create')
    }
}