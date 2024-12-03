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
exports.WebSocketServer = void 0;
const socket_io_1 = require("socket.io");
const socket_io_redis_1 = require("socket.io-redis");
class WebSocketServer {
    constructor(port, redisService, chatRepository) {
        this.port = port;
        this.redisService = redisService;
        this.chatRepository = chatRepository;
        this.MAX_RETRIES = 3;
        this.RETRY_INTERVAL = 5000;
        this.io = new socket_io_1.Server({
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('fkadfkjsdjf');
                const pubClient = this.redisService.getPublisher();
                const subClient = this.redisService.getSubcriber();
                // Configure Redis adapter for Socket.IO
                this.io.adapter((0, socket_io_redis_1.createAdapter)({ pubClient, subClient }));
                // Configure WebSocket events
                this.configureSocketEvents();
                // Start listening on the port
                this.io.listen(this.port);
                console.log(`WebSocket server started on port ${this.port}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Error starting WebSocket server: ${error.message}`);
                }
                else {
                    console.error("Unknown error occurred while starting WebSocket server", error);
                }
                throw error;
            }
        });
    }
    configureSocketEvents() {
        this.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            // User joins a room
            socket.on("joinRoom", (room) => {
                socket.join(room);
                console.log(`User ${socket.id} joined room ${room}`);
            });
            // User sends a message
            socket.on("sendMessage", (message) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.retryWithAcknowledgment(socket, message);
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(`Failed to deliver message to room ${message.room}: ${error.message}`);
                    }
                }
            }));
            socket.on("disconnect", () => {
                console.log(`User disconnected: ${socket.id}`);
            });
        });
    }
    retryWithAcknowledgment(socket, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let attempts = 0;
                const sendEvent = () => {
                    attempts++;
                    console.log(`Sending message to room ${message.room}, attempt ${attempts}`);
                    this.io.to(message.room).emit("receiveMessage", message.content, (ack) => {
                        if (ack) {
                            console.log(`Acknowledgment received for message: ${message.content}`);
                            resolve();
                        }
                        else if (attempts < this.MAX_RETRIES) {
                            console.log(`Retrying message delivery, attempt ${attempts}`);
                            setTimeout(sendEvent, this.RETRY_INTERVAL);
                        }
                        else {
                            console.error(`Failed to deliver message after ${this.MAX_RETRIES} attempts`);
                            reject(new Error(`Message delivery failed for room: ${message.room}`));
                        }
                    });
                };
                sendEvent();
            });
        });
    }
}
exports.WebSocketServer = WebSocketServer;
