import 'dotenv/config';
import { PaymentsApp } from './app.js'
import { appContainer } from './inversify.config.js'
import { ServiceId } from './types/consts/service-id.js';

const app = appContainer.get<PaymentsApp>(ServiceId.PaymentsApp);

app.start();