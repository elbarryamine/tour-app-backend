"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function middleware(req, res, next) {
    req.id = 5;
    next();
}
exports.default = middleware;
