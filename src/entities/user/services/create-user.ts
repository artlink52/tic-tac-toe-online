import { left, right } from "@/shared/lib/either";
import { userRepository } from "../repositories/user";
import cuid from "cuid";
import { DEFAULT_REATING } from "../domain";
import { passwordService } from "./password";

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userWithLogin = await userRepository.getUser({ login });

  if (userWithLogin) {
    return left("user-login-exists" as const);
  }
  const { hash, salt } = await passwordService.hashPassword(password);

  const user = userRepository.saveUser({
    id: cuid(),
    login,
    rating: DEFAULT_REATING,
    passwordHash: hash,
    salt,
  });

  return right(user);
};
