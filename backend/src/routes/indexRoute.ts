import { Hono } from "hono";
import { userRouter } from "./userRoute.js";
import { historyRouter } from "./historyRoute.js";
import { transactionRouter } from "./transactionRoute.js";
import { walletRouter } from "././walletRoute.js";

const mainRouter = new Hono();

mainRouter.route("/user", userRouter);
mainRouter.route("/history", historyRouter);
mainRouter.route("/transaction", transactionRouter);
mainRouter.route("/wallet", walletRouter);

export { mainRouter };