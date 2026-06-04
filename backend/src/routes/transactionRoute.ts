import { Hono } from "hono";
import * as transactionController from "../controllers/transactionController.js";

const transactionRouter = new Hono();

transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.get("/:walletId",transactionController.getAllUserTransaction);

export { transactionRouter }