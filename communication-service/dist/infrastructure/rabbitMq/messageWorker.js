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
exports.MessageWorker = void 0;
class MessageWorker {
    constructor(rabbitMQService, chatRepository) {
        this.rabbitMQService = rabbitMQService;
        this.chatRepository = chatRepository;
        this.batch = [];
        this.BATCH_SIZE = 100;
        this.FLUSH_INTERVAL = 5000;
        this.start();
    }
    start() {
        this.rabbitMQService.consumeMessages("chat_queue", (message) => {
            this.batch.push(message);
            if (this.batch.length >= this.BATCH_SIZE) {
                this.flushBatch();
            }
        });
        setInterval(() => {
            if (this.batch.length > 0) {
                this.flushBatch();
            }
        }, this.FLUSH_INTERVAL);
    }
    flushBatch() {
        return __awaiter(this, void 0, void 0, function* () {
            const batchToSave = [...this.batch];
            this.batch = [];
            try {
                yield this.chatRepository.saveMessages(batchToSave);
                console.log("Batch saved successfully");
            }
            catch (error) {
                console.error("Error saving batch:", error);
            }
        });
    }
}
exports.MessageWorker = MessageWorker;
