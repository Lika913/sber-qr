import axios, { AxiosRequestConfig } from 'axios';
import { generateErrorResponse } from '../helpers/responses-generator.js'
import { IHttpMethodOptions } from '../../types/IHttpMethodOptions.js'
import { IResponse } from '../../types/IResponse.js';

export abstract class HttpClientBase {
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
                error?.response?.data?.moreInformation ?? error?.message ?? 'Internal Server Error'
            )
        }
    }

    protected async get(
        endpoint: string,
        headers?: object
    ) {
        return await this.send({
            method: 'GET',
            endpoint,
            headers
        });
    };

    protected async post(
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

    protected async put(
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

    protected async patch(
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

    protected async delete(
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