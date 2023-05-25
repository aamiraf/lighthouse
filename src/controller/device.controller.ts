import { Request, Response } from "express";
import Device from "../models/device.model";
import Factory from "../models/factory.model";
import mongoose from "mongoose";

export const getDevices = async (req: Request, res: Response) => {
  try {
    const devices = await Device.find().populate("factory");
    res.status(200).json({ devices });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const device = await Device.findById(id).populate("factory");
      if (device) {
        return res.status(200).json({ device });
      }
    }
    return res.status(400).json({ message: "Device not found" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const addDevice = async (req: Request, res: Response) => {
  try {
    const {
      name,
      ipAddress,
      manufacturerType,
      attributes,
      online,
      factoryName,
    } = req.body;

    // Check if device with the same IP address already exists
    let existingDevice = await Device.findOne({ ipAddress });
    if (existingDevice) {
      return res
        .status(400)
        .send({ message: "Device with the same IP address already exists" });
    }

    // Check if the factory exists
    let factory = await Factory.findOne({ name: factoryName });

    if (!factory) {
      const newFactory = new Factory({
        name: factoryName,
      });
      factory = await newFactory.save();
    }

    let newDevice = new Device({
      name,
      ipAddress,
      manufacturerType,
      attributes,
      online,
      factory: factory._id,
    });

    await newDevice.save();
    await newDevice.populate("factory");

    res.status(200).json({
      message: "Device created",
      device: newDevice,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const device = await Device.findById(id);
      if (device) {
        await device.deleteOne();
       return res.status(200).json({ message: "Device deleted" });
      }
    }
    return res.status(400).json({ message: "Device not found" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ipAddress, factoryName } = req.body;
    const IdTypeCheck = mongoose.Types.ObjectId.isValid(id);
    if (IdTypeCheck) {
      const device = await Device.findById(id);
      const existingDevice = await Device.findOne({ ipAddress });

      debugger;
      if (device) {
        var factory;
        if ((ipAddress && device.ipAddress == ipAddress) || existingDevice) {
          return res.status(400).send({
            message: "Device with the same IP address already exists",
          });
        }
        if (factoryName) {
          factory = await Factory.findOne({ name: factoryName });

          if (!factory) {
            factory = new Factory({
              name: factoryName,
            });
            await factory.save();
          }
        }
        const updatedDevice = Object.assign(
          device,
          { factory: factory?._id },
          req.body
        );
        await updatedDevice.save();
        return res.status(200).json({ message: "Device updated" });
      }
    }
    return res.status(400).json({ message: "Device not found" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
