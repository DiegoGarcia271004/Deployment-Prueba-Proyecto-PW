import * as adminRepository from "../repositories/admin.repository.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import {
  NotFoundAdmin,
  InvalidCredentialsError,
} from "../errors/errors.js";

export const loginAdmin = async ({ email, password }) => {
  const admin = await adminRepository.findAdminByEmail(email);

  if (!admin || !(await admin.comparePassword(password)))
    throw new InvalidCredentialsError();

  const token = jwt.sign(
    { id: admin._id, username: admin.username, role: admin.role },
    config.jwtSecretAdmin,
    {
      expiresIn: "1h",
    }
  );

  return {
    admin: {
      id: admin._id,
      username: admin.username,
      role: admin.role,
    },
    token,
  };
};

export const updateCredentials = async (id, data) => {
  const admin = await adminRepository.findAdminByID(id);

  if (!admin) throw new NotFoundAdmin();

  const updateAdmin = await adminRepository.updateCredentialesToAdmin(
    admin._id,
    data
  );
  return updateAdmin;
};

export const changePassword = async (id, newPassword) => {
    const admin = await adminRepository.findAdminByID(id);

    if (!admin) throw new NotFoundAdmin();

    await adminRepository.changePasswordToAdmin(id, newPassword);
}

export const deleteAdmin = async (id) => {
  const admin = await adminRepository.findAdminByID(id);

  if (!admin) throw new NotFoundAdmin();

  const deletedAdmin = await adminRepository.deleteAdminByID(id);
  return deletedAdmin;
};

export const recoverPassword = async (email) => {
  const admin = await adminRepository.findAdminByEmail(email);

  if (!admin) throw new NotFoundAdmin();

  const token = jwt.sign(
    { adminID: admin._id },
    config.recovery,
    { expiresIn: '1h' }
  );

  return token;
}

export const resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, config.recovery);
  const adminID = decoded.adminID;

  const admin = await adminRepository.findAdminByID(adminID);

  if (!admin) throw new NotFoundAdmin();

  await adminRepository.changePasswordToAdmin(adminID, newPassword);
}
