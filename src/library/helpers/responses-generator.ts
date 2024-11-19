import { IResponse } from "../../types/IResponse.js";

export const generateErrorResponse = (
    status: number,
    message: string,
    stack?: string,
): IResponse => ({
    error: {
        status,
        message,
        stack,
    }
})