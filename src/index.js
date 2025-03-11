import express from "express";
import dotenv from "dotenv";
import { initMongoConnection } from "./db/initMongoConnection.js";
import studentRoutes from "./routers/students.js";
import contactRoutes from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

dotenv.config();
const app = express();

app.use(express.json());

// Маршруты
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/students", studentRoutes);
app.use("/contacts", contactRoutes);

// Обработчик маршрутов, которые не найдены
app.use(notFoundHandler);

// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(process.env.PORT || 3000, async () => {
  await initMongoConnection();
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export default app;
