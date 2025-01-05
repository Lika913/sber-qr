import { Container } from "inversify";
import { PaymentsApp } from './app.js';
import { IHttpSberClient } from './types/IHttpSberClient.js';
import { HttpMcSberClient } from './library/clients/http-mc-sber-client.js';
import { SberQrController } from './controllers/sber-qr-controller.js';
import { SberQrLogic } from './library/logic/sber/sber-qr-logic.js';
import { ServiceId } from './types/consts/service-id.js';

const appContainer = new Container();

appContainer.bind<PaymentsApp>(ServiceId.PaymentsApp).to(PaymentsApp);
appContainer.bind<SberQrController>(ServiceId.SberQrController).to(SberQrController);
appContainer.bind<SberQrLogic>(ServiceId.SberQrLogic).to(SberQrLogic);
appContainer.bind<IHttpSberClient>(ServiceId.IHttpSberClient).to(HttpMcSberClient);

export { appContainer } 