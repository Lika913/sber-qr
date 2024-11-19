import { PaymentsApp } from './app.js'

async function init() {
    const app = new PaymentsApp();
    await app.start();
}

init();