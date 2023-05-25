import { Router } from "express";
import {
  addDevice,
  deleteDevice,
  getDevice,
  getDevices,
  updateDevice,
} from "../controller/device.controller";

const deviceRouter = Router();

deviceRouter
  .get("/", getDevices) // GET /device - Returns a list of devices and all their attributes
  .get("/:id", getDevice)  // GET /device/{id} - Returns a device with the id specified
  .post("/", addDevice) // POST /device - Adds a new device
  .put("/:id", updateDevice) // PUT /device/{id} - Updates fields on a device
  .delete("/:id", deleteDevice); // DELETE /device/{id} - Hides a device from the device list

export default deviceRouter;
