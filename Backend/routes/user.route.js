import express from "express";
import {
  register,
  login,
  update,
  updateCredentials,
  changePasswordController,
  deleteUser,
  recoveryPasswordController,
  resetPasswordController,
  getAllUsers,
} from "../controllers/user.controller.js";
import {
  UserLoginValidationRules,
  userRegisterValidationRules,
  UserUpdateValidationRules,
  userUpdateCredentialsValidationRules,
  userChangePasswordValidationRules,
  UserDeleteValidationRules,
  userRecoveryValidationRules,
  userResetPasswordValidationRules,
} from "../validators/user.validator.js";
import validate from "../middlewares/validation.middleware.js";
import { authenticate } from "../auth/authentication.js";
import { authorizeRole } from "../auth/autorizathion.js";
import { config } from "../config/config.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, getAllUsers)
userRouter.post("/register", userRegisterValidationRules, validate, register); //TODO funciona registrar usuario
userRouter.post("/login", UserLoginValidationRules, validate, login); //TODO funciona logear usuario
//TODO funciona actualizar progreso de usuario
userRouter.put(
  "/update/:id",
  authenticate,
  authorizeRole(config.role2),
  UserUpdateValidationRules,
  validate,
  update
);
//TODO funciona actualizar credenciales de usuario
userRouter.put(
  "/update-credentials/:id",
  authenticate,
  authorizeRole(config.role2),
  userUpdateCredentialsValidationRules,
  validate,
  updateCredentials
);
//TODO funciona cambiar password de usuario
userRouter.put(
  "/change-password/:id",
  authenticate,
  authorizeRole(config.role2),
  userChangePasswordValidationRules,
  validate,
  changePasswordController
);
//TODO funciona eliminar usuario por cierre de cuenta
userRouter.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(config.role2),
  UserDeleteValidationRules,
  validate,
  deleteUser
);
userRouter.post(
  "/recover-password",
  authenticate,
  authorizeRole(config.role2),
  userRecoveryValidationRules,
  validate,
  recoveryPasswordController
);
userRouter.post(
  "/reset-password",
  authenticate,
  authorizeRole(config.role2),
  userResetPasswordValidationRules,
  validate,
  resetPasswordController
);

export default userRouter;
