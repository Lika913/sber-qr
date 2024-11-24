import { Router } from 'express'; 
import { IEndpoint } from '../types/IEndpoint.js';

export abstract class BaseController {
    private readonly _router: Router;

    constructor () {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    protected bindEndpoints (endpoints: IEndpoint[]) {
        endpoints.forEach(point => {
            const handler = point.func.bind(this); // чтобы не потерять контекст

            this.router[point.method.toLowerCase()](
                point.path, 
                handler
            )

            console.log(`bind ${point.method} ${point.path}`);
        })
    }
}