"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
fn) => {
    return (req, res, next) => fn(req, res, next).catch(next);
};
exports.catchAsync = catchAsync;
