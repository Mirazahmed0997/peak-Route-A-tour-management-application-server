"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsynch = void 0;
const env_1 = require("../Config/env");
const catchAsynch = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (env_1.envVars.NODE_ENV === "Development") {
            console.log(err);
        }
        next(err);
    });
};
exports.catchAsynch = catchAsynch;
//# sourceMappingURL=CatchAsync.js.map