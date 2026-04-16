import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import crowdRouter from "./crowd";
import ordersRouter from "./orders";
import notificationsRouter from "./notifications";
import profileRouter from "./profile";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/dashboard", dashboardRouter);
router.use("/crowd", crowdRouter);
router.use("/orders", ordersRouter);
router.use("/notifications", notificationsRouter);
router.use("/profile", profileRouter);

export default router;
