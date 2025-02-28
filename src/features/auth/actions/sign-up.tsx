"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export type SignUpFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    __errors?: string;
  };
};

const forDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const data = Object.fromEntries(formData.entries());

  const result = forDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formatedErrors.login?._errors.join(", "),
        password: formatedErrors.password?._errors.join(", "),
        __errors: formatedErrors._errors.join(", "),
      },
    };
  }

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === "right") {
    await sessionService.addSession(await createUserResult.value);
    redirect("/");
  }

  const errors = {
    "user-login-exists": "Пользователь с таким login уже существует",
  }[createUserResult.error];

  return {
    formData,
    errors: {
      __errors: errors,
    },
  };
};
