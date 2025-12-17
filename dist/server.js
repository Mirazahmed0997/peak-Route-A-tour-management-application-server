"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/Config/env");
const seedSuperAdmin_1 = require("./app/Utils/seedSuperAdmin");
const redis_config_1 = require("./app/Config/redis.config");
let server;
const port = 5000;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log('Connected to DB');
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`server connected to ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
(async () => {
    await (0, redis_config_1.redisConnect)();
    await startServer();
    await (0, seedSuperAdmin_1.seedSuperAdmin)();
})();
// unhandled rejection error
process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection error", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
// uncaught rejection error
process.on("uncaughtException", (err) => {
    console.log("uncaught exception detected error", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
// signal termination sigterm
process.on("SIGTERM", () => {
    console.log("sigterm signal recieved");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
// sigint termination sigterm
process.on("SIGINT", () => {
    console.log("SIGINT signal recieved");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
// unhandled rejection error
// Promise.reject( new Error("Forgot to catch this promise"))
// uncaught rejection error
// throw new Error("Forgot to handle uncaught error")
//# sourceMappingURL=server.js.map