import https from 'https';
import fs from 'fs';
import btoa from 'btoa';
import { v4 as uuidv4 } from 'uuid'
import { HttpClientBase } from './http-client-base.js';
import { IHttpSberClient } from '../../types/IHttpSberClient.js';
import { injectable } from 'inversify';

@injectable()
export class HttpMcSberClient extends HttpClientBase implements IHttpSberClient {
    constructor () {
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
        const agent = new https.Agent({
            ca: fs.readFileSync(process.env.CA_CERT_PATH!),
            pfx: fs.readFileSync(process.env.PFX_CERT_PATH!),
            passphrase: process.env.PFX_PASSPHRASE,
        });

        super(process.env.SBER_API_URL!, headers, agent)
    };

    async oauthV3(scope: string) {
        const body = {
            grant_type: 'client_credentials',
            scope,
        };
        const headers = {
            'rquid': uuidv4().replaceAll('-', ''),
            'authorization': 'Basic ' + btoa(process.env.SBER_CLIENT_ID + ':' + process.env.SBER_CLIENT_SECRET)
        };

        return await this.post('/tokens/v3/oauth', body, headers);
    }
}
