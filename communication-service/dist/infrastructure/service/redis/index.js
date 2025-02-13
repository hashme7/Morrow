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
// import { RedisClientType } from "redis";
// import { IMessage } from "../../../interfaces/types/Data";
class RedisService {
    constructor(host, port, password, user) {
        this.host = host;
        this.port = port;
        this.password = password;
        this.user = user;
        this.client = new ioredis_1.Redis({
            host: this.host,
            port: this.port,
            password: this.password,
            username: this.user,
            maxRetriesPerRequest: 100,
            tls: {},
            keepAlive: 30000,
            stringNumbers: false,
        });
        this.subscriber = new ioredis_1.Redis({
            host: this.host,
            port: this.port,
            password: this.password,
            username: this.user,
            maxRetriesPerRequest: 100,
            tls: {},
            keepAlive: 30000,
            stringNumbers: false,
        });
        console.log(`redis client: ${this.subscriber.options} ,redis sub:${this.client.options}`);
        this.addErrorListeners();
    }
    addActiveUser(socketId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.set(userId, socketId);
                console.log(`User ${userId} added to active users.`);
            }
            catch (error) {
                console.log(`Error on adding active user to redis service`);
                throw error;
            }
        });
    }
    removeActiveUser(socketId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.del(userId, socketId);
                console.log(`User ${userId} removed from active users`);
            }
            catch (error) {
                console.log(`error on removing the active user from redis service`);
                throw error;
            }
        });
    }
    getActiveUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.get(userId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.ping();
                console.log("Redis client connected", `
        ${this.port},${this.host} fjaskd`);
            }
            catch (error) {
                console.error("Error connecting to Redis:", error);
                throw error;
            }
        });
    }
    getSubscriber() {
        return this.subscriber;
    }
    getPublisher() {
        return this.client;
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
        this.subscriber.on("pmessage", (pattern, channel, message) => {
            try {
                const parsedMessage = JSON.parse(message);
                console.log(`parsed message from subscriber`, parsedMessage);
                callback(channel, parsedMessage);
            }
            catch (error) {
                console.log(`error pmessage subsriber`);
            }
        });
    }
    isValidJSON(message) {
        try {
            JSON.parse(message);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    addErrorListeners() {
        this.client.on("error", (err) => {
            console.error("Redis client error:", err);
        });
        this.subscriber.on("error", (err) => {
            console.error("Redis subscriber error:", err);
        });
        this.client.on("connect", () => {
            console.log("Redis client connected", this.host, this.port);
        });
        this.subscriber.on("connect", () => {
            console.log("Redis subscriber connected");
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.quit();
                yield this.subscriber.quit();
                console.log("Redis connections closed successfully.");
            }
            catch (err) {
                console.error("Error closing Redis connections:", err);
            }
        });
    }
}
exports.RedisService = RedisService;
