import { IResponse } from "./IResponse";

export interface IHttpSberClient {
    oauthV3: (scope: string) => Promise<IResponse>
}