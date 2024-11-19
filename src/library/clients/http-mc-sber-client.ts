import https from 'https';
import fs from 'fs';
import btoa from 'btoa';
import { v4 as uuidv4 } from 'uuid'
import { HttpClientBase } from './http-client-base.js';

// данные должны браться из env
const caCert = null;
const pfxCert = null;
const passphrase = '';
const clientId = '';
const clientSecret = '';
const baseUrl = '';

export class HttpMcSberClient extends HttpClientBase {
    constructor () {
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
        const agent = new https.Agent({
            ca: caCert,
            pfx: pfxCert,
            passphrase: passphrase,
        });

        super(baseUrl, headers, agent)
    };

    async oauthV3(scope) {
        const body = {
            grant_type: 'client_credentials',
            scope,
        };
        const headers = {
            'rquid': uuidv4().replaceAll('-', ''),
            'authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        };

        return await this.post('/tokens/v3/oauth', body, headers);
    }
}
