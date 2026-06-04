import { Hono } from "hono";
import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddlware.js";

const userRouter = new Hono();

userRouter.post("/", userController.createUser);
userRouter.get("/", authMiddleware, userController.getAllUserInfo);
userRouter.get("/me", authMiddleware, userController.getMe)
userRouter.get("/:userId", authMiddleware, userController.getUserInfoById);
userRouter.patch("/:userId", authMiddleware, userController.updateUserInfo);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", userController.logoutUser);

export { userRouter }