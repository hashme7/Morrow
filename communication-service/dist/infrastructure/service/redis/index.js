"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = require("ioredis");
class RedisService {
    constructor(host, port, password) {
        this.host = host;
        this.port = port;
        this.password = password;
        this.pubClient = new ioredis_1.Redis({ host: this.host, port: this.port, password: this.password });
        this.subClient = new ioredis_1.Redis({ host: this.host, port: this.port, password: this.password });
    }
    getPublisher() {
        return this.pubClient;
    }
    getSubcriber() {
        return this.subClient;
    }
}
exports.RedisService = RedisService;
