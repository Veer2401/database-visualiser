"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const database_1 = __importDefault(require("./database"));
const table_1 = __importDefault(require("./table"));
const query_1 = __importDefault(require("./query"));
const chat_1 = __importDefault(require("./chat"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/auth', auth_1.default);
apiRouter.use('/database', database_1.default);
apiRouter.use('/table', table_1.default);
apiRouter.use('/query', query_1.default);
apiRouter.use('/chat', chat_1.default);
exports.default = apiRouter;
