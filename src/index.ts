import express from "express";
import  dotenv from "dotenv";
import createConnection from "./db.config";
import deviceRouter from "./routes/device.route";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/devices', deviceRouter)

createConnection()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(port, () => {
      console.log(`API server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
});
