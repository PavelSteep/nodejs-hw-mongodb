import express from "express";
import dotenv from "dotenv";
import { initMongoConnection } from "./db/initMongoConnection.js";
import studentRoutes from "./routers/students.js";
import contactRoutes from "./routers/contacts.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/contacts", contactRoutes);

app.listen(process.env.PORT || 3000, async () => {
  await initMongoConnection();
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export default app;
