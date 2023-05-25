import mongoose, { Model, Schema } from "mongoose";
import { FactoryAttributes } from "./factory.model";

interface DeviceAttributes extends Document {
  name: string;
  ipAddress: string;
  manufacturerType: string;
  online: boolean;
}

interface DeviceDocument extends DeviceAttributes {
  factory: FactoryAttributes;
}

const deviceSchema = new Schema<DeviceDocument>({
  name: { type: String, required: true },
  ipAddress: { type: String, required: true, unique: true },
  manufacturerType: { type: String, required: true },
  online: { type: Boolean, required: true },
  factory: { type: Schema.Types.ObjectId, ref: "Factory" },
});

const Device: Model<DeviceDocument> = mongoose.model("Device", deviceSchema);

export default Device;
