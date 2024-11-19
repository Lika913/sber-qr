import axios, { AxiosRequestConfig } from 'axios';
import { generateErrorResponse } from '../helpers/responses-generator.js'
import { IHttpClientBase } from '../../types/IHttpClientBase.js';
import { IHttpMethodOptions } from '../../types/IHttpMethodOptions.js'
import { IResponse } from '../../types/IResponse.js';

export class HttpClientBase implements IHttpClientBase {
    private baseURL: string;
    private defaultHeaders: object;
    private agent: object;

    constructor(baseURL: string, defaultHeaders: object = {}, agent: object = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = defaultHeaders;
        this.agent = agent;
    };

    private async send({
        method,
        endpoint,
        headers = {},
        body
    }: IHttpMethodOptions): Promise<IResponse> {
        const config: AxiosRequestConfig = {
            method,
            url: this.baseURL + endpoint,
            headers: {
                ...this.defaultHeaders,
                ...headers
            },
            httpsAgent: this.agent
        }
        if (body) {
            config.data = body;
        }

        try {
            return (await axios(config)).data
        } catch (error: any) {
            return generateErrorResponse(
                error?.status ?? 500,
                error?.response?.data?.moreInformation ?? error?.message
            )
        }
    }

    async get(
        endpoint: string,
        headers?: object
    ) {
        return await this.send({
            method: 'GET',
            endpoint,
            headers
        });
    };

    async post(
        endpoint: string,
        body?: object,
        headers?: object
    ) {
        return await this.send({
            method: 'POST',
            endpoint,
            headers,
            body
        });
    };

    async put(
        endpoint: string,
        body?: object,
        headers?: object
    ) {
        return await this.send({
            method: 'PUT',
            endpoint,
            headers,
            body
        });
    };

    async patch(
        endpoint: string,
        body?: object,
        headers?: object
    ) {
        return await this.send({
            method: 'PATCH',
            endpoint,
            headers,
            body
        });
    };

    async delete(
        endpoint: string,
        headers?: object
    ) {
        return await this.send({
            method: 'DELETE',
            endpoint,
            headers
        });
    };
}