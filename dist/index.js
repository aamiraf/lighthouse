"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./db.config"));
const device_route_1 = __importDefault(require("./routes/device.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/device', device_route_1.default);
(0, db_config_1.default)()
    .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(port, () => {
        console.log(`API server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
});
