import { HttpMethod } from "./consts/http-method.js";

export interface IHttpMethodOptions {
    method: HttpMethod, 
    endpoint: string, 
    headers?: object, 
    body?: object,
}