import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from './consts/http-method.js';

export interface IEndpoint {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: HttpMethod
}