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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDevice = exports.deleteDevice = exports.addDevice = exports.getDevice = exports.getDevices = void 0;
const device_model_1 = __importDefault(require("../models/device.model"));
const factory_model_1 = __importDefault(require("../models/factory.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// GET /device - Returns a list of devices and all their attributes
const getDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield device_model_1.default.find().populate("factory");
        res.status(200).json({ devices });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.getDevices = getDevices;
// GET /device/{id} - Returns a device with the id specified
const getDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const IdTypeCheck = mongoose_1.default.Types.ObjectId.isValid(id);
        if (IdTypeCheck) {
            const device = yield device_model_1.default.findById(id).populate("factory");
            if (device) {
                return res.status(200).json({ device });
            }
        }
        return res.status(400).json({ message: "Device not found" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getDevice = getDevice;
// POST /device - Adds a new device
const addDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ipAddress, manufacturerType, attributes, online, factoryName, } = req.body;
        // Check if device with the same IP address already exists
        let existingDevice = yield device_model_1.default.findOne({ ipAddress });
        if (existingDevice) {
            return res
                .status(400)
                .send({ message: "Device with the same IP address already exists" });
        }
        // Check if the factory exists
        let factory = yield factory_model_1.default.findOne({ name: factoryName });
        if (!factory) {
            const newFactory = new factory_model_1.default({
                name: factoryName,
            });
            factory = yield newFactory.save();
        }
        let newDevice = new device_model_1.default({
            name,
            ipAddress,
            manufacturerType,
            attributes,
            online,
            factory: factory._id,
        });
        yield newDevice.save();
        yield newDevice.populate("factory");
        res.status(200).json({
            message: "Device created",
            device: newDevice,
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.addDevice = addDevice;
// DELETE /device/{id} - Hides a device from the device list
const deleteDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const IdTypeCheck = mongoose_1.default.Types.ObjectId.isValid(id);
        if (IdTypeCheck) {
            const device = yield device_model_1.default.findById(id);
            if (device) {
                yield device.deleteOne();
                res.status(200).json({ message: "Device deleted" });
            }
        }
        return res.status(400).json({ message: "Device not found" });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.deleteDevice = deleteDevice;
// PUT /device/{id} - Updates fields on a device
const updateDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        debugger
        const { name, ipAddress, manufacturerType, attributes, online, factoryName } = req.body;
        const IdTypeCheck = mongoose_1.default.Types.ObjectId.isValid(id);
        if (IdTypeCheck) {
            const device = yield device_model_1.default.findById(id);
            if (device) {
                let factory;
                if (ipAddress && device.ipAddress !== ipAddress) {
                    const existingDevice = yield device_model_1.default.findOne({ ipAddress });
                    if (existingDevice) {
                        return res
                            .status(500)
                            .json({ error: "Device with the same IP address already exists" });
                    }
                    // Check if the factory exists
                    if (factoryName) {
                        factory = yield factory_model_1.default.findOne({ name: factoryName });
                        console.log("sdfasdf", factory);
                        if (!factory) {
                            factory = new factory_model_1.default({
                                name: factoryName,
                            });
                            yield factory.save();
                        }
                    }
                    const updatedDevice = Object.assign(device, { factory: factory === null || factory === void 0 ? void 0 : factory._id }, req.body);
                    yield updatedDevice.save();
                    return res.status(200).json({ message: exports.updateDevice });
                }
            }
        }
        return res.status(500).json({ message: "Device not found" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateDevice = updateDevice;
