import { IResponse } from "./IResponse";

export interface IHttpMcSberClient {
    oauthV3: (scope: string) => Promise<IResponse>
}