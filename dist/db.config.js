"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createConnection = () => {
    return mongoose_1.default.connect(process.env.DB_CONN_STRING);
};
exports.default = createConnection;
