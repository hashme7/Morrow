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
    constructor(port, redisService, chatRepository, joinSocket, updateMsgSeen) {
        this.port = port;
        this.redisService = redisService;
        this.chatRepository = chatRepository;
        this.joinSocket = joinSocket;
        this.updateMsgSeen = updateMsgSeen;
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
                const pubClient = this.redisService.getPublisher();
                const subClient = this.redisService.getSubscriber();
                this.io.adapter((0, socket_io_redis_1.createAdapter)({ pubClient, subClient }));
                this.listenForPubSubEvents();
                this.configureSocketEvents();
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
    listenForPubSubEvents() {
        this.redisService.subscribe("channel:room:*", (channel, message) => {
            const roomId = channel.split(":")[2];
            try {
                console.log("message", message);
                this.io.to(roomId).emit("new_message", message);
            }
            catch (error) {
                throw error;
            }
        });
    }
    configureSocketEvents() {
        this.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            socket.on("joinRoom", (roomId, userId) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.redisService.addActiveUser(socket.id, userId);
                    socket.join(roomId);
                    yield this.joinSocket.execute();
                    console.log(`User ${socket.id} joined room ${roomId}`);
                }
                catch (error) {
                    throw error;
                }
            }));
            socket.on("disconnect", (userId) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this.redisService.removeActiveUser(socket.id, userId);
                    console.log(`User disconnected: ${socket.id}`);
                }
                catch (error) {
                    throw error;
                }
            }));
            socket.on("message_seen", (_a) => __awaiter(this, [_a], void 0, function* ({ messageId, userId }) {
                try {
                    const seenedMsg = yield this.updateMsgSeen.execute({ messageId, userId });
                    const senderId = yield this.redisService.getActiveUser(userId);
                    if (!senderId)
                        return;
                    socket.to(senderId).emit('message_status', { seenedMsg });
                }
                catch (error) {
                    throw error;
                }
            }));
        });
    }
}
exports.WebSocketServer = WebSocketServer;
