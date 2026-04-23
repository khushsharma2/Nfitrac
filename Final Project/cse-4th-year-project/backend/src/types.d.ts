import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      // add custom properties here if needed 
    }
  }
}

declare type Req = Request;
declare type Res = Response;
declare type Next = NextFunction;
