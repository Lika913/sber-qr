import { IError } from "./IErorr.js";

export interface IResponse {
    data?: object | object[],
    error?: IError
}