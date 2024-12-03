import express from "express";
import cors from 'cors';
import mainRouter from "./routes/mainRouter.js";
import userRoutes from './routes/user.route.js';
import paymentRoutes from "./routes/payments.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api', mainRouter);
export default app;
