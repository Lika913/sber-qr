import { inject, injectable } from "inversify";
import { ServiceId } from "../../../types/consts/service-id.js"
import { IHttpSberClient } from "../../../types/IHttpSberClient.js";

@injectable()
export class SberQrLogic {

    constructor(
        @inject(ServiceId.IHttpSberClient) private httpSberClient: IHttpSberClient
    ) {
    }

    async getToken() {
        // какая-то бизнес логика
        // ...

        return await this.httpSberClient.oauthV3('https://api.sberbank.ru/qr/order.create')
    }
}