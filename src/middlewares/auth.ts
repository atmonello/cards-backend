import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: "Token not provided"});

    const [,token] = authorization?.split(" ");

    const decoded:any = jwt.decode(token);

    req.user = decoded.id;

    return next();
}