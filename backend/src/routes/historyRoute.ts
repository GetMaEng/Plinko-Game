import { Hono } from "hono";
import * as historyController from "../controllers/historyController.js";

const historyRouter = new Hono();

historyRouter.post("/", historyController.createHistory);
historyRouter.get("/recent-wins", historyController.getRecentBigWins);
historyRouter.get("/:walletId", historyController.getAllUserHistory);

export { historyRouter }