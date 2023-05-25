import mongoose, { Schema, Model } from "mongoose";

export interface FactoryAttributes extends Document {
  name: string;
}

const factorySchema = new Schema<FactoryAttributes>({
    name: { type: String, required: true }
});

const Factory: Model<FactoryAttributes> = mongoose.model(
  "Factory",
  factorySchema
);

export default Factory;
