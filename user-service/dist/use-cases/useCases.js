"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UseCases {
    // private RabbitMQInstance;
    constructor(repository, jwt, githubClient) {
        this.repository = repository;
        this.githubClient = githubClient;
    }
}
exports.default = UseCases;
