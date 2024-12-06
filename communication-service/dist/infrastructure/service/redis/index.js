"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = require("ioredis");
class RedisService {
    constructor(host, port, password) {
        this.host = host;
        this.port = port;
        this.password = password;
        this.client = new ioredis_1.Redis({
            host: this.host,
            port: this.port,
            password: this.password,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        });
        this.subscriber = new ioredis_1.Redis({
            host: this.host,
            port: this.port,
            password: this.password,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        });
        this.addErrorListeners();
    }
    getPublisher() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client;
        });
    }
    getSubcriber() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subscriber;
        });
    }
    publish(channel, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.publish(channel, JSON.stringify(message));
                console.log(`Message published to channel: ${channel}`);
            }
            catch (err) {
                console.error(`Error publishing message to channel ${channel}:`, err);
            }
        });
    }
    subscribe(channelPattern, callback) {
        this.subscriber.psubscribe(channelPattern, (err, count) => {
            if (err) {
                console.error(`Error subscribing to pattern ${channelPattern}:`, err);
            }
            else {
                console.log(`Subscribed to ${count} channels matching pattern: ${channelPattern}`);
            }
        });
        this.subscriber.on('pmessage', (pattern, channel, message) => {
            console.log(`Message received from channel ${channel}: ${message}`);
            callback(channel, message);
        });
    }
    addErrorListeners() {
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });
        this.subscriber.on('error', (err) => {
            console.error('Redis subscriber error:', err);
        });
        this.client.on('connect', () => {
            console.log('Redis client connected');
        });
        this.subscriber.on('connect', () => {
            console.log('Redis subscriber connected');
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.quit();
                yield this.subscriber.quit();
                console.log('Redis connections closed successfully.');
            }
            catch (err) {
                console.error('Error closing Redis connections:', err);
            }
        });
    }
}
exports.RedisService = RedisService;
