import { Request, Response, NextFunction } from 'express';
function middleware(req: any, res: Response, next: NextFunction) {
	req.id = 5;
	next();
}
export default middleware;
