"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_controller_1 = require("../controller/device.controller");
const deviceRouter = (0, express_1.Router)();
deviceRouter
    .get("/", device_controller_1.getDevices)
    .get("/:id", device_controller_1.getDevice)
    .post("/", device_controller_1.addDevice)
    .put("/:id", device_controller_1.updateDevice)
    .delete("/:id", device_controller_1.deleteDevice);
exports.default = deviceRouter;
