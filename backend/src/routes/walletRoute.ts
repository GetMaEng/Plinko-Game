import { Hono } from "hono";
import * as walletController from "../controllers/walletController.js";

const walletRouter = new Hono();

walletRouter.post('/:userId', walletController.createWallet);
walletRouter.get('/walletId/:userId', walletController.getWalletId);
walletRouter.get('/:walletId/:userId', walletController.getUserWallet);
walletRouter.patch("/balance", walletController.updateBalance);
walletRouter.patch("/earning", walletController.updateTotalEarning);
walletRouter.patch("/deposit", walletController.updateTotalDeposit);
walletRouter.patch("/profit", walletController.updateHighestProfit);

export { walletRouter }