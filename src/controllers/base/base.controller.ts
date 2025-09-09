import { Response } from 'express';

export abstract class BaseController {
  protected handleSuccess(res: Response, data: any, message?: string, statusCode: number = 200): void {
    res.status(statusCode).json({
      success: true,
      data,
      message: message || 'Operation successful',
    });
  }
}


