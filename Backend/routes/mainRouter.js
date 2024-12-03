import checklistRouter from "./checklist.route.js";
import userRouter from "./user.route.js";
import consultantRouter from "./consultant.route.js";
import formRouter from "./form.route.js";
import express from 'express';
import PaymentRouter from "./payments.routes.js";
import adminRouter from "./admin.route.js";
import Admin from "../models/admin.model.js";

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/checklist', checklistRouter);
mainRouter.use('/form', formRouter);
mainRouter.use('/consultant', consultantRouter);
mainRouter.use('/payment', PaymentRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.post('/verify', (req, res) => {
    const { email } = req.body;

    if (Admin.exists({ email }))
        return res.status(201).json({ role: 'admin' });

    res.json({ role: 'user' });
});

export default mainRouter;